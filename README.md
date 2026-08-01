# magnum-immobiliere
Site officiel Magnum Immobilière
/* ==========================================================================
   MAGNUM IMMOBILIÈRE — script.js
   Navigation, animations au scroll, carrousels, accordéon, filtres.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- HEADER : fond au scroll ---------- */
  const header = document.getElementById('site-header');
  const fab = document.getElementById('fab');
  const hero = document.querySelector('.hero');
  const heroHeight = () => hero ? hero.offsetHeight : 600;

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 40);
    if (fab) fab.classList.toggle('is-visible', y > heroHeight() * 0.7);
    updateGoldThread();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- HERO : déclenchement des animations au chargement ---------- */
  requestAnimationFrame(() => {
    setTimeout(() => hero && hero.classList.add('is-loaded'), 150);
  });

  /* ---------- BURGER / MENU MOBILE ---------- */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');
  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : !burger.classList.contains('is-open');
    burger.classList.toggle('is-open', isOpen);
    mobileMenu.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };
  burger.addEventListener('click', () => toggleMenu());
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  /* ---------- SCROLL FLUIDE AVEC DÉCALAGE DU HEADER ---------- */
  const headerOffset = 90;
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- LIGNE D'OR : progression + section active ---------- */
  const goldThread = document.querySelector('.gold-thread');
  const goldProgress = document.querySelector('.gold-thread__progress');
  const ticks = document.querySelectorAll('.gold-thread__ticks li');
  const trackedSections = Array.from(ticks).map(li => document.getElementById(li.dataset.target)).filter(Boolean);

  ticks.forEach(li => {
    li.addEventListener('click', () => {
      const target = document.getElementById(li.dataset.target);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  function updateGoldThread() {
    if (!goldThread) return;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0;
    if (goldProgress) goldProgress.style.height = (ratio * 100) + '%';

    let activeIndex = 0;
    trackedSections.forEach((sec, i) => {
      if (sec.getBoundingClientRect().top - headerOffset - 40 <= 0) activeIndex = i;
    });
    ticks.forEach((li, i) => li.classList.toggle('is-active', i === activeIndex));
  }

  /* ---------- REVEAL AU SCROLL (Intersection Observer) ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- COMPTEURS STATISTIQUES ---------- */
  const counters = document.querySelectorAll('.stat-block__num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString('fr-FR') + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------- PROGRAMMES NEUFS : barre de progression du scroll horizontal ---------- */
  const programmesTrack = document.getElementById('programmesTrack');
  const programmesBar = document.getElementById('programmesBar');
  if (programmesTrack && programmesBar) {
    const updateBar = () => {
      const max = programmesTrack.scrollWidth - programmesTrack.clientWidth;
      const ratio = max > 0 ? programmesTrack.scrollLeft / max : 0;
      programmesBar.style.transform = `scaleX(${Math.max(ratio, 0.08)})`;
      programmesBar.style.width = '100%';
      programmesBar.style.transformOrigin = 'left';
    };
    programmesTrack.addEventListener('scroll', updateBar, { passive: true });
    updateBar();
  }

  /* ---------- FILTRES APPARTEMENTS ---------- */
  const filterPills = document.querySelectorAll('.filter-pill');
  const listingRows = document.querySelectorAll('.listing__row');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');
      const filter = pill.dataset.filter;
      listingRows.forEach(row => {
        const match = filter === 'all' || row.dataset.type === filter;
        row.classList.toggle('is-hidden', !match);
      });
    });
  });

  /* ---------- CARROUSEL "BIENS À LA UNE" ---------- */
  const spotlightSlides = document.querySelectorAll('.spotlight__slide');
  const spotlightDotsWrap = document.getElementById('spotlightDots');
  const spotlightPrev = document.getElementById('spotlightPrev');
  const spotlightNext = document.getElementById('spotlightNext');
  let spotlightIndex = 0;
  let spotlightTimer;

  if (spotlightSlides.length && spotlightDotsWrap) {
    spotlightSlides.forEach((_, i) => {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', () => goToSpotlight(i));
      spotlightDotsWrap.appendChild(dot);
    });

    function goToSpotlight(i) {
      spotlightSlides[spotlightIndex].classList.remove('is-active');
      spotlightDotsWrap.children[spotlightIndex].classList.remove('is-active');
      spotlightIndex = (i + spotlightSlides.length) % spotlightSlides.length;
      spotlightSlides[spotlightIndex].classList.add('is-active');
      spotlightDotsWrap.children[spotlightIndex].classList.add('is-active');
      resetSpotlightTimer();
    }
    function resetSpotlightTimer() {
      clearInterval(spotlightTimer);
      spotlightTimer = setInterval(() => goToSpotlight(spotlightIndex + 1), 6500);
    }
    spotlightPrev && spotlightPrev.addEventListener('click', () => goToSpotlight(spotlightIndex - 1));
    spotlightNext && spotlightNext.addEventListener('click', () => goToSpotlight(spotlightIndex + 1));
    resetSpotlightTimer();
  }

  /* ---------- SLIDER TÉMOIGNAGES ---------- */
  const temoignageSlides = document.querySelectorAll('.temoignage-slide');
  const temoignagesDotsWrap = document.getElementById('temoignagesDots');
  let temoignageIndex = 0;
  let temoignageTimer;

  if (temoignageSlides.length && temoignagesDotsWrap) {
    temoignageSlides.forEach((_, i) => {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', () => goToTemoignage(i));
      temoignagesDotsWrap.appendChild(dot);
    });

    function goToTemoignage(i) {
      temoignageSlides[temoignageIndex].classList.remove('is-active');
      temoignagesDotsWrap.children[temoignageIndex].classList.remove('is-active');
      temoignageIndex = (i + temoignageSlides.length) % temoignageSlides.length;
      temoignageSlides[temoignageIndex].classList.add('is-active');
      temoignagesDotsWrap.children[temoignageIndex].classList.add('is-active');
      resetTemoignageTimer();
    }
    function resetTemoignageTimer() {
      clearInterval(temoignageTimer);
      temoignageTimer = setInterval(() => goToTemoignage(temoignageIndex + 1), 7000);
    }
    resetTemoignageTimer();
  }

  /* ---------- ACCORDÉON FAQ ---------- */
  const accordionItems = document.querySelectorAll('.accordion__item');
  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion__trigger');
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      accordionItems.forEach(i => i.classList.remove('is-open'));
      if (!isOpen) item.classList.add('is-open');
    });
  });

  /* ---------- FORMULAIRE DE CONTACT ---------- */
  const contactForm = document.getElementById('contactForm');
  const formConfirm = document.getElementById('formConfirm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formConfirm.textContent = 'Merci, votre demande a bien été envoyée. Un négociateur vous recontacte sous 24h.';
      contactForm.reset();
    });
  }

  /* ---------- NEWSLETTER ---------- */
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterConfirm = document.getElementById('newsletterConfirm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterConfirm.textContent = 'Merci ! Vous recevrez notre prochaine sélection.';
      newsletterForm.reset();
    });
  }

  /* ---------- CURSEUR PERSONNALISÉ (desktop) ---------- */
  const cursorDot = document.querySelector('.cursor-dot');
  if (cursorDot && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => cursorDot.classList.add('is-active'));
      el.addEventListener('mouseleave', () => cursorDot.classList.remove('is-active'));
    });
  }

});
