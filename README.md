# Diabolis

#### _A browser-based trading card game, August 2018_

#### By Dan Mace, Evan Filkins, Ben Kiggen, Austin Cummings, Josh Gearheart


## Description
Diabolis is a two-player card game inspired by such games as Magic: The Gathering, Hearthstone, and others.  Players use decks of demon cards to fight for control of the realms of hell, where only one demon can reign supreme. The players will summon minions to fight for and protect them from their hellacious opponent.

#### How to win
- A player wins Diabolis when one or more of the following conditions is true:
  - The opposing player's hit points (HP) are reduced to zero or fewer.
  - The opposing player is required to draw a card but has no more cards in their deck.
#### Setup
- Players begin with decks of 30 cards each.
- The play space consists of two primary areas:
  - The players' hands, located at the top and bottom of the screen.
  - The battlefield, made up of five vertical lanes in the middle of the screen.
- Each player has:
  - A deck of 30 cards.
  - A hand of up to eight cards, drawn from their deck.
  - A graveyard (discard pile) that begins empty.
- Each player begins with a pool of ten hit points.
#### Cards
- All cards have two statistics and a special ability.
  - Damage: represented by the number on the bottom left corner of the card.  When a card attacks, it deals damage equal to its damage value to its target.
  - Health: represented by the number on the bottom right corner of the card.  When a card is attacked, its health is reduced by the damage dealt.  If a card's health drops to zero or less, it is discarded to the graveyard.
  - Special Abilities: represented by the text in the lower portion of the card.  Abilities vary by card.
#### Play
- Player one begins the game.
- On the first turn of the game, no cards are drawn.
- On each subsequent turn, players draw a card to begin.
- Each player may play cards out of their hand into the battlefield lanes in the middle of the board.
  - There are five total lanes for each player, each of which may contain one card.
  - If a player's lane already contains a card, another card may not be played in the same lane.
  - Players may play as many cards per turn as there are open lanes available.
  - Cards played into lanes may not attack until the following turn (sometimes referred to as "summoning sickness").
- When a card is played, its special ability is triggered immediately after it is placed into a lane.
- Any card that began its turns in a battlefield lane may attack on its controlling player's turn.
- Cards in battlefield lanes may choose to attack an enemy card in the same lane, or the enemy player directly.
- When a player clicks the End Turn button, the turn is passed to the other player.

## Setup/Installation Requirements
- Navigate to https://github.com/swampcamel/project-one-up.
- Click the green `Clone or download` button on the right, and select `Download ZIP`.
- Unzip `project-one-up-master.zip`.
- Navigate to the `project-one-up-master` directory.
- Inside `project-one-up-master` double-click on `index.html`.

## Known Bugs
- If a card on the battlefield is clicked, and a hand card is clicked as the next user action, the program will allow the user to play the card from their hand on top of the battlefield card initially selected.

## Support and contact details
- For questions or support you can email us individually at:
  - Dan Mace: dmacebeta@gmail.com
  - Evan Filkins: evanfilkins@gmail.com
  - Ben Kiggen: benkiggen@gmail.com
  - Austin Cummings: austins.accts@gmail.com
  - Josh Gearheart: other.josh.gearheart@gmail.com

## Technologies Used
- This program uses HTML, CSS, and Javascript, and makes use of the Materialize front end framework,

## Attributions
- Card Template: [`TCG Template 01` by a-ravlik](https://graphicriver.net/item/tcg-template-01/21359870?ref=KlitVogli&clickthrough_id=1382660938&redirect_back=true)
  - Licensed under [Graphic River's standard license](https://graphicriver.net/licenses/standard?license=regular)
- Fire Brush: Fire by [elestrial](www.amaranthdreams.com)
- PLayer Hand Backgrounds: [Metal Seamless Textures Pack 4 by jojo_ojoj](https://www.deviantart.com/jojo-ojoj)
  - Licensed under [Attribution 3.0 Unported (CC BY 3.0) License](https://creativecommons.org/licenses/by/3.0/)
- Music: [Solar Fractal by Quarkstar](http://dig.ccmixter.org/files/Quarkstar/57874)
  - (c) copyright 2018 Licensed under a [Creative Commons Attribution (3.0) license](https://creativecommons.org/licenses/by/3.0/).
- Cloud & Star Assets: https://codepen.io/WebSonick/pen/vjmgu
- Animations by [Animista](http://animista.net/)

### License
This software is licensed under [GNU GPLv3](LICENSE.txt).
