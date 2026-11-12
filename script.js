// Pega os elementos do HTML que vamos usar
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreText = document.querySelector('#score');
const restartText = document.querySelector('.restart');

// Começa com 0 pontos
let score = 0;

// Guarda se o jogo já acabou (false = ainda jogando)
let gameOver = false;

// Faz o Mario pular
function jump() {
    // Adiciona a classe "jump" (a animação está no CSS)
    mario.classList.add('jump');

    // Depois de 500ms (duração do pulo), tira a classe para poder pular de novo
    setTimeout(function () {
        mario.classList.remove('jump');
    }, 500);
}

// Roda a cada 10ms: verifica se o Mario bateu no cano
const gameLoop = setInterval(function () {

    // Posição do cano (distância da esquerda) e altura do Mario (distância do chão)
    const pipePosition = pipe.offsetLeft;
    const marioHeight = parseInt(getComputedStyle(mario).bottom);

    // Bateu? O cano está na frente do Mario E o Mario está baixo (não pulou)
    const bateu = pipePosition <= 120 && pipePosition > 0 && marioHeight < 80;

    if (bateu) {
        // Para o cano onde ele está
        pipe.style.animation = 'none';
        pipe.style.left = pipePosition + 'px';

        // Para o Mario onde ele está
        mario.style.animation = 'none';
        mario.style.bottom = marioHeight + 'px';

        // Troca a imagem do Mario para a de "game over"
        mario.src = './imagens/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        // Para o jogo e a contagem de pontos
        clearInterval(gameLoop);
        clearInterval(scoreLoop);

        // Marca que o jogo acabou e mostra a mensagem para recomeçar
        gameOver = true;
        restartText.style.display = 'block';
    }
}, 10);

// Roda a cada 100ms: soma 1 ponto enquanto o jogo está rodando
const scoreLoop = setInterval(function () {
    score = score + 1;
    scoreText.textContent = score;
}, 100);

// Quando uma tecla é pressionada
function pressionouTecla(evento) {
    if (gameOver) {
        // Jogo acabou: a barra de espaço recarrega a página e começa de novo
        if (evento.code === 'Space') {
            location.reload();
        }
    } else {
        // Jogo rodando: qualquer tecla faz o Mario pular
        jump();
    }
}

document.addEventListener('keydown', pressionouTecla);

