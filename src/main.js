const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible'));
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .feature, .compare, .plans article').forEach(el => {
  el.classList.add('reveal'); observer.observe(el);
});
const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => { glow.style.left = `${e.clientX}px`; glow.style.top = `${e.clientY}px`; });
const source = document.querySelector('#source');
const count = document.querySelector('.char-count');
source.addEventListener('input', () => count.textContent = `${source.value.length} / 1,000`);
document.querySelector('#clear').addEventListener('click', () => { source.value = ''; count.textContent = '0 / 1,000'; source.focus(); });
document.querySelector('#translateBtn').addEventListener('click', () => {
  const result = document.querySelector('#result');
  result.style.opacity = '0'; result.style.transform = 'translateY(5px)';
  setTimeout(() => { result.textContent = source.value ? 'Hey, please reschedule tomorrow’s meeting. I won’t be available.' : 'Your natural translation will appear here.'; result.style.transition = '.4s'; result.style.opacity = '1'; result.style.transform = 'none'; }, 250);
});
document.querySelector('#copy').addEventListener('click', async (e) => { await navigator.clipboard?.writeText(document.querySelector('#result').textContent); e.currentTarget.textContent = '✓'; setTimeout(() => e.currentTarget.textContent = '▢', 1200); });
document.querySelectorAll('.toggle button').forEach(btn => btn.addEventListener('click', () => { document.querySelectorAll('.toggle button').forEach(b => b.classList.remove('active')); btn.classList.add('active'); }));
document.querySelectorAll('.accordion details').forEach(item => item.addEventListener('toggle', () => { if(item.open) document.querySelectorAll('.accordion details').forEach(other => { if(other !== item) other.open = false; }); }));
