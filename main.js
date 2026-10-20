(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var nav = document.querySelector('.navbar');
  function onScroll() { if (nav) nav.classList.toggle('scrolled', window.scrollY > 24); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  if (!reduced) {
    var p = document.querySelector('[data-parallax]');
    var tick = false;
    if (p) {
      window.addEventListener('scroll', function () {
        if (!tick) {
          requestAnimationFrame(function () {
            p.style.transform = 'translateY(' + (window.scrollY * 0.06) + 'px)';
            tick = false;
          });
          tick = true;
        }
      }, { passive: true });
    }
  }

  var openBtn = document.querySelector('[data-testid="popup-open-btn"]');
  var popup = document.getElementById('site-popup');
  var closeBtn = document.querySelector('[data-testid="popup-close-btn"]');
  if (openBtn && popup) {
    openBtn.addEventListener('click', function () { popup.classList.add('open'); });
    if (closeBtn) closeBtn.addEventListener('click', function () { popup.classList.remove('open'); });
    popup.addEventListener('click', function (e) { if (e.target === popup) popup.classList.remove('open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') popup.classList.remove('open'); });
  }
})();