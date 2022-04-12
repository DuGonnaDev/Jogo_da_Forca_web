/* Elemento HTML referente a categoria */
const categoria = document.querySelector("#category");
/* Elemento HTML referente a lista das letras erradas*/
const letrasErradas = document.querySelector(".wrongLetters");
/* Elemento HTML referente a palavra oculta
   Utilizaremos esse mesmo elemento para exibir as mensagens do jogo*/
   const palavraInterface = document.querySelector(".dashes");
/* Array com elementos HTML referentes aos olhos do personagem */
const olhos = Array.from(document.querySelectorAll(".eyes"));
/* Array com elementos HTML referentes as partes do corpo */
let partesBoneco = Array.from(document.querySelectorAll("#person div"));
partesBoneco = partesBoneco.slice(2, partesBoneco.length);
/* Palavra corrente */
let palavraProposta;
/* Lista das letras erradas */
let letrasErradasArray = [];
/* Index da parte do corpo corrente */
let indiceBoneco;
/* Numero de chances do jogador */
const numTentativas = 7;
/* Valor para opacidade dos olhos */
const opacidadeOlhos = 0.3;

/* Objeto de categorias */
const categorias = {
    frutas: ["abacaxi", "abacate", "amora", "banana", "caju", "carambola", "cacau", "damasco", "figo", "framboesa", "goiaba", "graviola", "jabuticaba", "kiwi", "laranja", "lichia", "melancia", "nectarina", "physalis", "tamarindo", "tangerina", "uva"],
    animais: ["avestruz", "andorinha", "abelha", "alce", "aranha", "baleia", "boi", "borboleta", "cachorro", "cavalo", "coelho", "coruja", "camelo", "corvo", "capivara", "caranguejo", "carneiro", "cabrito", "cabra", "coala", "castor", "cascavel", "cupim", "cisne", "chimpanzé", "cobra", "crocodilo", "camaleão", "elefante", "esquilo", "foca", "flamingo", "gato", "galinha", "gambá", "ganso", "gavião", "gorila", "golfinho", "hipopótamo", "hamster", "hiena", "iguana", "jabuti", "leopardo", "lontra", "lebre", "lula", "marisco", "macaco", "mosquito", "mosca", "naja", "ovelha", "ostra", "pato", "porco", "papagaio", "pelicano", "peixe", "piranha", "piolho", "pulga", "puma", "raposa", "rena", "rato", "rinoceronte", "sapo", "tatu", "taturana", "tigre", "touro", "tucano", "urso", "urubu", "veado", "vaca", "vespa", "zebra"],
    profissoes: ["arquiteto", "astronauta", "atleta", "alfaiate", "balconista", "bailarino", "cantor", "carteiro", "coveiro", "caixa", "cabeleireiro", "cozinheiro", "dentista", "delegado", "esteticista", "escritor", "empreendedor", "eletricista", "engenheiro", "frentista", "florista", "fazendeiro", "gari", "hoteleiro", "horticultor", "historiador", "inventor", "jardineiro", "joalheiro", "juiz", "locutor", "lojista", "maestro", "motorista", "mercador", "nutricionista", "otorrino", "oculista", "oftalmologista", "pedagoga", "padeiro", "pedicure", "pizzaiolo", "piloto", "professor", "radialista", "relojoeiro", "sapateiro", "soldador", "vigilante", "tatuador", "taxista", "terapeuta", "tradutor", "urologista", "vendedor", "vidraceiro", "zelador"],
    cores: ["amarelo", "azul", "bege", "branco", "bronze", "caramelo", "cereja", "ciano", "castanho", "cinza", "dourado", "escarlate", "esmeralda", "laranja", "lavanda", "marrom", "magenta", "marfim", "mostarda", "neve", "nude", "prata", "preto", "rosa", "roxo", "turquesa", "verde", "vermelho", "violeta"]
};
/* Funções de seleção e exibição aleatória de categorias */
function retornaArrayCategorias(){
    return Object.keys(categorias);
}

function retornaCategoria(){
    const arrayCategorias = retornaArrayCategorias();
    let indiceCategoria = retornaNumAleatorio(arrayCategorias.length);
    return arrayCategorias[indiceCategoria];
}

function exibeCategoria(){
    categoria.innerHTML = retornaCategoria();
}

function retornaNumAleatorio(max){
    return Math.floor(Math.random() * max);
}

/* Funções de seleção e exibição de palavras */
function definePalavraProposta(){
    const arrayPalavras = categorias[categoria.innerHTML];
    let indicePalavra = retornaNumAleatorio(arrayPalavras.length);
    palavraProposta = arrayPalavras[indicePalavra];
    //console.log(palavraProposta);
    ocultaPalavra();
}

function ocultaPalavra(){
    let palavraOcultada = "";
    for(let i = 0; i < palavraProposta.length; i++){
        palavraOcultada += "-";
    }
    exibePalavraInterface(palavraOcultada);
}

function exibePalavraInterface(palavra){
    palavraInterface.innerHTML = palavra;
}

/*
 Funções de verificação de acerto e impressão de letras erradas 
*/

function tentativa(letra){

    if(palavraProposta.includes(letra)){
        atualizaPalavraInterface(letra);
    }else{
        letrasErradasArray.push(letra);
        letrasErradas.innerHTML = "Letras erradas: " + letrasErradasArray;
        if(partesBoneco.length > indiceBoneco){
            desenhaBoneco();
        }
    }
    verificaFimDeJogo();
}

function atualizaPalavraInterface(letra){
    let palavraAux = "";
    for(let i = 0; i < palavraProposta.length; i++){
        if(palavraProposta[i] === letra){
            palavraAux += letra;
        }else if(palavraInterface.innerHTML[i] != "-"){
            palavraAux += palavraInterface.innerHTML[i];
        }else{
            palavraAux += "-";
        }
    }
    exibePalavraInterface(palavraAux);
}

/* Verificação de fim do jogo */

function verificaFimDeJogo(){
    if(!palavraInterface.innerHTML.includes("-")){
        exibePalavraInterface("Você venceu!!!");
        window.removeEventListener("keypress", retornaLetra);
    }else if(letrasErradasArray.length >= numTentativas){
        desenhaOlhos();
        exibePalavraInterface("Você perdeu!!!")
        window.removeEventListener("keypress", retornaLetra);
    }
}

/*
Recebe o evento do teclado e passa apenas o valor da letra para a função tentativa
*/
function retornaLetra(e){ 
    tentativa(e.key);
}

/*
Desenha a parte do corpo corrente
*/
function desenhaBoneco(){
    partesBoneco[indiceBoneco].classList.remove("hide");
    indiceBoneco++; 
}

/* 
Desenha os olhos do personagem
*/
function desenhaOlhos(){
    olhos.forEach((olho => {
        olho.style.opacity = 1;
        olho.style.zIndex = 10;
    }));
}

/*
Oculta as partes do corpo do personagem
*/
function ocultaBoneco(){
    olhos.forEach((olho => {
        olho.style.opacity = opacidadeOlhos; 
    }));
    partesBoneco.forEach(parteBoneco => {
        parteBoneco.classList.add("hide");
    });
}

/*
Inicia as configurações do jogo
*/
function iniciaJogo(){
    indiceBoneco = 0;
    letrasErradasArray = [];
    ocultaBoneco();
    exibeCategoria();
    definePalavraProposta();
    letrasErradas.innerHTML = "Letras erradas: ";
    window.addEventListener("keypress", retornaLetra);
}

window.addEventListener("load", iniciaJogo);
