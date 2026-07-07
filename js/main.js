/* Shan Kwan Cho — Portfolio interactions (vanilla JS) */
(function () {
  'use strict';

  /* ---------- Typed hero roles ---------- */
  const roles = [
    'Sr Technical Support Engineer @ Microsoft',
    'Azure Analysis Services SME',
    'Power BI & Fabric Specialist',
    'Full-Stack Developer',
    'Generative AI Enthusiast'
  ];
  const typedEl = document.getElementById('typed');
  let roleIdx = 0, charIdx = 0, deleting = false;

  function type() {
    if (!typedEl) return;
    const current = roles[roleIdx];
    typedEl.textContent = current.slice(0, charIdx);
    let delay = deleting ? 35 : 70;

    if (!deleting && charIdx === current.length) {
      delay = 1800; deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400;
    } else {
      charIdx += deleting ? -1 : 1;
    }
    setTimeout(type, delay);
  }
  type();

  /* ---------- Navbar scroll state ---------- */
  const nav = document.getElementById('mainNav');
  const backToTop = document.getElementById('backToTop');
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 40);
    backToTop.classList.toggle('show', y > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Active nav link highlight ---------- */
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (l) {
          l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(function (s) { sectionObserver.observe(s); });

  /* ---------- Collapse mobile menu on click ---------- */
  const navMenu = document.getElementById('navMenu');
  navLinks.forEach(function (l) {
    l.addEventListener('click', function () {
      if (navMenu.classList.contains('show')) {
        bootstrap.Collapse.getInstance(navMenu).hide();
      }
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = (i % 4) * 80 + 'ms';
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });

  /* ---------- Animated stat counters ---------- */
  const statObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      statObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num').forEach(function (el) { statObserver.observe(el); });

  /* ---------- Project filters ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-item');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projects.forEach(function (p) {
        const match = filter === 'all' || p.dataset.cat.split(' ').indexOf(filter) !== -1;
        p.classList.toggle('hide', !match);
      });
    });
  });

  /* ---------- Contact form (FormSubmit.co AJAX -> shankwancho@gmail.com) ---------- */
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      note.textContent = 'Sending...';
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      }).then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          return { ok: res.ok, data: data };
        });
      }).then(function (r) {
        if (r.ok) {
          note.textContent = 'Your message has been sent. Thank you!';
          form.reset();
        } else {
          note.textContent = (r.data && r.data.message) ? r.data.message : 'Something went wrong - please email me directly at shankwancho@gmail.com';
        }
      }).catch(function () {
        note.textContent = 'Network error - please email me directly at shankwancho@gmail.com';
      }).finally(function () {
        btn.disabled = false;
      });
    });
  }

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
