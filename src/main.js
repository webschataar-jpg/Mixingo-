const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -24px' });

document.querySelectorAll('.reveal, .feature, .compare, .plans article, .comparison-table').forEach((element) => {
  element.classList.add('reveal');
  observer.observe(element);
});

const glow = document.querySelector('.cursor-glow');
if (glow && matchMedia('(pointer: fine)').matches) {
  window.addEventListener('pointermove', (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }, { passive: true });
}

const menuButton = document.querySelector('.menu');
const mobileNav = document.querySelector('.mobile-nav');
if (menuButton && mobileNav) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    document.body.classList.toggle('menu-open', !isOpen);
  });
  mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('keydown', (event) => event.key === 'Escape' && closeMenu());
}

document.querySelectorAll('.toggle button').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.toggle button').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
}));

document.querySelectorAll('.accordion details').forEach((item) => item.addEventListener('toggle', () => {
  if (item.open) {
    document.querySelectorAll('.accordion details').forEach((other) => {
      if (other !== item) other.open = false;
    });
  }
}));

const waitlistForm = document.querySelector('#waitlistForm');
if (waitlistForm) {
  waitlistForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = waitlistForm.querySelector('button[type="submit"]');
    const scriptUrl = waitlistForm.dataset.scriptUrl;
    const formData = new FormData(waitlistForm);
    formData.append('submittedAt', new Date().toISOString());
    submitButton?.setAttribute('disabled', 'true');

    try {
      if (scriptUrl) {
        await fetch(scriptUrl, { method: 'POST', mode: 'no-cors', body: formData });
      }
      waitlistForm.classList.add('submitted');
      waitlistForm.querySelector('.form-success')?.focus();
    } catch (error) {
      console.error('Waitlist submission failed', error);
      alert('Something went wrong. Please email hello@mixingo.app and we will add you manually.');
    } finally {
      submitButton?.removeAttribute('disabled');
    }
  });
}
