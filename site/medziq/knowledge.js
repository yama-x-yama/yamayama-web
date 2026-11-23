(() => {
  const section = document.querySelector('.km-study');
  if (!section) return;

  const list = section.querySelector('.km-subjects');
  const tabs = Array.from(list.querySelectorAll('.km-node'));
  const notes = tabs.map(tab => document.getElementById(tab.hash.slice(1)));
  const lines = tabs.map(tab => section.querySelector('[data-km-line="' + tab.hash.slice(4) + '"]'));
  list.setAttribute('role', 'tablist');

  function select(index) {
    tabs.forEach((tab, position) => {
      const selected = position === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      notes[position].hidden = !selected;
      lines[position].classList.toggle('km-current', selected);
    });
  }

  tabs.forEach((tab, index) => {
    const panel = notes[index];
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panel.id);
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    panel.tabIndex = 0;
    tab.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      select(index);
    });
    tab.addEventListener('keydown', event => {
      if (event.key === ' ') {
        event.preventDefault();
        select(index);
        return;
      }
      const moves = {
        ArrowRight: (index + 1) % tabs.length,
        ArrowLeft: (index + tabs.length - 1) % tabs.length,
        ArrowUp: (index + 2) % tabs.length,
        ArrowDown: (index + 2) % tabs.length,
        Home: 0,
        End: tabs.length - 1
      };
      if (!(event.key in moves)) return;
      event.preventDefault();
      select(moves[event.key]);
      tabs[moves[event.key]].focus();
    });
  });
  function selectFromHash() {
    const match = tabs.findIndex(tab => tab.hash === location.hash);
    if (match !== -1) select(match);
  }
  select(0);
  selectFromHash();
  window.addEventListener('hashchange', selectFromHash);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('km-in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .25 });
    section.querySelectorAll('.km-excerpt, .km-map').forEach(element => observer.observe(element));
  }
})();
