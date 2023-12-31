"use strict";

/* Selecionando os elementos que serão manipulados */
const formulario = document.querySelector("form");
const campoCep = formulario.querySelector("#cep");
const campoEndereco = formulario.querySelector("#endereco");
const campoBairro = formulario.querySelector("#bairro");
const campoCidade = formulario.querySelector("#cidade");
const campoEstado = formulario.querySelector("#estado");
const botaoBuscar = formulario.querySelector("#buscar");
const mensagem = formulario.querySelector("#status");

//Seleção do Campo telefone usando JS puro
// const campoTelefone = formulario.querySelector("#telefone");

//Seleção do Campo telefone usando Jquery
const campoTelefone = $("#telefone");

// Ativado a mascara para o telefone e cep
$(campoTelefone).mask("(00) 0000-0000"); //Exemplo: (11) 2135-0300 
$(campoCep).mask("00000-000"); //Exemplo: 12135-300 


//-------------------------------------------------------------------------------------------

// Detectando o evento de CLICK no botão buscar
botaoBuscar.addEventListener("click", async function(event){
    event.preventDefault();
    
    let cep; // undefined

    /* Verificando se o cep NÃO tem 8 dígitos.
    O operador !== significa "diferente de". */
    if(campoCep.value.length !== 9){
        // Alerte o usuário sobre o erro de digitação
        mensagem.textContent = "Digite um CEP válido!";
        mensagem.style.color = "purple";
        
        // Pare a execução
        return;
    } else { 
        // Caso contrário (ou seja, tem 8 dígitos), guarde o valor
        cep = campoCep.value;
    }

    /* AJAX -> Técnica de comunicação assíncrona
    para acessar uma API (www.viacep.com.br) */

    // Etapa 1: preparar a URL da API com o CEP digitado
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    // Etapa 2: acessar a API (com a URL) e aguardar o retorno dela
    const resposta = await fetch(url);

    console.log(resposta);

    //Atapa 3: extrair os dados da resposta em formato Json
    const dados = await resposta.json();
    
    // etapa 4: lidar com os dados de resposta (em caso de erro ou sucesso)
    if ("erro" in dados ){
        mensagem.textContent = "Cep invalido";
        mensagem.style.color = "red";
    }else {
        mensagem.textContent = "Cep encontrado";
        mensagem.style.color = "green";

        const exemplos = document.querySelectorAll(".exemplo");
        for(const exemplo of exemplos){
            exemplo.classList.remove("exemplo");
        }

        campoEndereco.value = dados.logradouro;
        campoBairro.value =  dados.bairro;
        campoCidade.value =  dados.localidade;
        campoEstado.value = dados.uf;
    }


});


//----------------Programação do formspree----------------------------------------
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("my-form-status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: formulario.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.innerHTML = "Obrigado pelo sua inscrição!";
          formulario.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Oops! Temos um problema nçao inscrição do seu formulario"
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! Temos um problema nçao inscrição do seu formulario :C"
      });
    }
    formulario.addEventListener("submit", handleSubmit)