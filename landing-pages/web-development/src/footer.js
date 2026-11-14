const newsletter = document.querySelector('.footer_newsletter_form');
const newsletterStatus = document.querySelector('.footer-status');

if (newsletter && newsletterStatus) {
  newsletter.addEventListener('submit', async (event) => {
    event.preventDefault();
    const input = newsletter.querySelector('input[type="email"]');
    const button = newsletter.querySelector('button[type="submit"]');
    const email = input ? input.value.trim() : '';
    if (!email) return;

    if (button) button.disabled = true;
    if (input) input.disabled = true;
    newsletterStatus.textContent = 'Subscribing...';
    newsletterStatus.hidden = false;

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || 'Subscription failed');
      newsletterStatus.textContent = '✓ Thank you! Your email has been registered.';
      newsletterStatus.style.color = '#10b981';
      if (input) input.value = '';
    } catch (err) {
      newsletterStatus.textContent = err.message || 'Subscription failed. Please try again.';
      newsletterStatus.style.color = '#ef4444';
    } finally {
      if (button) button.disabled = false;
      if (input) input.disabled = false;
    }
  });
}

const yearEl = document.querySelector('.footer-year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
