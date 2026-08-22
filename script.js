const hero = document.getElementById('hero');
const coffeeImageWrapper = document.getElementById('coffeeImageWrapper');
const heroTextLines = document.querySelectorAll('.hero__text-line');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (hero && coffeeImageWrapper && !reduceMotion.matches) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const progress = Math.min(scrollY / hero.offsetHeight, 1);

    coffeeImageWrapper.style.transform = `translate(-50%, calc(-40% + ${scrollY * 0.7}px)) scale(${1 + progress * 0.4})`;
    heroTextLines.forEach((line, index) => {
      line.style.transform = `translateY(${scrollY * (0.16 + index * 0.02)}px)`;
    });
  }, { passive: true });
}

setupProductCarousel();
setupStoreCarousel();

function setupProductCarousel() {
  const viewport = document.querySelector('.janela-carrossel');
  const list = document.querySelector('.lista-produtos');
  const prev = document.querySelector('.controle-anterior');
  const next = document.querySelector('.controle-proximo');
  const dots = document.querySelector('.indicadores');

  if (!viewport || !list || !prev || !next || !dots) return;

  const cards = Array.from(list.querySelectorAll('.produto'));
  if (!cards.length) return;

  let index = 0;

  const cardLeft = (i) => cards[i].offsetLeft - cards[0].offsetLeft;
  const update = () => {
    Array.from(dots.children).forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle('ativo', active);
      dot.setAttribute('aria-current', active ? 'true' : 'false');
    });
    prev.disabled = index === 0;
    next.disabled = index === cards.length - 1;
  };
  const goTo = (i, behavior = 'smooth') => {
    index = Math.max(0, Math.min(i, cards.length - 1));
    viewport.scrollTo({ left: cardLeft(index), behavior });
    update();
  };

  dots.innerHTML = '';
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Ir para produto ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dots.appendChild(dot);
  });

  viewport.addEventListener('scroll', () => {
    const closest = cards.reduce((best, _, i) => {
      const distance = Math.abs(viewport.scrollLeft - cardLeft(i));
      return distance < Math.abs(viewport.scrollLeft - cardLeft(best)) ? i : best;
    }, 0);

    if (closest !== index) {
      index = closest;
      update();
    }
  }, { passive: true });

  prev.addEventListener('click', () => goTo(index - 1));
  next.addEventListener('click', () => goTo(index + 1));
  window.addEventListener('resize', () => goTo(index, 'auto'));
  goTo(0, 'auto');
}

function setupStoreCarousel() {
  const track = document.getElementById('track');
  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');
  const dots = document.getElementById('dots');

  if (!track || !prev || !next || !dots) return;

  const cards = Array.from(track.children);
  if (!cards.length) return;

  let index = 0;
  let perView = getPerView();

  function getPerView() {
    if (window.innerWidth >= 1000) return 3;
    if (window.innerWidth >= 700) return 2;
    return 1;
  }

  const maxIndex = () => Math.max(0, cards.length - perView);
  const step = () => {
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return cards[0].getBoundingClientRect().width + gap;
  };
  const update = () => {
    index = Math.max(0, Math.min(index, maxIndex()));
    track.style.transform = `translateX(-${index * step()}px)`;
    prev.disabled = index === 0;
    next.disabled = index === maxIndex();
    Array.from(dots.children).forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-current', active ? 'true' : 'false');
    });
  };
  const buildDots = () => {
    dots.innerHTML = '';
    for (let i = 0; i <= maxIndex(); i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'dot';
      dot.setAttribute('aria-label', `Ir para loja ${i + 1}`);
      dot.addEventListener('click', () => {
        index = i;
        update();
      });
      dots.appendChild(dot);
    }
  };

  prev.addEventListener('click', () => {
    index--;
    update();
  });
  next.addEventListener('click', () => {
    index++;
    update();
  });
  window.addEventListener('resize', () => {
    perView = getPerView();
    buildDots();
    update();
  });

  let startX = 0;
  track.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
  }, { passive: true });
  track.addEventListener('touchend', (event) => {
    const diff = startX - event.changedTouches[0].clientX;
    if (diff > 50) index++;
    if (diff < -50) index--;
    update();
  });

  buildDots();
  update();
}
