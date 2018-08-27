//backend (game) logic

var cardRepo = [];

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
}

Game.prototype.startGame(input1, input2) { //inputs 1 and 2 are entered player names
  var player1 = new Player(input1);
  var player2 = new Player(input2);
  var newBoard = new Board();
};

Game.prototype.fillCardRepo = function () {

};

Game.prototype.buildDeck = function (array, boardObj) {

};

Board.prototype.shuffleCards = function () {

};

Board.prototype.drawCards = function () {

};

Board.prototype.playCard = function () {

};

Board.prototype.millCards = function () {

};

Board.prototype.monsterFight(boardObj, index1, index2) { //indices 1 and 2 are array locations from the player fields
  var array1 = boardObj.p1Field;
  var array2 = boardObj.p2Field;
  var attacker = boardObj.p1Field[index1];
  var defender = boardObj.p2Field[index2];
  if (attacker.health <= 0) {
    var p1Dead = array1.splice(index1, 1);
    boardObj.p1Graveyard.shift(p1Dead);
  }
  if (defender.health <= 0) {
    var p2Dead = array2.splice(index2, 1);
    boardObj.p2p2Graveyard.shift(p2Dead);
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

// illustration alert begins
    alert("my name is " +attkName+ " my information was gathered from my html. " +attkDamage+ " is the damage i inflict, while i can inflict " +attkHealth+ "  we can quickly create these with a prototype ");
//illustration alert ended
// $('#makeMonster').show();
  });

});
