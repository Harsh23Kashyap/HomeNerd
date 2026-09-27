// Works without a server. Filters only change what is shown in this local preview.
document.addEventListener('DOMContentLoaded', () => {
  const buttons = [...document.querySelectorAll('.filters button')];
  const cards = [...document.querySelectorAll('.project-grid .project')];
  const groups = ['All projects', 'Food & health', 'News & ideas', 'Tools & evidence'];
  const kinds = ['Food & health', 'Food & health', 'News & ideas', 'Tools & evidence', 'Tools & evidence', 'Tools & evidence', 'Tools & evidence'];
  function update(group) {
    buttons.forEach((button, i) => {
      const active = groups[i] === group;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    cards.forEach((card, i) => {
      card.hidden = group !== 'All projects' && kinds[i] !== group;
      card.classList.toggle('featured', group === 'All projects' && i === 0);
    });
  }
  buttons.forEach((button, i) => button.addEventListener('click', () => update(groups[i])));
  // On touch and keyboard, each card can be flipped without a hover gesture.
  cards.forEach(card => {
    const close = card.querySelector('.flip-close');
    function setFlip(value) {
      card.classList.toggle('is-flipped', value);
      card.setAttribute('aria-label', card.querySelector('.flip-back-top .eyebrow').textContent.split(' /')[0] + (value ? ': more information shown' : ': flip card to read more'));
    }
    card.addEventListener('click', event => {
      if (event.target.closest('button, a')) return;
      setFlip(!card.classList.contains('is-flipped'));
    });
    close.addEventListener('click', () => { setFlip(false); card.focus({preventScroll:true}); });
    card.addEventListener('keydown', event => {
      if (event.key === 'Escape' && card.classList.contains('is-flipped')) { event.preventDefault(); setFlip(false); card.focus({preventScroll:true}); }
      else if (event.target === card && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); setFlip(!card.classList.contains('is-flipped')); }
    });
  });
  document.querySelectorAll('a[href="#top"]').forEach(a => a.addEventListener('click', event => {event.preventDefault();window.scrollTo({top:0,behavior:'smooth'});}));
});
