(() => {
  const experience = document.querySelector('.mx-exp');
  if (!experience) return;

  const nav = experience.querySelector('.mx-exp-steps');
  const steps = Array.from(nav.querySelectorAll('[data-mx-step]'));
  const asides = experience.querySelectorAll('[data-mx-aside]');
  const views = experience.querySelectorAll('[data-mx-view]');
  const equation = experience.querySelector('.mx-exp-equation');
  const sourceButton = experience.querySelector('.mx-exp-source-link');
  const feedback = experience.querySelector('.mx-exp-feedback');
  const answers = experience.querySelectorAll('[data-mx-answer]');
  const terms = experience.querySelectorAll('[data-mx-term]');
  const termNote = experience.querySelector('.mx-exp-term-note');
  const viewForStep = { 1: 'reader', 2: 'map', 3: 'quiz', 4: 'reader' };
  const definitions = {
    hr: ['心拍数（HR）', '1分間に心臓が拍動する回数。'],
    sv: ['一回拍出量（SV）', '心臓の片方の心室が、1回の拍動で送り出す血液の量。'],
  };

  function chooseTerm(term) {
    const [label, explanation] = definitions[term];
    const strong = document.createElement('strong');
    strong.textContent = label;
    termNote.replaceChildren(strong, explanation);
    terms.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mxTerm === term)));
  }

  function changeStep(step, moveFocus) {
    steps.forEach(button => {
      if (button.dataset.mxStep === step) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    asides.forEach(aside => { aside.hidden = aside.dataset.mxAside !== step; });
    views.forEach(view => { view.hidden = view.dataset.mxView !== viewForStep[step]; });
    equation.classList.toggle('mx-exp-highlight', step === '4');
    equation.querySelector('.mx-exp-source-flag').hidden = step !== '4';

    if (step === '1') chooseTerm('hr');
    if (step === '3') {
      answers.forEach(button => button.setAttribute('aria-pressed', 'false'));
      feedback.textContent = '';
      sourceButton.hidden = true;
    }
    if (moveFocus) {
      const target = step === '4' ? equation : experience.querySelector('[data-mx-aside="' + step + '"] h3');
      target.tabIndex = -1;
      target.focus();
    }
  }

  experience.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || !experience.contains(button)) return;
    if (button.dataset.mxStep) changeStep(button.dataset.mxStep, false);
    if (button.dataset.mxGo) changeStep(button.dataset.mxGo, true);
    if (button.dataset.mxTerm) chooseTerm(button.dataset.mxTerm);
    if (button.dataset.mxAnswer) {
      answers.forEach(answer => answer.setAttribute('aria-pressed', String(answer === button)));
      feedback.textContent = button.dataset.mxAnswer === '4200'
        ? '正解です。講義資料の式で計算をたどってみましょう。'
        : 'もう一歩。単位に注目して、講義資料の式を見返してみましょう。';
      sourceButton.hidden = false;
    }
  });

  nav.addEventListener('keydown', event => {
    const index = steps.indexOf(event.target);
    if (index < 0) return;
    const keys = {
      ArrowRight: (index + 1) % steps.length,
      ArrowLeft: (index + steps.length - 1) % steps.length,
      Home: 0,
      End: steps.length - 1,
    };
    if (!Object.hasOwn(keys, event.key)) return;
    event.preventDefault();
    const next = steps[keys[event.key]];
    next.focus();
    changeStep(next.dataset.mxStep, false);
  });

  nav.hidden = false;
  experience.querySelector('[data-mx-go="2"]').hidden = false;
})();
