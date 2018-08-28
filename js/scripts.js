//backend (game) logic
var cardRepo = [];
var p1Deck;
var p2Deck;

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
  this.name = input;
  this.hp = 10;
};
function Card(damage, health, name){
  this.damage = damage;
  this.health = health;
  this.monsterName =  name;
  this.ability = "";
  this.abilityText = "";
};
Card.prototype.fillCardRepo = function () {
  cardRepo.push(this);
};
Game.prototype.startGame= function (input1, input2) { //inputs 1 and 2 are entered player names
  var player1 = new Player(input1);
  var player2 = new Player(input2);
  var newBoard = new Board();
};
buildDeck = function (cardRepo) {
  var Deck = cardRepo.slice();
  return Deck;
};

shuffleCards = function (playersDeck) {
  var currentIndex = playersDeck.length;
  var temporaryValue;
  var randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = playersDeck[currentIndex];
    playersDeck[currentIndex] = playersDeck[randomIndex];
    playersDeck[randomIndex] = temporaryValue;
  };
  return playersDeck;
};
Board.prototype.drawCards = function () {
};
Board.prototype.playCard = function () {
};
Board.prototype.millCards = function () {
};
Board.prototype.monsterFight= function (boardObj, index1, index2) { //indices 1 and 2 are array locations from the player fields
  var array1 = boardObj.p1Field;
  var array2 = boardObj.p2Field;
  var attacker = boardObj.p1Field[index1];
  var defender = boardObj.p2Field[index2];
  if (attacker.health <= 0) {
    var p1Dead = array1.splice(index1, 1);
    boardObj.p1Graveyard.shift(p1Dead);
  };
  if (defender.health <= 0) {
    var p2Dead = array2.splice(index2, 1);
    boardObj.p2p2Graveyard.shift(p2Dead);
  };
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
    newMonster.fillCardRepo();
  });
  $("#new-game").click(function() {
    //remove this below part when we have real cards
    for (var i=0 ; i<=30 ; i++) {
      var someNumber = i;
      var somecard = new Card(1, 1, someNumber);
      somecard.fillCardRepo();
    }
    var p1Deck = buildDeck(cardRepo);
    var p2Deck = buildDeck(cardRepo);
    console.log(p1Deck);
    console.log("below is a shuffled deck");
    console.log(shuffleCards(cardRepo));
  });
});
