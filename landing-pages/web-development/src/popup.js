import { captchaToken, renderCaptcha, resetCaptcha } from './captcha.js';
import { sendWebLead } from './lead.js';

/**
 * Entrance Popup Component for Algofort
 * Displays on page load unless the visitor chooses "Don't show again"
 */

const POPUP_STORAGE_KEY = 'algofort_dont_show_popup';
const POPUP_COOKIE_NAME = 'algofort_dont_show_popup';

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
  return match ? decodeURIComponent(match[3]) : null;
}

function setCookie(name, value, days = 365) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/;SameSite=Lax`;
}

function hasSeenPopup() {
  try {
    if (localStorage.getItem(POPUP_STORAGE_KEY) === 'true') return true;
  } catch {
    // LocalStorage might be restricted
  }
  return getCookie(POPUP_COOKIE_NAME) === 'true';
}

function markPopupAsSeen() {
  try {
    localStorage.setItem(POPUP_STORAGE_KEY, 'true');
  } catch {
    // Ignore storage errors
  }
  setCookie(POPUP_COOKIE_NAME, 'true', 365);
}

export function initEntrancePopup() {
  const backdrop = document.getElementById('entrance-popup');
  if (!backdrop) return;

  // Clean legacy auto-dismiss key so users are not blocked by previous versions
  try {
    localStorage.removeItem('algofort_entrance_popup_seen');
  } catch {}

  const closeBtn = backdrop.querySelector('.entrance-popup-close');
  const form = backdrop.querySelector('.entrance-popup-form');
  const statusEl = backdrop.querySelector('.entrance-popup-status');
  const dismissButton = backdrop.querySelector('.entrance-popup-dismiss');

  let isOpen = false;

  function openPopup() {
    if (isOpen) return;
    isOpen = true;
    backdrop.setAttribute('aria-hidden', 'false');
    renderCaptcha(form?.querySelector('[data-recaptcha]')).catch((error) => {
      statusEl.hidden = false;
      statusEl.textContent = error.message;
    });
    document.body.classList.add('popup-locked');

    // Pause Lenis smooth scroll if present
    if (window.smoothScroll && typeof window.smoothScroll.stop === 'function') {
      window.smoothScroll.stop();
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        backdrop.classList.add('is-visible');
      });
    });
  }

  function handleDismiss() {
    closePopup();
  }

  function closePopup() {
    if (!isOpen) return;
    isOpen = false;
    backdrop.classList.remove('is-visible');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('popup-locked');

    // Resume Lenis smooth scroll
    if (window.smoothScroll && typeof window.smoothScroll.start === 'function') {
      window.smoothScroll.start();
    }
  }

  dismissButton?.addEventListener('click', () => {
    markPopupAsSeen();
    closePopup();
  });

  // Event Listeners
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleDismiss();
    });
  }

  // Close when clicking backdrop outside modal
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      handleDismiss();
    }
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      handleDismiss();
    }
  });

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('.entrance-popup-submit');
      const formData = new FormData(form);
      const name = formData.get('name');
      const captcha = form.querySelector('[data-recaptcha]');
      const token = captchaToken(captcha);

      if (!token) {
        statusEl.hidden = false;
        statusEl.textContent = 'Please complete the security check and try again.';
        return;
      }

      if (submitBtn) submitBtn.disabled = true;

      if (statusEl) {
        statusEl.hidden = false;
        statusEl.className = 'entrance-popup-status';
        statusEl.textContent = 'Sending your enquiry...';
      }

      try {
        await sendWebLead(form, 'lp-web-popup', String(formData.get('message') || ''), token);
        statusEl.className = 'entrance-popup-status is-success';
        statusEl.textContent = `Thank you, ${name || 'there'}! Your enquiry has been sent.`;
        form.reset();
        resetCaptcha(captcha);
        setTimeout(closePopup, 1800);
      } catch (error) {
        statusEl.className = 'entrance-popup-status';
        statusEl.textContent = error.message;
        resetCaptcha(captcha);
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  // Developer helpers for easy verification in console
  window.openEntrancePopup = openPopup;
  window.resetEntrancePopup = () => {
    try {
      localStorage.removeItem(POPUP_STORAGE_KEY);
      localStorage.removeItem('algofort_entrance_popup_seen');
    } catch {}
    document.cookie = `${POPUP_COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax`;
    document.cookie = `algofort_entrance_popup_seen=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax`;
    console.log('Entrance popup preference reset. Refresh to see page-load popup.');
  };

  // Trigger entrance popup on page load if not opted out
  if (!hasSeenPopup()) {
    const triggerPopup = () => {
      setTimeout(openPopup, 200);
    };

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      triggerPopup();
    } else {
      window.addEventListener('DOMContentLoaded', triggerPopup, { once: true });
    }
  }
}

