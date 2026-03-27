// Mobile menu toggle
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    menuIcon.textContent = isOpen ? 'menu' : 'close';
    menuBtn.setAttribute('aria-expanded', String(!isOpen));
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuIcon.textContent = 'menu';
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Email form handling
export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const form = document.getElementById('waitlist-form') || document.getElementById('signup-form');
const emailInput = document.getElementById('email-input');
const submitBtn = document.getElementById('submit-btn');
const formMessage = document.getElementById('form-message');
let isSubmitting = false;

function showMessage(text, isError) {
  if (!formMessage) return;
  formMessage.textContent = text;
  formMessage.className = `text-sm ${isError ? 'text-red-400' : 'text-green-400'}`;
  formMessage.classList.remove('hidden');
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const email = emailInput.value.trim();
    if (!validateEmail(email)) {
      showMessage('Please enter a valid email address.', true);
      return;
    }

    isSubmitting = true;
    submitBtn.textContent = 'Joining...';
    submitBtn.disabled = true;

    try {
      const endpoint = form.dataset.formspree || 'https://formspree.io/f/mbdpdlzd';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        showMessage("You're on the list! We'll be in touch.", false);
        emailInput.value = '';
      } else {
        showMessage('Something went wrong. Please try again.', true);
      }
    } catch {
      showMessage('Something went wrong. Please try again.', true);
    } finally {
      isSubmitting = false;
      submitBtn.textContent = 'Subscribe';
      submitBtn.disabled = false;
    }
  });
}
