//backend (game) logic
var cardRepo = [];
var newGame;
var bgMusic = new Audio("audio/bgmusic.mp3");

function Game() {
  this.players = []; //array of player objects
  this.activePlayer = 1;
  this.winner = "";
  this.turnCount = 1; //just putting this in for future use
  this.board;
};

function Board() {
  this.p1Deck = []; //each player has a generated and shuffled deck
  this.p1Hand = []; //hands are filled from respective decks
  this.p1Field = [undefined, undefined, undefined, undefined, undefined]; //a field is the space where cards are played
  this.p1Graveyard = []; //a graveyard is a player's discard pile
  this.p2Deck = [];
  this.p2Hand = [];
  this.p2Field = [undefined, undefined, undefined, undefined, undefined];
  this.p2Graveyard = [];
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

Game.prototype.startGame = function (input1, input2) {
  cardRepo = [];  //inputs 1 and 2 are entered player names
  var player1 = new Player(input1);
  var player2 = new Player(input2);
  this.players.push(player1);
  this.players.push(player2);
  this.board = new Board();

  var bleedAbility = function() {

  };

  var sharedAbility = function() {
    forceDraw(newGame)
  }

  var tauntAbility;
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
  // var monster9 = new Card(3,4, 'Unnamable-Spawn', bleedAbility, "creatures attcked by this monster suffer an additional damage next round", "For the Angel of Death spread his wings on the blast,And breathed in the face of the foe as he passed;And the eyes of the sleepers waxed deadly and chill And their hearts but once heaved, and for ever grew still!");
  // var monster13 = new Card(3,4, 'Epthelius', bleedAbility, "Taunting allows monster to block an additonal creature", "And in thy Silence was his Sentence, And in his Soul a vain repentance, ");
  //var impCard = new Card("Imp",  function() {forceDraw(newGame, newBoard)}, "When you play this minion, your opponent draws a card.");

  this.board.buildDeck(cardRepo);
  this.board.shuffleCards(this.board.p1Deck);
  this.board.shuffleCards(this.board.p2Deck);

  this.board.p1Hand = this.board.p1Deck.splice((this.board.p1Deck.length-5), 4);
  this.board.p2Hand = this.board.p2Deck.splice((this.board.p2Deck.length-6), 5);
};

Game.prototype.drawCards = function () {
  loseCondition();

  if (this.activePlayer === 1) {
    if (this.board.p1Hand.length < 8) {
      var drawnCard = this.board.p1Deck.pop();
      this.board.p1Hand.push(drawnCard);
    } else {
      var drawnCard = this.board.p1Deck.pop();
      this.board.p1Graveyard.push(drawnCard);
    }
  } else if (this.activePlayer === 2) {
    if (this.board.p2Hand.length < 8) {
      var drawnCard = this.board.p2Deck.pop();
      this.board.p2Hand.push(drawnCard);
    } else {
      var drawnCard = this.board.p2Deck.pop();
      this.board.p2Graveyard.push(drawnCard);
    }
  } else {
    alert("drawCard ERROR!");
  }
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

Board.prototype.monsterFight = function (boardObj, index1, index2) { //indices 1 and 2 are array locations from the player fields
  var array1 = boardObj.p1Field;
  var array2 = boardObj.p2Field;
  var attacker = boardObj.p1Field[index];
  var defender = boardObj.p2Field[index];
  attacker.health = attacker.health - defender.damage;
  defender.health = defender.health - attacker.damage;
  if (attacker.health <= 0) {
    var p1Dead = Board.p1Field[index];
    Board.p1Field[index] = undefined;
    boardObj.p1Graveyard.push(p1Dead);
  }
  if (defender.health <= 0) {
    var p2Dead = Board.p2Field[index];
    Board.p2Field[index] = undefined;
    boardObj.p2Graveyard.push(p2Dead);
  }
};

Player.prototype.damage = function(attackingCard) {
  this.hp -= attackingCard.damage;
  loseCondition();
  return this.hp;
}

Card.prototype.fillCardRepo = function () {
  cardRepo.push(this);
};

function loseCondition() {
  if (newGame.players[0].hp <= 0 || newGame.board.p1Deck.length <= 0 ) {
    // alert(newGame.players[0].name + " is dead");
    alert("Player 1 is dead.");
  } else if (newGame.players[1].hp <= 0 || newGame.board.p2Deck.length <= 0 ) {
    // alert(newGame.players[1].name + " is dead");
    alert("Player 2 is dead.");
  }
  return false;
}

function Player(input) {
  this.name = input;
  this.hp = 10;
};

function forceDraw (gameObj) {
  loseCondition();
  if (gameObj.activePlayer === 2) {
    if (gameObj.board.p1Hand.length < 8) {
      var drawnCard = gameObj.board.p1Deck.pop();
      gameObj.board.p1Hand.push(drawnCard);
    }
    else {
      var drawnCard = gameObj.board.p1Deck.pop();

      gameObj.board.p1Graveyard.push(drawnCard);
    }
  }
  else if (gameObj.activePlayer === 1) {
    if (gameObj.board.p2Hand.length < 8) {
      var drawnCard = gameObj.board.p2Deck.pop();
      gameObj.board.p2Hand.push(drawnCard);
    }
    else {
      var drawnCard = gameObj.board.p2Deck.pop();
      gameObj.board.p2Graveyard.push(drawnCard);
    }
  }
  else {
    alert("forceDraw ERROR!");
  }

};

function endTurn(gameObj) {
  // switch clickability
  if (gameObj.activePlayer === 1) {
    gameObj.activePlayer = 2;
  } else if (gameObj.activePlayer === 2) {
    gameObj.activePlayer = 1;
  } else {
    alert("endTurn player switch ERROR!");
  }
  // begin new active player turn
  // active player draws card
  gameObj.drawCards();
  gameObj.turnCount += 1;
  loseCondition();
}


//begin user interface
//front end functions
function showHandCards(gameObj) {

  var index1 = 0;
  var index2 = 0;
  $('#player-1-hand').empty();
  $('#player-2-hand').empty();
  gameObj.board.p1Hand.forEach(function(card) {
    $('#player-1-hand').append('<div id=\"p1' + index1 +'\" class=\"hand-cards\"><img src=\"img/card-frame_180-res-alt.png\"></div>');
    index1++;
  });
  gameObj.board.p2Hand.forEach(function(card) {
    $('#player-2-hand').append('<div id=\"p2' + index1 +'\" class=\"hand-cards\"><img src=\"img/card-frame_180-res-alt.png\"></div>');
    index2++;
  });
};

function changeBoard(brdIndex) {
  var coordGrabber = brdIndex.split("");
  coordGrabber = coordGrabber[2];
  var card1 = newGame.board.p1Field[coordGrabber]
  var card2 = newGame.board.p2Field[coordGrabber]
  newGame.board.p1Graveyard.push(card1);
  newGame.board.p2Graveyard.push(card2);
  newGame.board.p1Field[coordGrabber] = undefined;
  newGame.board.p2Field[coordGrabber] = undefined;
}

$(document).ready(function(){

  $("#audio-toggle").click(function() {
    $("#audio-toggle").toggleClass('music-on');
    // setTimeout(function() {
      if($("#audio-toggle").hasClass('music-on')) {
        bgMusic.play();
      } else {
        $("#audio-toggle").removeClass('music-on');
        bgMusic.pause();
      }
    // }, 50);
  });

  $("#new-game").click(function() {
      newGame = new Game();
      newGame.startGame();
      showHandCards(newGame);
      $('.p2field').each(function () {
        $(this).addClass('unclickable');
      });
      $('#player-2-hand').addClass('unclickable');
      $("#player-2-info .end-turn").addClass('hidden');
      $("#player-1-info").addClass("highlight");
      $('#new-game').hide();
  });

  $(".end-turn").click(function(){
    endTurn(newGame);
    if (newGame.activePlayer === 1) {
      $('.p2field').each(function () {
        $(this).addClass('unclickable');
      });
      $('#player-2-hand').addClass('unclickable');
      $("#player-2-info .end-turn").addClass('hidden');
      $("#player-1-info").addClass("highlight");
      $('.p1field').each(function () {
        $(this).removeClass('unclickable');
      });
      $('#player-1-hand').removeClass('unclickable');
      $("#player-1-info .end-turn").removeClass('hidden');
      $("#player-2-info").removeClass("highlight");
      $('#player-1-hand').empty();
      showHandCards(newGame);

    } else if (newGame.activePlayer === 2) {
      $('.p1field').each(function () {
        $(this).addClass('unclickable');
      });
      $('#player-1-hand').addClass('unclickable');
      $("#player-1-info .end-turn").addClass('hidden');
      $("#player-2-info").addClass("highlight");
      $('.p2field').each(function () {
        $(this).removeClass('unclickable');
      });
      $('#player-2-hand').removeClass('unclickable');
      $("#player-2-info .end-turn").removeClass('hidden');
      $("#player-1-info").removeClass("highlight");
      $('#player-2-hand').empty();
      showHandCards(newGame);
    } else {
      alert("end turn interface error");
    }
  });
});


$(document).on('click', '.hand-cards', function() {
  if ($(this).hasClass("active-card")) {
    $(this).removeClass("active-card")
  } else {
    $(".hand-cards").each(function() {
      $(".hand-cards").removeClass("active-card");
    });
    $(this).addClass("active-card");
  }
});

$(document).on('click', '.board-lanes', function() {
  if ((newGame.activePlayer == 1)
   && ($(this).hasClass("p2field"))
    && ($(this).find("div").hasClass("field-cards"))
     && ($(".p1field").hasClass("active-field"))) {
     var boardIndex = $(this).attr("id");
     changeBoard(boardIndex);
      $(this).empty();
      $(".active-field").find(".field-cards").remove();
      $(".active-field").removeClass("active-field");
  } else if ((newGame.activePlayer == 2)
     && ($(this).hasClass("p1field"))
      && ($(this).find("div").hasClass("field-cards"))
       && ($(".p2field").hasClass("active-field"))) {
         var boardIndex = $(this).attr("id");
         changeBoard(boardIndex);
         $(this).empty();
         $(".active-field").find(".field-cards").remove();
         $(".active-field").removeClass("active-field");
  } else if ($(".board-lanes").hasClass("active-field")) {
    $(".board-lanes").each(function() {
      $(".board-lanes").removeClass("active-field");
    });
  }
// active hand circumstance
  if (($(".hand-cards").hasClass("active-card"))) {
    $(".active-card").appendTo(this);
    var handIndexofCard = $(".active-card").attr("id");
    var boardIndex = $(this).attr("id");
    boardIndex = boardIndex.split("");
    boardIndex = boardIndex[2];
    handIndexofCard = handIndexofCard.split("");
    handIndexofCard = handIndexofCard[2];
    $(".active-card").addClass("field-cards");
    $(".active-card").removeClass("active-card hand-cards");
    forceDraw(newGame);
    showHandCards(newGame);
    $(this).addClass("unclickable");

    if (newGame.activePlayer == 1) {
      var activeCard = newGame.board.p1Hand.splice(handIndexofCard, 1);
      var activeCard = activeCard[0];
      var index1 = 0;
      $('#player-1-hand').empty();

      newGame.board.p1Hand.forEach(function(card) {
        $('#player-1-hand').append('<div id=\"p1' + index1 +'\" class=\"hand-cards\"><img src=\"img/card-frame_180-res-alt.png\"></div>');
        index1++;
      });
      newGame.board.p1Field[boardIndex] = activeCard;

    } else if (newGame.activePlayer == 2) {
      var activeCard = newGame.board.p2Hand.splice(handIndexofCard, 1);
      var activeCard = activeCard[0];
      var index2 = 0;
      $('#player-2-hand').empty();
      newGame.board.p2Hand.forEach(function(card) {
        $('#player-2-hand').append('<div id=\"p2' + index2 +'\"  class=\"hand-cards\"><img src=\"img/card-frame_180-res-alt.png\"></div>'); //previously "p1' + index
        index2++; //previously index1
      });

      newGame.board.p2Field[boardIndex] = activeCard;

    } else {
      console.log("else");
    }

// field circumstances
  // If you click on a field card that is already highlighted
  } else if ($(this).hasClass("active-field")) {
    $(this).removeClass("active-field");

    if (newGame.activePlayer == 1) {
      $(".p2field").each(function() {
        $(".p2field").addClass("unclickable");
      });

  } else if (newGame.activePlayer == 2) {
      $(".p1field").each(function() {
        $(".p1field").addClass("unclickable");
      });
    }
  }
  //If you click on a field card that is not highlighted
  else if ($(this).find("div").hasClass("field-cards")) {
    $(this).addClass("active-field");
    if (newGame.activePlayer == 1) {
      $(this).addClass("active-field");
      $(".p2field").each(function() {
        $(".p2field").removeClass("unclickable");
      });
    } else if (newGame.activePlayer == 2) {
        $(this).addClass("active-field");
        $(".p1field").each(function() {
          $(".p1field").removeClass("unclickable");
        });
      }
}
});

$(document).on('click', '.player-icons', function() {
  if (($(this).attr("id") == "player-2-deck") && (newGame.activePlayer == 1) && ($('.p1field').hasClass("active-field"))) {
    newGame.players[1].hp -= 1;
    $("#p2-hp-count").text(newGame.players[1].hp);
    loseCondition();
    $(".active-field").addClass("unclickable");
    $(".active-field").removeClass("active-field");
  } else if (($(this).attr("id") == "player-1-deck") && (newGame.activePlayer == 2) && ($('.p2field').hasClass("active-field"))) {
    newGame.players[0].hp -= 1;
    $("#p1-hp-count").text(newGame.players[0].hp);
    loseCondition();
    $(".active-field").addClass("unclickable");
    $(".active-field").removeClass("active-field");
  } else {
    console.log("Nothing happens...");
  }
});
