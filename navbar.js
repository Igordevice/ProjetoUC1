const botaoMenu = document.querySelector("#botao-mobile");
const menuMobilePadrao = document.querySelector("#menu-mobile");
const iconeMenu = botaoMenu?.querySelector("i");
const barraPadrao = document.querySelector("#barra-navegacao");

function fecharMenuPadrao() {
  menuMobilePadrao?.classList.remove("ativo");
  botaoMenu?.setAttribute("aria-expanded", "false");
  iconeMenu?.classList.add("fa-bars");
  iconeMenu?.classList.remove("fa-xmark");
}

if (botaoMenu && menuMobilePadrao && !botaoMenu.dataset.navbarPronto) {
  botaoMenu.dataset.navbarPronto = "true";

  botaoMenu.addEventListener("click", () => {
    const menuAberto = menuMobilePadrao.classList.toggle("ativo");

    botaoMenu.setAttribute("aria-expanded", String(menuAberto));
    iconeMenu?.classList.toggle("fa-bars", !menuAberto);
    iconeMenu?.classList.toggle("fa-xmark", menuAberto);
  });

  menuMobilePadrao.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", fecharMenuPadrao);
  });
}

if (barraPadrao) {
  const atualizarSombra = () => {
    barraPadrao.classList.toggle("com-sombra", window.scrollY > 8);
  };

  atualizarSombra();
  window.addEventListener("scroll", atualizarSombra, { passive: true });
}
