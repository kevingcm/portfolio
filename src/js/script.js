/* ── Translations ── */
const TRANSLATIONS = {
  en: {
    'nav.about':          'About',
    'nav.education':      'Education',
    'nav.experience':     'Experience',
    'nav.stack':          'Stack',
    'nav.projects':       'Projects',
    'section.about':      'About',
    'section.education':  'Education',
    'section.experience': 'Experience',
    'section.stack':      'Tech Stack',
    'section.projects':   'Projects',
    'label.coursework':   'Relevant Coursework',
    'greeting.morning':   'Good morning,',
    'greeting.afternoon': 'Good afternoon,',
    'greeting.evening':   'Good evening,',
  },
  pt: {
    'nav.about':          'Sobre',
    'nav.education':      'Educação',
    'nav.experience':     'Experiência',
    'nav.stack':          'Stack',
    'nav.projects':       'Projetos',
    'section.about':      'Sobre',
    'section.education':  'Educação',
    'section.experience': 'Experiência',
    'section.stack':      'Tech Stack',
    'section.projects':   'Projetos',
    'label.coursework':   'Disciplinas Relevantes',
    'greeting.morning':   'Bom dia,',
    'greeting.afternoon': 'Boa tarde,',
    'greeting.evening':   'Boa noite,',
  }
};

/* ── View transition helper ── */
function withTransition(fn) {
  if (!document.startViewTransition) { fn(); return; }
  document.startViewTransition(fn);
}

/* ── Random accent color on load ── */
let currentAccentColor = '#2f81f7';
function refreshAccentColor() {
  currentAccentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#2f81f7';
}

(function () {
  const COLOR_NAMES = ['blue', 'yellow', 'orange', 'green', 'purple'];
  const randomColor = COLOR_NAMES[Math.floor(Math.random() * COLOR_NAMES.length)];
  document.documentElement.style.setProperty('--accent', `var(--${randomColor})`);
  refreshAccentColor();
})();

/* ── Random section title colors (new set on each page load) ── */
(function () {
  const COLOR_NAMES = ['blue', 'yellow', 'orange', 'green', 'purple'];
  for (let i = COLOR_NAMES.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [COLOR_NAMES[i], COLOR_NAMES[j]] = [COLOR_NAMES[j], COLOR_NAMES[i]];
  }
  document.querySelectorAll('.section-title').forEach((el, i) => {
    const colorVar = `var(--${COLOR_NAMES[i % COLOR_NAMES.length]})`;
    el.style.color            = colorVar;
    el.style.borderLeftColor  = colorVar;
  });
})();

/* ── Greeting ── */
function updateGreeting() {
  const h    = new Date().getHours();
  const lang = document.documentElement.dataset.lang || 'en';
  const t    = TRANSLATIONS[lang];
  const msg  = h < 12 ? t['greeting.morning'] : h < 18 ? t['greeting.afternoon'] : t['greeting.evening'];
  const el   = document.getElementById('greeting');
  if (el) el.textContent = msg;
}

/* ── Language toggle ── */
(function () {
  const html = document.documentElement;
  const btn  = document.getElementById('lang-toggle');

  function applyLang(lang) {
    html.dataset.lang = lang;
    localStorage.setItem('lang', lang);
    btn.textContent = lang.toUpperCase();

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const t = TRANSLATIONS[lang];
      if (t && t[el.dataset.i18n]) el.textContent = t[el.dataset.i18n];
    });

    document.querySelectorAll('[data-en][data-pt]').forEach(el => {
      el.textContent = lang === 'pt' ? el.dataset.pt : el.dataset.en;
    });

    updateGreeting();
  }

  applyLang(localStorage.getItem('lang') || 'en');
  btn.addEventListener('click', () => withTransition(() => applyLang(html.dataset.lang === 'en' ? 'pt' : 'en')));
})();

/* ── Theme toggle ── */
(function () {
  const html     = document.documentElement;
  const btn      = document.getElementById('theme-toggle');
  const iconSun  = document.getElementById('icon-sun');
  const iconMoon = document.getElementById('icon-moon');

  const saved = localStorage.getItem('theme') || 'dark';
  setTheme(saved);

  btn.addEventListener('click', () => withTransition(() => setTheme(html.dataset.theme === 'dark' ? 'light' : 'dark')));

  function setTheme(t) {
    html.dataset.theme = t;
    localStorage.setItem('theme', t);
    iconSun.style.display  = t === 'light' ? 'block' : 'none';
    iconMoon.style.display = t === 'dark'  ? 'block' : 'none';
    refreshAccentColor();

    const fav = document.getElementById('favicon');
    if (fav) {
      fav.href = t === 'light' ? 'assets/favicon-light-mode.svg' : 'assets/favicon-dark-mode.svg';
    }
  }
})();

/* ── Custom cursor ── */
(function () {
  const dot  = document.getElementById('cursor');
  const glow = document.getElementById('cursor-glow');

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let gx = mx, gy = my;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = Math.round(mx) + 'px';
    dot.style.top  = Math.round(my) + 'px';
  });

  (function animateGlow() {
    gx += (mx - gx) * 0.22;
    gy += (my - gy) * 0.22;
    glow.style.left = gx + 'px';
    glow.style.top  = gy + 'px';
    requestAnimationFrame(animateGlow);
  })();
})();

/* ── Particle background ── */
(function () {
  const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d');
  let dots = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function init() {
    resize();
    dots = Array.from({ length: 55 }, () => {
      const vx = (Math.random() - 0.5) * 0.6;
      const vy = (Math.random() - 0.5) * 0.6;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.4 + 1.2,
        vx, vy,
        baseVx: vx,
        baseVy: vy,
        shimmer: 0,
        shimmerNext: Math.random() * 300,
      };
    });
  }

  function drawGrid() {
    const dark = document.documentElement.dataset.theme !== 'light';
    const size = 50;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x += size) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
    }
    for (let y = 0; y <= canvas.height; y += size) {
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
    }
    if (dark) {
      ctx.strokeStyle = 'rgba(255,255,255,0.015)';
      ctx.stroke();
    } else {
      ctx.strokeStyle = currentAccentColor;
      ctx.globalAlpha = 0.04;
      ctx.stroke();
      ctx.globalAlpha = 1.0;
    }
  }

  function draw() {
    const dark = document.documentElement.dataset.theme !== 'light';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    for (const d of dots) {
      d.vx += (d.baseVx - d.vx) * 0.03;
      d.vy += (d.baseVy - d.vy) * 0.03;
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 0) d.x = canvas.width;
      if (d.x > canvas.width) d.x = 0;
      if (d.y < 0) d.y = canvas.height;
      if (d.y > canvas.height) d.y = 0;

      if (d.shimmer > 0) {
        d.shimmer--;
      } else if (--d.shimmerNext <= 0) {
        d.shimmer = 140 + Math.random() * 60;
        d.shimmerNext = 400 + Math.random() * 700;
      }
      const shine = d.shimmer > 0 ? 0.5 + 0.5 * Math.sin((d.shimmer / 180) * Math.PI) : 0;
      const base  = dark ? 0.15 : 0.18;
      const alpha = base + shine * (dark ? 0.55 : 0.4);

      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      if (dark) {
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.fill();
      } else {
        ctx.fillStyle = currentAccentColor;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }
    }
    requestAnimationFrame(draw);
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    document.body.classList.add('resizing');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => document.body.classList.remove('resizing'), 300);
  });

  document.addEventListener('click', (e) => {
    const cx = e.clientX, cy = e.clientY;
    for (const d of dots) {
      const dx = d.x - cx;
      const dy = d.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 220 && dist > 0) {
        const force = (1 - dist / 220) * 10;
        d.vx -= (dx / dist) * force;
        d.vy -= (dy / dist) * force;
      }
    }
  });

  window.addEventListener('resize', () => resize());
  init();
  draw();
})();

/* ── Accordion ── */
document.querySelectorAll('.accordion-trigger').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.accordion-item');
    const body = item.querySelector('.accordion-body');
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    const siblings = btn.closest('.accordion').querySelectorAll('.accordion-item');
    siblings.forEach((sib) => {
      const sibBtn  = sib.querySelector('.accordion-trigger');
      const sibBody = sib.querySelector('.accordion-body');
      if (sib !== item) {
        sibBtn.setAttribute('aria-expanded', 'false');
        sibBody.style.maxHeight = null;
      }
    });

    if (isOpen) {
      btn.setAttribute('aria-expanded', 'false');
      body.style.maxHeight = null;
    } else {
      btn.setAttribute('aria-expanded', 'true');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
});

/* ── Active nav link via IntersectionObserver ── */
(function () {
  const links    = document.querySelectorAll('.nav-links a[data-section]');
  const sections = document.querySelectorAll('section[id]');

  links.forEach(link => {
    link.addEventListener('click', () => {
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[data-section="${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { rootMargin: '-15% 0px -80% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
})();

/* ── Loader fade out ── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader-wrapper');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('fade-out');
    }, 500);
  }
});
