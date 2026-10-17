import { database } from './firebase.js';
import { mailTransport, sender } from './mail.js';
import { enquiryEmail } from './emailTemplates.js';

export async function saveSubmission(fields) {
  const ref = database().collection('submissions').doc();
  const submission = { ...fields, id: ref.id, status: 'new', notes: '', createdAt: new Date().toISOString(), delivery: { admin: 'pending', user: 'pending' } };
  await ref.create(submission);
  try { await deliverSubmission(submission); }
  catch (error) { console.error('Submission email failed:', error.code || error.name); }
  return submission.id;
}

export async function deliverSubmission(submission) {
  const ref = database().collection('submissions').doc(submission.id);
  // Only one worker may deliver a submission at a time, including dashboard retries.
  const acquired = await database().runTransaction(async tx => {
    const current = await tx.get(ref); const data = current.data();
    if (!data || data.deliveryLeaseUntil > Date.now()) return false;
    submission = { ...data, id: ref.id };
    tx.update(ref, { deliveryLeaseUntil: Date.now() + 60000 });
    return true;
  });
  if (!acquired) throw new Error('Email delivery already in progress');
  let transport;
  try {
    if (submission.delivery?.admin === 'sent' && submission.delivery?.user === 'sent') return;
    transport = await mailTransport();
    const results = await Promise.allSettled(['admin', 'user'].map(async audience => {
      if (submission.delivery?.[audience] === 'sent') return;
      const result = await transport.sendMail({
        from: sender(), to: audience === 'admin' ? process.env.CONTACT_TO || process.env.SMTP_USER : submission.email,
        replyTo: audience === 'admin' ? submission.email : sender().address,
        ...await enquiryEmail(submission, audience),
      });
      if (!result.accepted?.length) throw new Error('Recipient rejected');
    }));
    await ref.update({ delivery: Object.fromEntries(results.map((result, index) => [index === 0 ? 'admin' : 'user', result.status === 'fulfilled' ? 'sent' : 'failed'])), deliveryUpdatedAt: new Date().toISOString() });
  } catch (error) {
    await ref.update({ delivery: { admin: submission.delivery?.admin === 'sent' ? 'sent' : 'failed', user: submission.delivery?.user === 'sent' ? 'sent' : 'failed' }, deliveryUpdatedAt: new Date().toISOString() });
    throw error;
  } finally { transport?.close(); await ref.update({ deliveryLeaseUntil: 0 }); }
}
