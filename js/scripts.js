//backend (game) logic
var cardRepo = []; //STATIC GLOBAL this is where all existing cards live

function Game() {
  this.players = []; //array of player objects
  this.activePlayer = 1;
  this.winner = "";
  this.roundCount = 0; //just putting this in for future use
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
  this.playerNumber = NaN;
  this.name = input;
  this.hp = 10;
};

function Card(damage, health, name) {
this.damage = damage;
this.health = health;
this.name = name;
this.ability = "";
this.abilityText = "";
}

Card.prototype.fillCardRepo = function () {
  cardRepo.push(this);
};

Game.prototype.startGame= function (input1, input2) { //inputs 1 and 2 are entered player names
  var player1 = new Player(input1);
  var player2 = new Player(input2);
  var newBoard = new Board();
};


Game.prototype.buildDeck = function (array, boardObj) {

};

Board.prototype.shuffleCards = function () {

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

Card.prototype.forceDraw = function (gameObj, boardObj) {//maybe not a prototype?
  if (gameObj.activePlayer === 2) {
    var drawnCard = boardObj.p1Deck.pop();
    boardObj.p1Hand.push(drawnCard);
  }
  else if (gameObj.activePlayer === 1) {
    var drawnCard = boardObj.p2Deck.pop();
    boardObj.p2Hand.push(drawnCard);
  } else {
    alert("forceDraw ERROR!");
  }
};

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

Board.prototype.millCards = function () {

};


Board.prototype.monsterFight = function (boardObj, index) { //index is locations from the player lanes
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
    var attkDamage = $(this).attr('damage');
    var attkHealth = $(this).attr('health');
    var attkName = $(this).attr('monsterName');
    var newMonster = new Card(attkDamage, attkHealth, attkName);
    console.log(newMonster);
    newMonster.fillCardRepo();
// illustration alert begins
    alert("my name is " +attkName+ " my information was gathered from my html. " +attkDamage+ " is the damage i inflict, while i can inflict " +attkHealth+ "  we can quickly create these with a prototype ");
//illustration alert ended
// $('#makeMonster').show();
  });

});
