import { captchaToken, observeCaptcha, resetCaptcha } from './captcha.js';
import { sendWebLead } from './lead.js';

const estimateForm = document.querySelector('.estimate-form');
const estimateStatus = document.querySelector('.estimate-status');

if (estimateForm && estimateStatus) {
  const captcha = estimateForm.querySelector('[data-recaptcha]');
  observeCaptcha(captcha, (error) => {
    estimateStatus.textContent = error.message;
    estimateStatus.hidden = false;
  });

  estimateForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    estimateStatus.hidden = false;
    const token = captchaToken(captcha);
    if (!token) {
      estimateStatus.textContent = 'Please complete the security check and try again.';
      return;
    }

    const submitButton = estimateForm.querySelector('.estimate-submit');
    const fields = new FormData(estimateForm);
    const message = [
      `Service: ${fields.get('service') || 'Web development'}`,
      `Company: ${fields.get('company') || 'Not provided'}`,
      `Budget: ${fields.get('budget') || 'Not sure yet'}`,
      `Timeline: ${fields.get('timeline') || 'Flexible'}`,
      '',
      String(fields.get('details') || ''),
    ].join('\n');

    submitButton.disabled = true;
    estimateStatus.textContent = 'Sending your enquiry...';
    try {
      await sendWebLead(estimateForm, 'lp-web-estimate', message, token);
      estimateStatus.textContent = 'Thank you! Your enquiry has been sent.';
      estimateForm.reset();
      resetCaptcha(captcha);
    } catch (error) {
      estimateStatus.textContent = error.message;
      resetCaptcha(captcha);
    } finally {
      submitButton.disabled = false;
    }
  });
}

function initCustomSelects() {
  const customSelects = document.querySelectorAll('.custom-select');
  if (!customSelects.length) return;

  function closeAll(except = null) {
    customSelects.forEach((cs) => {
      if (cs !== except && cs.classList.contains('is-open')) {
        cs.classList.remove('is-open');
        const trigger = cs.querySelector('.custom-select-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  customSelects.forEach((selectEl) => {
    const trigger = selectEl.querySelector('.custom-select-trigger');
    const valueDisplay = selectEl.querySelector('.custom-select-value');
    const menu = selectEl.querySelector('.custom-select-menu');
    const options = Array.from(selectEl.querySelectorAll('.custom-select-option'));
    const nativeSelect = selectEl.querySelector('.custom-select-native');

    if (!trigger || !menu) return;

    function toggle(open) {
      const willOpen = typeof open === 'boolean' ? open : !selectEl.classList.contains('is-open');
      if (willOpen) {
        closeAll(selectEl);
        selectEl.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        const currentSelected = options.find((opt) => opt.classList.contains('is-selected')) || options[0];
        if (currentSelected) {
          currentSelected.scrollIntoView({ block: 'nearest' });
        }
      } else {
        selectEl.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    }

    function selectOption(optionEl, focusTrigger = true) {
      if (!optionEl) return;
      const value = optionEl.dataset.value;
      const text = optionEl.textContent.trim();

      if (valueDisplay) {
        valueDisplay.textContent = text;
      }

      options.forEach((opt) => {
        const isCurrent = opt === optionEl;
        opt.classList.toggle('is-selected', isCurrent);
        opt.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
      });

      if (nativeSelect) {
        nativeSelect.value = value;
        nativeSelect.dispatchEvent(new Event('change', { bubbles: true }));
      }

      toggle(false);
      if (focusTrigger) {
        trigger.focus();
      }
    }

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      toggle();
    });

    options.forEach((optionEl) => {
      optionEl.tabIndex = -1;
      optionEl.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        selectOption(optionEl);
      });
    });

    // Keyboard navigation
    selectEl.addEventListener('keydown', (e) => {
      const isOpen = selectEl.classList.contains('is-open');

      if (e.key === 'Escape') {
        if (isOpen) {
          e.preventDefault();
          toggle(false);
          trigger.focus();
        }
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!isOpen) {
          toggle(true);
          return;
        }
        const currentIndex = options.findIndex((opt) => opt.classList.contains('is-selected'));
        let nextIndex = 0;
        if (e.key === 'ArrowDown') {
          nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
        } else {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
        }
        selectOption(options[nextIndex], false);
        options[nextIndex].scrollIntoView({ block: 'nearest' });
        return;
      }

      if ((e.key === 'Enter' || e.key === ' ') && !isOpen && document.activeElement === trigger) {
        e.preventDefault();
        toggle(true);
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-select')) {
      closeAll();
    }
  });

  if (estimateForm) {
    estimateForm.addEventListener('reset', () => {
      requestAnimationFrame(() => {
        customSelects.forEach((cs) => {
          const valueDisplay = cs.querySelector('.custom-select-value');
          const options = cs.querySelectorAll('.custom-select-option');
          if (options.length) {
            const firstOpt = options[0];
            options.forEach((opt, idx) => {
              opt.classList.toggle('is-selected', idx === 0);
              opt.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
            });
            if (valueDisplay && firstOpt) {
              valueDisplay.textContent = firstOpt.textContent.trim();
            }
          }
        });
      });
    });
  }
}

initCustomSelects();
