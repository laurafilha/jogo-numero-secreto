//let titulo = document.querySelector("h1");
//titulo.innerHTML = "jogo dos numerinho";

//let paragrafo = document.querySelector("p");
//paragrafo.innerHTML = "meuir mão escolha um número imediatamente";

// criando variável para 'guardar' a lista de números que já foram sorteados pra não repetir, criando uma lista vazia
let listDeNumerosSorteados = [];
let limiteDeNumeros = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// aqui criamos uma função e definimos o que ela vai modificar (qual a função, o que ela vai fazer e em quem)
function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.1 });
}

function mensagemInicial() {
  exibirTextoNaTela("h1", "joguinho dos numerinho");
  exibirTextoNaTela("p", "meuir mão escolha um número imediatamente");
}

mensagemInicial();

// verificar se o número aleatório está certo, se é maior ou menor
function verificarChute() {
  let chute = document.querySelector("input").value;
  console.log(numeroSecreto);

  // se o chute estiver certo, mostrar esse texto. se for maior, mostrar outro texto e se for menor mostrar outro
  if (chute == numeroSecreto) {
    exibirTextoNaTela("h1", "acertou meu chapa");
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativas = `em ${tentativas} ${palavraTentativa} vai corinthians`;
    exibirTextoNaTela("p", mensagemTentativas);
    // fazendo o botão tentar de novo funcionar linkando com o id reiniciar no html e removendo o atributo disabled, que o deixava apagado
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela("p", "menos aí camaradinha");
    } else {
      exibirTextoNaTela("p", "mais aí brother ou sister");
    }
  }
  // conta quantas tentativas foram feitas pelo usuário
  tentativas++;
  limparCampo();
}

//função de gerar número aleatório a ser descoberto pelo usuário
function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * limiteDeNumeros + 1);
  let quantidadeDeElementosNaLista = listDeNumerosSorteados.length;

  if (quantidadeDeElementosNaLista == limiteDeNumeros) {
    listDeNumerosSorteados = [];
  }
  // verifica se algo dentro de uma lista está 'incluído' em uma lista
  if (listDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listDeNumerosSorteados.push(numeroEscolhido);
    console.log(listDeNumerosSorteados);
    return numeroEscolhido;
  }
}

//parseint e math.random que vão gerar o número aleatório
// return vai retornar a função que foi chamada na primeira linha do código (quando a função gerar for chamada, retorne um número aleatório)

//função para limpar o campo de input depois do chute
function limparCampo() {
  chute = document.querySelector("input");
  chute.value = " ";
}

// reiniciando o jogo quando o jogador acerta. o codigo gera outro número aleatório, limpa o campo de input, zera o número de tentativas, retorna a mensagem inicial e "liga" o disabled do elemento
function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  mensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
