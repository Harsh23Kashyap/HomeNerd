// Works without a server. Filters only change what is shown in this local preview.
document.addEventListener('DOMContentLoaded', () => {
  const buttons = [...document.querySelectorAll('.filters button')];
  const grid = document.querySelector('.project-grid');
  const originalCards = [...grid.querySelectorAll('.project')];
  const priorityNames = new Set(['DietChat', 'CustomNerd', 'WirelessNerd', 'HallucinationNerd', 'NewsNerd']);
  const groups = ['All projects', 'Food & health', 'News & ideas', 'Tools & evidence'];
  const kindsByName = new Map(originalCards.map((card, i) => [card.querySelector('h3').textContent.trim(),
    ['Food & health', 'Food & health', 'News & ideas', 'Tools & evidence', 'Tools & evidence', 'Tools & evidence', 'Tools & evidence', 'Tools & evidence', 'Tools & evidence', 'Tools & evidence'][i]]));
  const name = card => card.querySelector('h3').textContent.trim();
  const shuffle = items => {
    const out = items.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  };
  const priority = originalCards.filter(card => priorityNames.has(name(card)));
  const others = originalCards.filter(card => !priorityNames.has(name(card)));
  let cards = [...shuffle(priority), ...shuffle(others)];
  // Avoid repeating the immediately previous order when local storage is available.
  try {
    const previous = localStorage.getItem('nerd-family-card-order');
    if (cards.map(name).join('|') === previous) {
      [cards[0], cards[1]] = [cards[1], cards[0]];
      [cards[5], cards[6]] = [cards[6], cards[5]];
    }
    localStorage.setItem('nerd-family-card-order', cards.map(name).join('|'));
  } catch (_) { /* File previews or privacy settings may deny storage. */ }
  cards.forEach((card, i) => {
    grid.append(card); // The keyboard order follows the visual order.
    const number = String(i + 1).padStart(2, '0') + ' / 10';
    card.querySelectorAll('.index, .flip-index').forEach(label => { label.textContent = number; });
  });
  function update(group) {
    buttons.forEach((button, i) => {
      const active = groups[i] === group;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    cards.forEach((card, i) => {
      card.hidden = group !== 'All projects' && kindsByName.get(name(card)) !== group;
      card.classList.toggle('featured', group === 'All projects' && i === 0);
    });
  }
  update('All projects');
  buttons.forEach((button, i) => button.addEventListener('click', () => update(groups[i])));
  // Both faces are one navigation target. Hover flips without consuming a tap.
  cards.forEach(card => {
    if (card.classList.contains('preview-flip')) {
      const togglePreview = () => {
        const flipped = card.classList.toggle('is-flipped');
        card.setAttribute('aria-pressed', String(flipped));
      };
      card.addEventListener('click', togglePreview);
      card.addEventListener('keydown', event => {
        if (event.target === card && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault(); togglePreview();
        }
      });
      return;
    }
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
  // Pointer-only tilt follows the cursor; touch taps still open linked sites.
  if (window.matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)').matches) {
    cards.forEach(card => {
      card.addEventListener('pointermove', event => {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - .5;
        const y = (event.clientY - bounds.top) / bounds.height - .5;
        card.style.setProperty('--tilt-x', `${(-y * 3).toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${(x * 3).toFixed(2)}deg`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.removeProperty('--tilt-x');
        card.style.removeProperty('--tilt-y');
      });
    });
  }
  document.querySelectorAll('a[href="#top"]').forEach(a => a.addEventListener('click', event => {event.preventDefault();window.scrollTo({top:0,behavior:'smooth'});}));
});
