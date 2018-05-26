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

function getNextCard(){
  return deck.shift();
}

function getCardString( card ){
  return card.value + ' of ' + card.suit
}

let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = [
  'Ace', 'King', 'Queen', 'Jack',
  'Ten', 'Nine', 'Eight', 'Seven', 'Six',
  'Five', 'Four', 'Three', 'Two'
];

let deck = createDeck();

let playerCards = [getNextCard(), getNextCard()];

let textArea = document.getElementById('text-area');
let newGameButton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');

hitButton.style.display = 'none';
stayButton.style.display = 'none';

newGameButton.addEventListener('click', function(){
  textArea.innerText = 'Here we go. All the Best.';
  newGameButton.style.display = 'none';
  hitButton.style.display = 'block';
  stayButton.style.display = 'block';
});
