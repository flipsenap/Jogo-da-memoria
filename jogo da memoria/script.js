const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
    if (lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip'); 
    if (!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }else {
        secondCard = this;
        hasFlippedCard = false;
        checkForMath();
    }
}

function checkForMath() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventlistenner('click', flipCard);
    secondCard.removeEventlistenner('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    },1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();

cards.forEach((cards) => {cards.addEventListener('click', flipCard)})