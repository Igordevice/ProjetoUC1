let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// MOSTRAR CARRINHO
function mostrarCarrinho() {
    const lista = document.getElementById("lista-carrinho");
    lista.innerHTML = "";

    if (carrinho.length === 0) {
        lista.innerHTML = `
            <div class="carrinho-vazio">
                <h2>Seu carrinho está vazio</h2>
                <p>Adicione alguns produtos para continuar.</p>
            </div>
        `;
        atualizarTotal();
        return;
    }

    carrinho.forEach((produto, index) => {
        const item = document.createElement("div");
        item.classList.add("produto");
        item.innerHTML = `
            <div class="produto-info">
                <span class="produto-nome">
                    ${produto.nome}
                </span>
                <span class="produto-preco">
                    R$ ${produto.preco.toFixed(2).replace(".", ",")}
                </span>
            </div>

            <div class="quantidade">
                <button onclick="diminuirQuantidade(${index})">
                    -
                </button>
                <span>
                    ${produto.quantidade}
                </span>
                <button onclick="aumentarQuantidade(${index})">
                    +
                </button>
            </div>
        `;
        lista.appendChild(item);
    });

    atualizarTotal();
}

// AUMENTAR QUANTIDADE
function aumentarQuantidade(index) {
    carrinho[index].quantidade++;
    salvarCarrinho();
    mostrarCarrinho();
}

// DIMINUIR QUANTIDADE
function diminuirQuantidade(index) {
    if (carrinho[index].quantidade > 1) {
        carrinho[index].quantidade--;
    } else {
        carrinho.splice(index, 1);
    }
    salvarCarrinho();
    mostrarCarrinho();
}

// ATUALIZAR TOTAL
function atualizarTotal() {
    let total = 0;

    carrinho.forEach(produto => {
        total += produto.preco * produto.quantidade;
    });

    const valorFormatado = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    document.getElementById("subtotal").textContent = valorFormatado;
    document.getElementById("total").textContent = valorFormatado;
}

// SALVAR CARRINHO
function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// MOSTRAR PAGAMENTO
function mostrarPagamento() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    document.getElementById("pagamento").classList.add("ativo");
}

// FECHAR PAGAMENTO
function fecharPagamento() {
    document.getElementById("pagamento").classList.remove("ativo");
}

// CARREGAR AO ABRIR A PÁGINA
mostrarCarrinho();