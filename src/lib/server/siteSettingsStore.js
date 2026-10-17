import { database } from './firebase.js';
import { DEFAULT_SITE_SETTINGS } from '../siteSettings.js';

export async function readSiteSettings() {
  const record = await database().collection('siteSettings').doc('contact').get();
  const data = record.data() || {};
  return {
    whatsappNumber: typeof data.whatsappNumber === 'string' ? data.whatsappNumber : DEFAULT_SITE_SETTINGS.whatsappNumber,
    whatsappEnabled: typeof data.whatsappEnabled === 'boolean' ? data.whatsappEnabled : DEFAULT_SITE_SETTINGS.whatsappEnabled,
    whatsappMessage: typeof data.whatsappMessage === 'string' ? data.whatsappMessage : DEFAULT_SITE_SETTINGS.whatsappMessage,
  };
}
