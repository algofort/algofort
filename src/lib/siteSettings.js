export const DEFAULT_SITE_SETTINGS = Object.freeze({
  whatsappNumber: '+923337198686',
  whatsappEnabled: true,
  whatsappMessage: 'Hello Algofort, I would like to discuss a project.',
});

export function whatsappLink(settings) {
  const number = String(settings?.whatsappNumber || '').replace(/^\+/, '');
  if (!/^[1-9]\d{7,14}$/.test(number)) return '';
  const message = typeof settings.whatsappMessage === 'string' ? settings.whatsappMessage.trim() : '';
  return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}

export function displayContactNumber(number) {
  const digits = String(number || '').replace(/\D/g, '');
  return /^92\d{10}$/.test(digits) ? `+92 ${digits.slice(2,5)} ${digits.slice(5)}` : `+${digits}`;
}
