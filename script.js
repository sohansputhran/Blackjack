// Simple Blackjack Application
// By Sohan S P

function createDeck(){
  let deck = [];
  for(let suitIndex = 0; suitIndex < suits.length; suitIndex++){
    for(let valueIndex = 0; valueIndex < values.length; valueIndex++){
      let card = {
        suit: suits[suitIndex],
        value: values[valueIndex]
      };
      deck.push(card);
    }
  }
  return deck;
}

function shuffleDeck(){
  for(let deckIndex = 0; deckIndex < deck.length; deckIndex++){
    let swapIndex = Math.trunc(Math.random() * deck.length);
    let tempCard = deck[swapIndex];
    deck[swapIndex] = deck[deckIndex];
    deck[deckIndex] = tempCard;
  }
}

function getNextCard(){
  return deck.shift();
}

function getCardString( card ){
  return card.value + ' of ' + card.suit
}

function getCardNumericalValue(card){
  switch (card.value) {
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10;
  }
}

function getScore(cards){
  let score = 0;
  let hasAce = false;
  for(let index = 0; index < cards.length; index++){
    score += getCardNumericalValue(cards[index]);
    if(cards[index].value === 'Ace'){
      hasAce = true;
    }
  }
  if(hasAce && score + 10 <=21){
    return score + 10;
  }
  return score;
}

function updateScores(){
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function showStatus(){
  if(!gameStarted){
    textArea.innerText = 'Welcome to Blackjack';
    return;
  }

  let dealerCardString = '';
  for(let index = 0; index < dealerCards.length; index++){
    dealerCardString += getCardString(dealerCards[index]) + '\n';
  }

  let playerCardString = '';
  for(let index = 0; index < playerCards.length; index++){
    playerCardString += getCardString(playerCards[index]) + '\n';
  }

  updateScores();

  textArea.innerText =
    'Dealer has:\n' +
    dealerCardString +
    '(score: ' + dealerScore + ')\n\n' +

    'Player has:\n' +
    playerCardString +
    '(score ' + playerScore + ')\n\n';

    if(gameOver){
      if(playerWon){
        textArea.innerText += 'You Win';
      }
      else{
        textArea.innerText += 'Dealer Wins';
      }
      newGameButton.style.display = 'inline';
      hitButton.style.display = 'none';
      stayButton.style.display = 'none';
    }
}

function checkForEndOfGame(){
  updateScores();

  if(gameOver){
    while(dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21) {
      dealerCards.push(getNextCard());
      updateScores();
    }
  }

  if(playerScore > 21){
    playerWon = false;
    gameOver = true;
  }
  else if(dealerScore > 21){
    playerWon = true;
    gameOver = true;
  }
  else if(gameOver){
    if(playerScore > dealerScore){
      playerWon = true;
    }
    else if(playerScore < dealerScore){
      playerWon = false;
    }
  }
}

let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = [
  'Ace', 'King', 'Queen', 'Jack',
  'Ten', 'Nine', 'Eight', 'Seven', 'Six',
  'Five', 'Four', 'Three', 'Two'
];

// DOM Variables
let textArea = document.getElementById('text-area');
let newGameButton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');

// Game Variables
let gameStarted = false;
let gameOver = false;
let playerWon = false;
dealerCards = [];
playerCards = [];
dealerScore = 0;
playerScore = 0;
deck = [];

hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();

newGameButton.addEventListener('click', function(){
  gameStarted = true;
  gameOver = false;
  playerWon = false;

  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [ getNextCard(), getNextCard()];
  playerCards = [ getNextCard(), getNextCard()];

  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  showStatus();
});

hitButton.addEventListener('click', function(){
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
})

stayButton.addEventListener('click', function(){
  gameOver = true;
  checkForEndOfGame();
  showStatus();
})
