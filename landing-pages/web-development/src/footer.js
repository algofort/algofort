const newsletter = document.querySelector('.footer_newsletter_form');
const newsletterStatus = document.querySelector('.footer-status');

// UI preview, consistent with the estimate form's current scope.
newsletter.addEventListener('submit', (event) => {
  event.preventDefault();
  newsletterStatus.textContent = 'This is a preview. You have not been subscribed.';
  newsletterStatus.hidden = false;
});

document.querySelector('.footer-year').textContent = String(new Date().getFullYear());
