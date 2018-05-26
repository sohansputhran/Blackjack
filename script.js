// Simple Blackjack Application
// By Sohan S P

let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = [
  'Ace', 'King', 'Queen', 'Jack',
  'Ten', 'Nine', 'Eight', 'Seven', 'Six',
  'Five', 'Four', 'Three', 'Two'
];

let deck = [
];

let playerCards = [ deck[0], deck[2] ];

for(let suitIndex = 0; suitIndex < suits.length; suitIndex++){
  for(let valueIndex = 0; valueIndex < values.length; valueIndex++){
    deck.push(values[valueIndex] + ' of ' + suits[suitIndex]);
  }
}

console.log("Deck Length: ", deck.length);
for(let i = 0; i < deck.length; i++){
  console.log(deck[i]);
}
