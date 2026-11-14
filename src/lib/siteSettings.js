export const DEFAULT_SITE_SETTINGS = Object.freeze({
  whatsappNumber: '+971582802786',
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
  if (/^971\d{9}$/.test(digits)) {
    return `+971 ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
  }
  return /^92\d{10}$/.test(digits) ? `+92 ${digits.slice(2,5)} ${digits.slice(5)}` : `+${digits}`;
}
