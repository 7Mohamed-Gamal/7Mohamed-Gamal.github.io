// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(
  '.skill-card, .project-card, .about-grid, .contact-card, .info-card, .about-text'
).forEach((el) => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===== SKILL BAR ANIMATION =====
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill-fill');
        fills.forEach((fill) => {
          const w = fill.style.width;
          fill.style.width = '0%';
          setTimeout(() => { fill.style.width = w; }, 100);
        });
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

const skillsSection = document.getElementById('skills');
if (skillsSection) barObserver.observe(skillsSection);

// ===== ACTIVE NAV ON SCROLL =====
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--accent)'
            : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((s) => activeObserver.observe(s));

// ===== SMOOTH NAV SCROLL =====
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== STAGGER DELAYS =====
document.querySelectorAll('.projects-grid .project-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.07}s`;
});
document.querySelectorAll('.skills-grid .skill-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.07}s`;
});

// ===== NAV SHADOW ON SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 40) {
    nav.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5)';
  } else {
    nav.style.boxShadow = 'none';
  }
});
