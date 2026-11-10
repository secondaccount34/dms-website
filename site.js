(() => {
  const toggle = document.querySelector('.toggle');
  const nav = document.querySelector('.links');
  if (toggle && nav) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    }));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
        toggle.focus();
      }
    });
  }

  // Never leave a broken-image icon on the page if an asset is missing.
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      img.classList.add('image-unavailable');
      img.alt = img.alt || 'Project image unavailable';
      img.style.visibility = 'hidden';
      const fallback = document.createElement('div');
      fallback.className = 'image-fallback';
      fallback.setAttribute('role', 'img');
      fallback.setAttribute('aria-label', img.alt);
      fallback.textContent = 'DMSP ENGINEERING';
      img.parentElement?.appendChild(fallback);
    }, { once: true });
  });

  const revealItems = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window && revealItems.length) {
    document.documentElement.classList.add('reveal-ready');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -42px 0px' });
    revealItems.forEach(item => observer.observe(item));
  }
})();
