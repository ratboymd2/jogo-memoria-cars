const images = [
    './assets/images/img1.jpg',
    './assets/images/img2.jpg',
    './assets/images/img3.jpg',
    './assets/images/img4.jpg', 
    './assets/images/img1.jpg',
    './assets/images/img2.jpg',
    './assets/images/img3.jpg',
    './assets/images/img4.jpg' 
];

let cards = [...images, ...images]; // 13 pares = 26 cartas
let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    matchedCards = [];
    flippedCards = [];
    shuffle(cards).forEach((imgSrc, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = imgSrc;
        card.dataset.index = index;

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = 'Imagem da carta';

        card.appendChild(img);
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length === 2) return;
    if (this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.image === card2.dataset.image) {
        matchedCards.push(card1, card2);
        flippedCards = [];
        if (matchedCards.length === cards.length) {
            setTimeout(() => alert('🎉 Você venceu!'), 300);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

document.getElementById('restart').addEventListener('click', createBoard);

createBoard();
