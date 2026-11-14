import { database } from './firebase.js';
import { DEFAULT_SITE_SETTINGS } from '../siteSettings.js';

export async function readSiteSettings() {
  const record = await database().collection('siteSettings').doc('contact').get();
  const data = record.data() || {};
  const rawNumber = typeof data.whatsappNumber === 'string' ? data.whatsappNumber : '';
  const isOldNumber = rawNumber.replace(/\D/g, '') === '923337198686';
  const whatsappNumber = (rawNumber && !isOldNumber) ? rawNumber : DEFAULT_SITE_SETTINGS.whatsappNumber;
  return {
    whatsappNumber,
    whatsappEnabled: typeof data.whatsappEnabled === 'boolean' ? data.whatsappEnabled : DEFAULT_SITE_SETTINGS.whatsappEnabled,
    whatsappMessage: typeof data.whatsappMessage === 'string' ? data.whatsappMessage : DEFAULT_SITE_SETTINGS.whatsappMessage,
  };
}
