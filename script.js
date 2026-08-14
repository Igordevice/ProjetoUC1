// ======================================
// INCOFFE - Coffee Shop JavaScript
// ======================================

// Get DOM Elements
const coffeeImageWrapper = document.getElementById('coffeeImageWrapper');
const coffeeImage = document.getElementById('coffeeImage');
const heroTextLines = document.querySelectorAll('.hero__text-line');
const navbarCtaButton = document.querySelector('.navbar__cta');
const navbarLinks = document.querySelectorAll('.navbar__link');

// ============ SCROLL EFFECTS ============

/**
 * Handles parallax and zoom effects on scroll
 * - Image scales up as user scrolls down
 * - Text moves at different speeds for parallax effect
 */
function handleScrollEffects() {
  const heroSection = document.getElementById('hero');
  if (!heroSection || !coffeeImageWrapper) return; // só roda na home

  const scrollY = window.scrollY;
  const heroHeight = heroSection.offsetHeight;

  // Calculate scroll progress (0 to 1)
  const scrollProgress = Math.min(scrollY / heroHeight, 1);

  // Image Zoom Effect: scales from 1 to 1.4
  const imageScale = 1 + scrollProgress * 0.4;
  coffeeImageWrapper.style.transform = `translate(-50%, calc(-40% + ${scrollY * 0.7}px)) scale(${imageScale})`;

  // Text Parallax Effect: moves slower than scroll
  const textOffset = scrollY * 0.2;
  heroTextLines.forEach((line, index) => {
    const lineOffset = textOffset * (0.8 + index * 0.1);
    line.style.transform = `translateY(${lineOffset}px)`;
  });
}

// Attach scroll event listener
window.addEventListener('scroll', handleScrollEffects, { passive: true });

// ============ CTA BUTTON ============

if (navbarCtaButton) {
  navbarCtaButton.addEventListener('click', () => {
    alert('Pedido iniciado! 🎉');
  });
}

// ============ SMOOTH SCROLL NAVIGATION ============

navbarLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');

    // Check if it's an anchor link
    if (href && href.startsWith('#')) {
      event.preventDefault();

      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ============ PAGE LOAD INITIALIZATION ============

document.addEventListener('DOMContentLoaded', () => {
  console.log('INCOFFE Website Loaded ✓');
});

// ============ CARROSSEL DE PRODUTOS (.carousel-track / .produto) ============

const produtoTrack = document.querySelector('.carousel-track');
const produtoPrevBtn = document.querySelector('.prev');
const produtoNextBtn = document.querySelector('.next');

if (produtoTrack && produtoPrevBtn && produtoNextBtn) {

  let produtoIndex = 0;

  function updateProdutoCarousel() {
    const firstItem = produtoTrack.querySelector('.produto');
    if (!firstItem) return;
    const itemWidth = firstItem.offsetWidth + 24;
    produtoTrack.style.transform = `translateX(-${produtoIndex * itemWidth}px)`;
  }

  produtoNextBtn.addEventListener('click', () => {
    const items = produtoTrack.querySelectorAll('.produto');
    if (produtoIndex < items.length - 1) {
      produtoIndex++;
      updateProdutoCarousel();
    }
  });

  produtoPrevBtn.addEventListener('click', () => {
    if (produtoIndex > 0) {
      produtoIndex--;
      updateProdutoCarousel();
    }
  });

  window.addEventListener('resize', () => {
    const items = produtoTrack.querySelectorAll('.produto');
    if (produtoIndex >= items.length) {
      produtoIndex = items.length - 1;
    }
    updateProdutoCarousel();
  });
}

// ============ FILTRO DO CARDÁPIO (.filtro-btn / .card-produto) ============

const filtroBotoes = document.querySelectorAll('.filtro-btn');
const filtroCards = document.querySelectorAll('.card-produto');

if (filtroBotoes.length && filtroCards.length) {
  filtroBotoes.forEach(botao => {
    botao.addEventListener('click', () => {
      filtroBotoes.forEach(b => b.classList.remove('active'));
      botao.classList.add('active');

      const filtro = botao.dataset.filtro;

      filtroCards.forEach(card => {
        const categorias = card.dataset.categorias.split(' ');

        if (filtro === 'todos' || categorias.includes(filtro)) {
          card.classList.remove('escondido');
        } else {
          card.classList.add('escondido');
        }
      });
    });
  });
}

// ============ CARROSSEL DE ENDEREÇOS (#track / .card) ============

const enderecoTrack = document.getElementById('track');
const enderecoPrevBtn = document.getElementById('prevBtn');
const enderecoNextBtn = document.getElementById('nextBtn');
const enderecoDots = document.getElementById('dots');

if (enderecoTrack && enderecoPrevBtn && enderecoNextBtn && enderecoDots) {

  const enderecoCards = Array.from(enderecoTrack.children);
  let enderecoIndex = 0;
  let cardsPerView = getCardsPerView();

  function getCardsPerView() {
    return window.innerWidth >= 900 ? 3 : 1;
  }

  function getMaxIndex() {
    return Math.max(0, enderecoCards.length - cardsPerView);
  }

  function updateEnderecoCarousel() {
    const cardWidthPercent = 100 / cardsPerView;
    const offset = enderecoIndex * cardWidthPercent;
    enderecoTrack.style.transform = `translateX(-${offset}%)`;

    enderecoPrevBtn.disabled = enderecoIndex === 0;
    enderecoNextBtn.disabled = enderecoIndex >= getMaxIndex();

    updateDots();
  }

  function buildDots() {
    enderecoDots.innerHTML = '';
    const totalDots = getMaxIndex() + 1;
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      if (i === enderecoIndex) dot.classList.add('active');
      dot.addEventListener('click', () => {
        enderecoIndex = i;
        updateEnderecoCarousel();
      });
      enderecoDots.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = enderecoDots.querySelectorAll('.dot');
    dots.forEach((dot, i) => dot.classList.toggle('active', i === enderecoIndex));
  }

  enderecoPrevBtn.addEventListener('click', () => {
    if (enderecoIndex > 0) {
      enderecoIndex--;
      updateEnderecoCarousel();
    }
  });

  enderecoNextBtn.addEventListener('click', () => {
    if (enderecoIndex < getMaxIndex()) {
      enderecoIndex++;
      updateEnderecoCarousel();
    }
  });

  window.addEventListener('resize', () => {
    cardsPerView = getCardsPerView();
    enderecoIndex = Math.min(enderecoIndex, getMaxIndex());
    buildDots();
    updateEnderecoCarousel();
  });

  let startX = 0;
  let isDragging = false;

  enderecoTrack.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  enderecoTrack.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50 && enderecoIndex < getMaxIndex()) {
      enderecoIndex++;
    } else if (diff < -50 && enderecoIndex > 0) {
      enderecoIndex--;
    }
    updateEnderecoCarousel();
    isDragging = false;
  });

  buildDots();
  updateEnderecoCarousel();
}