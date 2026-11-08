(() => {
  const M = window.Motion;
  if (!M?.animate) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const running = new Map();
  const finish = (detail, open) => {
    detail.open = open;
    detail.style.height = '';
    detail.style.overflow = '';
    running.delete(detail);
  };
  document.querySelectorAll('details.hub-mini, details.hub-fold').forEach(detail => {
    const summary = detail.querySelector(':scope > summary');
    if (!summary || detail.closest(".hub-region-buttons")) return;
    summary.addEventListener('click', event => {
      if (reduced.matches || event.target.closest('a,button,input')) return;
      event.preventDefault();
      const previous = running.get(detail);
      const open = previous ? !previous.open : !detail.open;
      const from = detail.getBoundingClientRect().height;
      previous?.animation.stop();
      detail.style.height = '';
      detail.open = open;
      const to = detail.getBoundingClientRect().height;
      // Keep contents available during the closing transition.
      detail.open = true;
      detail.style.overflow = 'hidden';
      const animation = M.animate(detail, { height: [from + 'px', to + 'px'] }, { duration: .28, ease: [.22, 1, .36, 1] });
      running.set(detail, { animation, open });
      animation.then(() => {
        if (running.get(detail)?.animation === animation) finish(detail, open);
      });
    });
  });
  // A small photo detail on mouse hover; no movement on touch screens.
  const photos = new Map();
  const stopHover = M.hover?.('#cases .hub-case', card => {
    if (reduced.matches) return;
    const img = card.querySelector('img');
    if (!img) return;
    photos.get(img)?.stop();
    photos.set(img, M.animate(img, { scale: 1.025 }, { duration: .45, ease: [.22,1,.36,1] }));
    return () => {
      photos.get(img)?.stop();
      photos.set(img, M.animate(img, { scale: 1 }, { duration: .3 }));
    };
  });
  reduced.addEventListener('change', () => {
    if (!reduced.matches) return;
    for (const [detail, state] of running) { state.animation.stop(); finish(detail, state.open); }
    stopHover?.();
    for (const [img, animation] of photos) { animation.stop(); img.style.transform = ''; }
  });
  // A resize must not leave an accordion with a stale fixed height.
  addEventListener('resize', () => {
    for (const [detail, state] of running) { state.animation.stop(); finish(detail, state.open); }
  });
})();
