function Game() {
  this.players = []; //array of player objects
  this.activePlayer = 1;
  this.winner = "";
  this.roundCount = 0; //just putting this in for future use
};

function Board() {
  this.p1Field = []; //a field is the space where cards are played
  this.p2Field = [];
};

function Player(input) {
  this.name = input;
  this.hand = [];
  this.deck = [];
  this.graveyard = [];
  this.hp = 10;
};

function Card() {
  this.power = 1;
  this.health = 1;
  this.name = "";
}

Game.prototype.startGame(input1, input2) { //inputs 1 and 2 are entered player names
  var player1 = new Player(input1);
  var player2 = new Player(input2);
  var newBoard = new Board();
};

// Board.prototype.monsterFight(cardObj1, cardObj2, board) {
//   cardObj1.health = cardObj1.health - cardObj2.power;
//   cardObj2.health = cardObj2.health - cardObj1.power;
//   if (cardObj1.health <= 0) {
//     move cardObj1 graveyard;
//   }
//   if (cardObj2.health <= 0) {
//     move cardObj1 geraveyard;
//   }
// };
