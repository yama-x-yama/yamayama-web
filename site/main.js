(() => {
  'use strict';
  const hero = document.querySelector('.yx-hero');
  const curtain = document.querySelector('.yx-curtain');
  const marquee = document.querySelector('.yx-mq');
  const replayButtons = document.querySelectorAll('[data-replay]');
  const skip = document.querySelector('[data-skip]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let timers = [];
  let generation = 0;

  function clear() {
    generation += 1;
    timers.forEach(clearTimeout);
    timers = [];
  }

  function finish() {
    clear();
    // Restore focus if the Skip control is about to disappear.
    if (curtain.contains(document.activeElement)) replayButtons[0].focus({ preventScroll: true });
    hero.classList.remove('is-pre', 'is-idle', 'is-play', 'is-skip');
    curtain.hidden = true;
    marquee.classList.remove('is-wait');
  }

  function measure() {
    const width = selector => hero.querySelector(selector).offsetWidth;
    const y1 = width('.yx-y1'), x = width('.yx-x'), y2 = width('.yx-y2');
    const dk = Math.max(0, width('.yx-cap') - width('.yx-low') - .123 * parseFloat(getComputedStyle(hero.querySelector('.yx-wm')).fontSize));
    const left = (y1 + x + y2 + width('.yx-dot') - Math.max(width('.yx-kaji') + y1, y2 + dk + width('.yx-saki'))) / 2;
    hero.style.setProperty('--yx-a', `${left + width('.yx-kaji')}px`);
    hero.style.setProperty('--yx-b', `${y1 + x - left}px`);
    hero.style.setProperty('--yx-dk', `${dk}px`);
  }

  function start() {
    finish();
    if (reducedMotion.matches) return;
    const run = generation;
    curtain.hidden = false;
    hero.classList.add('is-pre', 'is-idle');
    marquee.classList.add('is-wait');
    // A font service outage must never leave the page behind the curtain.
    const fontReady = document.fonts ? document.fonts.load('600 80px Outfit').catch(() => {}) : Promise.resolve();
    Promise.race([fontReady, new Promise(resolve => timers.push(setTimeout(resolve, 1800)))]).then(() => {
      if (run !== generation) return;
      measure();
      // Commit the starting frame before starting CSS animations.
      void hero.offsetWidth;
      hero.classList.remove('is-idle');
      hero.classList.add('is-play');
      timers.push(setTimeout(finish, 3750));
    });
  }

  replayButtons.forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      start();
    });
  });
  skip.addEventListener('click', finish);
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) finish(); });
  window.addEventListener('resize', measure);
  let seen = false;
  try { seen = localStorage.getItem('yxy-intro-v2') === '1'; } catch {}
  if (!seen && !reducedMotion.matches) {
    start();
    try { localStorage.setItem('yxy-intro-v2', '1'); } catch {}
  }
})();
