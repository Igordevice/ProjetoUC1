const formularioPesquisa = document.querySelector('.barra-pesquisa');
const campoPesquisa = document.querySelector('.input-pesquisa');
const produtos = Array.from(document.querySelectorAll('.produto-card'));
const mensagemSemProduto = document.querySelector('.mensagem-sem-produto');

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


function adicionarCarrinho(nome, preco) {

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const produtoExistente = carrinho.find(
        produto => produto.nome === nome
    );

    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });

    }

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

    alert(nome + " foi adicionado ao carrinho!");

}

ScrollReveal().reveal('.lista-comentarios', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
})
ScrollReveal().reveal('.cabecalho-imagem', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
})
   
