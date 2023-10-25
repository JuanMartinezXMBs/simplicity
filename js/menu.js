"use strict";

// Selecionando o elemento (através de descendência) que acionará o menu
const botaoMenu = document.querySelector("nav h2");

// Selecionando a lista/menu através da classe
const menu = document.querySelector(".menu");

// Selecionando o link que está dentro do nav h2
const textoBotao = botaoMenu.querySelector("a");

botaoMenu.addEventListener("click", function(event){
    /* Anular/prevenir o comportamento do link */
    event.preventDefault();
    menu.classList.toggle("aberto");

    if (menu.classList.contains("aberto")) {
        textoBotao.innerHTML = "Fechar &times;";
    } else {
        textoBotao.innerHTML = "Menu &equiv;";
    }
});



