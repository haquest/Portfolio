// Accessible tabs for <Personas> and <Compare> (arrow keys move between tabs).
// Without JavaScript the tab list stays hidden and every panel is shown.
document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((root) => {
  if (root.dataset.tabsReady) return;
  root.dataset.tabsReady = 'true';
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')!)!);
  root.querySelector('[role="tablist"]')?.classList.remove('hidden');
  root.querySelector('[role="tablist"]')?.classList.add('flex');
  const select = (i: number, focus = false) => {
    tabs.forEach((t, j) => {
      t.setAttribute('aria-selected', String(i === j));
      t.tabIndex = i === j ? 0 : -1;
      panels[j].hidden = i !== j;
    });
    if (focus) tabs[i].focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(i));
    t.addEventListener('keydown', (e) => {
      const k = e.key;
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(k)) return;
      e.preventDefault();
      const n = tabs.length;
      const next =
        k === 'Home' ? 0 : k === 'End' ? n - 1 : (i + (k === 'ArrowRight' ? 1 : -1) + n) % n;
      select(next, true);
    });
  });
  // Panels have no accessible name of their own when tabs exist.
  panels.forEach((p) => p.removeAttribute('aria-label'));
  select(0);
});
