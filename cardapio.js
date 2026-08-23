const botaoMobile = document.querySelector('#botao-mobile');
const menuMobile = document.querySelector('#menu-mobile');
const iconeMobile = botaoMobile?.querySelector('i');
const barraNavegacao = document.querySelector('#barra-navegacao');
const formularioPesquisa = document.querySelector('.barra-pesquisa');
const campoPesquisa = document.querySelector('.input-pesquisa');
const produtos = Array.from(document.querySelectorAll('.produto-card'));
const mensagemSemProduto = document.querySelector('.mensagem-sem-produto');

botaoMobile?.addEventListener('click', () => {
  const menuAberto = menuMobile?.classList.toggle('ativo') ?? false;

  botaoMobile.setAttribute('aria-expanded', String(menuAberto));
  iconeMobile?.classList.toggle('fa-bars', !menuAberto);
  iconeMobile?.classList.toggle('fa-xmark', menuAberto);
});

menuMobile?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuMobile.classList.remove('ativo');
    botaoMobile?.setAttribute('aria-expanded', 'false');
    iconeMobile?.classList.add('fa-bars');
    iconeMobile?.classList.remove('fa-xmark');
  });
});

window.addEventListener('scroll', () => {
  barraNavegacao?.classList.toggle('com-sombra', window.scrollY > 8);
}, { passive: true });

formularioPesquisa?.addEventListener('submit', (evento) => {
  evento.preventDefault();
});

campoPesquisa?.addEventListener('input', () => {
  const termo = normalizarTexto(campoPesquisa.value);
  let totalVisivel = 0;

  produtos.forEach((produto) => {
    const textoProduto = normalizarTexto(produto.textContent);
    const produtoVisivel = termo === '' || textoProduto.includes(termo);

    produto.hidden = !produtoVisivel;
    if (produtoVisivel) totalVisivel += 1;
  });

  if (mensagemSemProduto) {
    mensagemSemProduto.hidden = totalVisivel > 0 || termo === '';
  }
});

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}
