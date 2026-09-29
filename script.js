document.getElementById('year').textContent = new Date().getFullYear();

// Reveal cards as they enter the viewport
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 80}ms`;
  io.observe(el);
});

// Highlight the current section in the navbar
const links = [...document.querySelectorAll('#nav a')];
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    links.forEach((a) => {
      const on = a.getAttribute('href') === '#' + e.target.id;
      a.classList.toggle('active', on);
      if (on) a.scrollIntoView({ inline: 'center', block: 'nearest' });
    });
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('.sec').forEach((s) => spy.observe(s));

// Slow parallax drift for the background glows
let ticking = false;
addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    document.documentElement.style.setProperty('--sy', scrollY);
    ticking = false;
  });
}, { passive: true });