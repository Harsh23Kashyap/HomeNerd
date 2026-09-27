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
  // Both faces are one navigation target. Hover flips without consuming a tap.
  cards.forEach(card => {
    const url = card.dataset.projectUrl;
    if (!url) {
      card.classList.add('link-pending');
      card.removeAttribute('tabindex');
      return;
    }
    const close = card.querySelector('.flip-close');
    close.remove(); // A card click now means open, not return-to-front.
    card.querySelector('.flip-back-body').insertAdjacentHTML('beforeend','<p class="flip-open-hint">Open project ↗</p>');
    card.addEventListener('click', event => {
      event.preventDefault();
      window.open(url, '_blank', 'noopener,noreferrer');
    });
    card.addEventListener('keydown', event => {
      if (event.target === card && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault(); window.open(url, '_blank', 'noopener,noreferrer');
      }
    });
  });
  document.querySelectorAll('a[href="#top"]').forEach(a => a.addEventListener('click', event => {event.preventDefault();window.scrollTo({top:0,behavior:'smooth'});}));
});
