export async function sendWebLead(form, source, message, recaptchaToken) {
  const fields = new FormData(form);
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: String(fields.get('name') || '').trim(),
      email: String(fields.get('email') || '').trim(),
      phone: String(fields.get('phone') || '').trim(),
      website: String(fields.get('website') || ''),
      selectedServices: ['Website Design'],
      message,
      source,
      recaptchaToken,
    }),
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.ok) {
    throw new Error(result?.error || 'Your enquiry could not be sent. Please try again.');
  }
}
