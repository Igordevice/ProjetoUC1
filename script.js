const secaoInicio = document.querySelector('.inicio');
const imagemInicio = document.querySelector('.inicio-produto');
const textosInicio = document.querySelectorAll('.inicio-texto-linha');
const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');

if (secaoInicio && imagemInicio && !reduzirMovimento.matches) {
  window.addEventListener('scroll', () => {
    const rolagem = window.scrollY;
    const progresso = Math.min(rolagem / secaoInicio.offsetHeight, 1);

    imagemInicio.style.transform = `translate(-50%, calc(-40% + ${rolagem * 0.7}px)) scale(${1 + progresso * 0.4})`;
    textosInicio.forEach((linha, indice) => {
      linha.style.transform = `translateY(${rolagem * (0.16 + indice * 0.02)}px)`;
    });
  }, { passive: true });
}

configurarCarrosselCardapio();

function configurarCarrosselCardapio() {
  const janela = document.querySelector('.carrossel-janela');
  const lista = document.querySelector('.lista-produtos');
  const anterior = document.querySelector('.botao-carrossel--anterior');
  const proximo = document.querySelector('.botao-carrossel--proximo');
  const indicadores = document.querySelector('.indicadores');

  if (!janela || !lista || !anterior || !proximo || !indicadores) return;

  const produtos = Array.from(lista.querySelectorAll('.produto'));
  if (!produtos.length) return;

  let indiceAtual = 0;

  const posicaoProduto = (indice) => produtos[indice].offsetLeft - produtos[0].offsetLeft;

  const atualizarEstado = () => {
    Array.from(indicadores.children).forEach((indicador, indice) => {
      const ativo = indice === indiceAtual;
      indicador.classList.toggle('ativo', ativo);
      indicador.setAttribute('aria-current', ativo ? 'true' : 'false');
    });

    anterior.disabled = indiceAtual === 0;
    proximo.disabled = indiceAtual === produtos.length - 1;
  };

  const irParaProduto = (indice, comportamento = 'smooth') => {
    indiceAtual = Math.max(0, Math.min(indice, produtos.length - 1));
    janela.scrollTo({ left: posicaoProduto(indiceAtual), behavior: comportamento });
    atualizarEstado();
  };

  indicadores.innerHTML = '';
  produtos.forEach((_, indice) => {
    const indicador = document.createElement('button');
    indicador.type = 'button';
    indicador.setAttribute('aria-label', `Ir para produto ${indice + 1}`);
    indicador.addEventListener('click', () => irParaProduto(indice));
    indicadores.appendChild(indicador);
  });

  janela.addEventListener('scroll', () => {
    const maisProximo = produtos.reduce((melhor, _, indice) => {
      const distanciaAtual = Math.abs(janela.scrollLeft - posicaoProduto(indice));
      const melhorDistancia = Math.abs(janela.scrollLeft - posicaoProduto(melhor));
      return distanciaAtual < melhorDistancia ? indice : melhor;
    }, 0);

    if (maisProximo !== indiceAtual) {
      indiceAtual = maisProximo;
      atualizarEstado();
    }
  }, { passive: true });

  anterior.addEventListener('click', () => irParaProduto(indiceAtual - 1));
  proximo.addEventListener('click', () => irParaProduto(indiceAtual + 1));
  window.addEventListener('resize', () => irParaProduto(indiceAtual, 'auto'));

  irParaProduto(0, 'auto');
}
