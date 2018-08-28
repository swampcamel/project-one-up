//backend (game) logic
var cardRepo = [];

function Game() {
  this.players = []; //array of player objects
  this.activePlayer = 1;
  this.winner = "";
  this.roundCount = 0; //just putting this in for future use
  this.board;
};

function Board() {
  this.p1Deck = []; //each player has a generated and shuffled deck
  this.p1Hand = []; //hands are filled from respective decks
  this.p1Field = []; //a field is the space where cards are played
  this.p1Graveyard = []; //a graveyard is a player's discard pile
  this.p2Deck = [];
  this.p2Hand = [];
  this.p2Field = [];
  this.p2Graveyard = [];
};

function Player(input) {
  this.name = input;
  this.hp = 10;
};

function Card(damage, health, name, ability, text, flavor){

  this.damage = damage;
  this.health = health;
  this.monsterName =  name;
  this.ability = "";
  this.abilityText = "";
  this.flavorText= "flavor";

  cardRepo.push(this);
};

Card.prototype.fillCardRepo = function () {
  cardRepo.push(this);
};

Game.prototype.startGame = function (input1, input2) {
  cardRepo = [];  //inputs 1 and 2 are entered player names
  var player1 = new Player(input1);
  var player2 = new Player(input2);
  this.players.push(player1);
  this.players.push(player2);
  this.board = new Board();

  var sharedAbility = function() {
    forceDraw(newGame, newBoard)
  }
  var tauntAbility;
  var bleedAbility;
  var monster3 = new Card(1, 1, 'Shub-Neggurath', sharedAbility, "When you play this minion, your opponent draws a card.", 'Tentacley Speaking, your baby sucks');
  var monster2 = new Card(1, 1, 'Kassogtha', sharedAbility, "When you play this minion, your opponent draws a card.", 'When eating Humans, start with the eyelids so they have to watch');
  var monster1 = new Card(1, 1, 'Sheograth', sharedAbility, "When you play this minion, your opponent draws a card.", 'Korn was my side project');
  var monster4 = new Card(1, 1, 'Gug', sharedAbility, "When you play this minion, your opponent draws a card.", 'I smell children, I smell liver, humans humans please deliver');
  var monster5 = new Card(2, 2, 'Azaezel', sharedAbility, "When you play this minion, your opponent draws a card.", 'I going to wear you like a slipper');
  var monster6 = new Card(2,2, 'Parus-Hellton', sharedAbility, "When you play this minion, your opponent draws a card.", "That's Hawt!")
  var monster7 = new Card(2,4, 'Jankum-Jenkins', tauntAbility, "Taunting allows monster to block an additonal creature", "What are you doing with that wolf bat?");
  var monster8 = new Card(2,4, 'Sir Hossius', tauntAbility, "Taunting allows monster to block an additonal creature", "No longer the life of the party");
  var monster11 = new Card(3,4, 'Kirraxus', bleedAbility, "creatures attcked by this monster suffer an additional damage next round", "For I am become death");
  var monster10 = new Card(3,4, 'Attraxia', bleedAbility, "creatures attcked by this monster suffer an additional damage next round", "Roar?");
  var monster9 = new Card(3,4, 'Unnamable-Spawn', bleedAbility, "creatures attcked by this monster suffer an additional damage next round", "For the Angel of Death spread his wings on the blast,And breathed in the face of the foe as he passed;And the eyes of the sleepers waxed deadly and chill And their hearts but once heaved, and for ever grew still!");
  var monster13 = new Card(3,4, 'Epthelius', bleedAbility, "Taunting allows monster to block an additonal creature", "And in thy Silence was his Sentence, And in his Soul a vain repentance, ");



  //var impCard = new Card("Imp",  function() {forceDraw(newGame, newBoard)}, "When you play this minion, your opponent draws a card.");

  this.board.buildDeck(cardRepo);
  this.board.shuffleCards(this.board.p1Deck);
  this.board.shuffleCards(this.board.p2Deck);

  this.board.p1Hand = this.board.p1Deck.splice((this.board.p1Deck.length-5), 4);
  this.board.p2Hand = this.board.p2Deck.splice((this.board.p2Deck.length-6), 5);
};

Board.prototype.buildDeck = function (cardRepo) {
  var iterations = 30 / cardRepo.length;

  cardRepo.forEach(function(card) {
    for (var i = 0; i < iterations; i++) {
      this.p1Deck.push(card);
      this.p2Deck.push(card);
    }
  }.bind(this));
};

Board.prototype.shuffleCards = function (deck) {
  var currentIndex = deck.length;
  var temporaryValue;
  var randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = deck[currentIndex];
    deck[currentIndex] = deck[randomIndex];
    deck[randomIndex] = temporaryValue;
  };
  return deck;
};

Board.prototype.drawCards = function (gameObj) {
   if (gameObj.activePlayer === 1) {
     var drawnCard = this.p1Deck.pop();
     this.p1Hand.push(drawnCard);
   }
   else if (gameObj.activePlayer === 2) {
     var drawnCard = this.p2Deck.pop();
     this.p2Hand.push(drawnCard);
   } else {
     alert("drawCards ERROR!");
   }
}; //does this need a .bind?

Board.prototype.playCard = function (gameObj, handIndex, laneIndex) {
  if (gameObj.activePlayer === 1) {
    var playedCard = this.p1Hand.splice(handIndex, 1);
    this.p1Field[laneIndex] = playedCard;
  } else if (gameObj.activePlayer === 2) {
    var playedCard = this.p2Hand.splice(handIndex, 1);
    this.p2Field[laneIndex] = playedCard;
  } else {
    alert("playCard ERROR!");
  }
};

Board.prototype.forceDraw = function (gameObj) {//maybe not a prototype?
  if (gameObj.activePlayer === 2) {
    var drawnCard = gameObj.board.p1Deck.pop();
    boardObj.p1Hand.push(drawnCard);
  }
  else if (gameObj.board.activePlayer === 1) {
    var drawnCard = gameObj.board.p2Deck.pop();
    boardObj.p2Hand.push(drawnCard);
  } else {
    alert("forceDraw ERROR!");
  }
};

Board.prototype.monsterFight = function (boardObj, index1, index2) { //indices 1 and 2 are array locations from the player fields
  var array1 = boardObj.p1Field;
  var array2 = boardObj.p2Field;
  var attacker = boardObj.p1Field[index];
  var defender = boardObj.p2Field[index];
  attacker.health = attacker.health - defender.damage;
  defender.health = defender.health - attacker.damage;
  if (attacker.health <= 0) {
    var p1Dead = array1[index];
    array1[index] = undefined;
    boardObj.p1Graveyard.push(p1Dead);
  }
  if (defender.health <= 0) {
    var p2Dead = array2[index];
    array2[index] = undefined;
    boardObj.p2Graveyard.push(p2Dead);
  }
};

var monsterTracker = 2; //this is for proto display reasons and starting with 2 inputted monsters
//begin user interface
$(document).ready(function(){
  $("img").click(function(){
    $(this).toggleClass('inactive');
  });
  $("#new-game").click(function() {
      var newGame = new Game();
      newGame.startGame();
      console.log(newGame.board);

      newGame.board.p1Hand.forEach(function(card) {
        console.log("Hi");
        $('#player-1-hand').prepend('<img class=\"hand-cards\" src=\"img/card-frame_180w.png\">');
      });
      newGame.board.p2Hand.forEach(function(card) {
        console.log("Hi");
        $('#player-2-hand').prepend('<img class=\"hand-cards\" src=\"img/card-frame_180w.png\">');
      });

  });
});
