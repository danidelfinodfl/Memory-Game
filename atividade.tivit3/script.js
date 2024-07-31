const celulas = document.querySelectorAll('.cartas');
 //estou pegando os elementos(cartas) e armazenando dentro da váriavel,criando uma espécie de array
const cores = ["red", "green", "blue", "grey", "orange", "purple", "red", "green", "blue", "grey", "orange", "purple"];
//as cores estão duplicadas pois para cada par de carta eu quero atribuir uma cor
let primeiraCarta = null;
let segundaCarta = null;
//variáveis para armazenar depois o valor das cartas clicadas, primeira e segunda respectivamente
let bloqueado = false;
/*essa variavel booleana é reponsável por controlar se o jogo deve permitir que o jogador clique em mais de
duas cartas quando estiver jogando, realizando uma validação. */

let jogadorAtual = 1; //o jogo se inicia com o jogador 1
//essa variável será usada par indicar com quem está a vez (1 ou 2)
let pontosJogador1 = 0;
let pontosJogador2 = 0;
//os pontos se iniciam zerados
//essas duas variáveis são responsáveis por armazenar a pontuação de cada jogador
let paresRestantes = cores.length / 2;
/** aqui estou armazenando os pares que faltam para serem encontrados. O tamanho do array nesse caso é 12, logo
 * o jogo se inicia com 6 pares. Portanto, a medida que os pares forem encontrados, o número de pares restantes 
 * vai reduzindo, ou seja, o valor da varíavel 'paresRestantes' vai diminuindo.
 */

function atualizarMensagemVez() { //essa função é responsável por atualizar de quem é a vez de jogar
    const vezElemento = document.getElementById('vez-jogador'); //pegando elemento pelo id e armazenando na variável
    vezElemento.textContent = `Vez do Jogador ${jogadorAtual}`;// chamo o método .textContent para mudar o texto
     /**aqui estou usando o `${i}` (interpolação)pois estou criando uma string (tipo diferente de string) que vai 
    me permitir acessar um valor e colocá-lo dentro da string, mesmo que esse valor mude; a interpolação se usa em 
    casos onde eu não sei ainda qual o valor daquele elemento,por exemplo, ou quando esse valor muda, como é o caso nessa 
    função*/
}

function clicarNaCarta() {  /**essa função define oque vai acontecer quando eu clicar em uma carta, trazendo interatividade com o 
    usuário, sem essa função se as cartas forem clicadas não vai acontecer nada*/
    if (bloqueado || this === primeiraCarta) return;
     /**aqui estou dizendo que se bloqueado for =true OU o jogador clicar no mesmo elemento que ele clicou primeiro
    (se ele clicar de novo na primeira carta) o código pare de ser executado*/

    const id = this.id; //pega o id do elemento clicado(carta) e armazena na variável
    this.style.backgroundColor = cores[id]; //define a cor de fundo da carta baseado no id dela quando clicamos
    //this "esse elemento"

    if (!primeiraCarta) { //se a primeira carta ainda ñ tiver valor definido
        primeiraCarta = this; //defino o valor da primeira carta como a carta que eu cliquei primeiro
    } else {
        segundaCarta = this;/**se o valor da primeira carta já estiver definido, a atual carta clicada vai ser a
        segunda carta */
        verificarCarta(); //depois chamo a função verificarCarta para comparar se as duas cartas são iguais ou ñ
    }
}

function verificarCarta() {
    bloqueado = true; /**defino bloqueado como "true" para que o jogador não clique em outra corta enquanto estiver
    ocorrendo a comparação*/
    const cor1 = primeiraCarta.style.backgroundColor;
    const cor2 = segundaCarta.style.backgroundColor;
     //obtendo a cor de fundo das duas cartas depois de clicadas
    if (cor1 === cor2) {//se as cores das cartas forem iguais, execute o código
        if (jogadorAtual === 1) {
            pontosJogador1++;
            document.getElementById('pontos-jogador-1').textContent = pontosJogador1;
        } else {
            pontosJogador2++;
            document.getElementById('pontos-jogador-2').textContent = pontosJogador2;
        } /** aqui estou adicionando pontos ao placar do jogador do momento*/
        paresRestantes--; //diminuo o número de pares restantes pq um par foi encontrado
        verificarVitoria(); //verifico se o jogo acabou, ou seja, se todos os pares foram encontrados
        resetarCartas(); //chamo a função resetar cartas
    } else {
        //se as cartas não forem iguais
        setTimeout(() => { //definindo um temporizador para a comparação de 1 segundo
            primeiraCarta.style.backgroundColor = 'darkred';
            segundaCarta.style.backgroundColor = 'darkred';
             //definindo as cores das cartas com a cor inicial para elas 'virarem' depois da comparação
            resetarCartas();
            if (jogadorAtual === 1) {
                jogadorAtual = 2;
            } else {
                jogadorAtual = 1;
            } /**aqui estou alternando a vez dos jogadores. Se o jogador atual errar, será a vez do outro */
            atualizarMensagemVez(); //atualiza a mensagem de vez do jogador
        }, 1000);
    }/**essa função também tem o intuito de trazer interatividade, pois com o temporizador o jogador consegue
     visualizar as duas cartas antes delas virarem caso elas não sejam iguais*/
}

function resetarCartas() { /**reseto o estado do jogo (valores) para que seja possível continuar e iniciar uma outra
    comparação, ou seja, estou dizendo pro código limpar as referências que eu fiz com as cartas que eu cliquei para
    que eu possa clicar em outro par de cartas e fazer uma nova comparação */
    primeiraCarta = null;
    segundaCarta = null;
    bloqueado = false;
}

function verificarVitoria() {
    if (paresRestantes === 0) { //se todos os pares forem encontrados, o jogo acabou
        const msgElemento = document.querySelector('.msg'); /**selecionando o elemento html no qual a mensagem vai ser
        exibida e armazenando na variável*/
        if (pontosJogador1 > pontosJogador2) { //se os pontos do jogador 1 forem maiores que o do jogador 2
            msgElemento.textContent = `PARABÉNS JOGADOR 1! VOCÊ VENCEU`; //jogador 1 venceu
        } else if (pontosJogador2 > pontosJogador1) { //se for o contrário
            msgElemento.textContent = `PARABÉNS JOGADOR 2! VOCÊ VENCEU`; //jogador 2 venceu
        } else {
            msgElemento.textContent = `VOCÊS EMPATARAM!`; //se os dois fizerem a mesma quantidade de pontos, empatou
        }
        msgElemento.style.display = 'block'; /**aqui estou selecionando a minha mensagem e dizendo através do display(css)
         que quero que ela fique visível na tela*/
        document.querySelector('.botão').textContent = 'REINICIAR JOGO'; /**aqui estou mudando o texto do botão quando o 
        jogo acabar, indicando que ele deve ser reiniciado */
        celulas.forEach(carta => carta.removeEventListener('click', clicarNaCarta)); 
        /**removo evento de clique pq quando todos os pares forem encontrados, não tem necessidade de nenhuma carta 
         * ser clicada*/
    }
}

function virarCartas() { 
    celulas.forEach(carta => { //para cada carta (forEach): iterando sobre cada elemento 
        carta.style.backgroundColor = 'darkred';  //define a cor de fundo como darkred
        carta.addEventListener('click', clicarNaCarta); //evento de clique
    }); //Quando essa função for chamada, ela será reponsável por "virar" as cartas para a cor inicial
}

function embaralhar() {
    cores.sort(() => Math.random() - 0.5);
    /*math.random me retorna um numero aleatório entre 0 e 1. Se eu adicionar o -0.5 sorteamos uma faixa de
    numeros positivos e negativos entre -0.5 e 0.5; Utilizando o método 'sort', ele reorganiza os elementos 
    do array com base nesses valores, resultando em uma nova ordem aleatória dos elementos da minha lista*/
    virarCartas();
    //depois de embaralhar, adiciona o evento de virar as cartas para que elas retornem da cor inicial
    paresRestantes = cores.length / 2; //reiniciando o número de pares pois o jogo vai começar de novo
    pontosJogador1 = 0;
    pontosJogador2 = 0;
    //reiniciando também o número de pontos
    document.getElementById('pontos-jogador-1').textContent = pontosJogador1;
    document.getElementById('pontos-jogador-2').textContent = pontosJogador2;
    //atualizando no placar
    jogadorAtual = 1; //o jogo inicia novamente com o jogador 1
    atualizarMensagemVez(); //atualizando mensagem de qual jogador deve começar (nesse caso o jogador 1)
    document.querySelector('.msg').style.display = 'none'; //tiro a mensagem de vitória 
    document.querySelector('.botão').textContent = 'COMEÇAR JOGO'; //voltando o texto do botão
}
