# project-one-up
Title Pending

text to smoke (for dead cards)
https://codepen.io/uiswarup/pen/ZMEGLv

smoke particles (for damaged cards)
https://codepen.io/MIML/pen/iBKyC

fire color palette
https://color.adobe.com/Explosion-color-theme-1065909/edit/?copy=true&base=2&rule=Custom&selected=3&name=Copy%20of%20Explosion&mode=rgb&rgbvalues=0.466667,0,0,0.639216,0,0,1,0.407843,0,0.992157,0.623529,0.035294,0.709804,0.027451,0&swatchOrder=0,1,2,3,4

fire animation
https://codepen.io/Ulvbern/pen/bvxgjQ?page=2


Bugs:

You can click a field card then click a hand card then play that card on that field card.  Can be fixed by when you select hand cards, make field-cards unclickable.  However, this will make them unable to attack if they haven't attacked yet.  If you remove the unclickable on field cards after playing the card, then cards with "summoning sickness" will be un-sick and can suddenly attack.  Work around for this would be a second unclickable class that is only applied when a card from hand is played.  Then the unclickable class for your field cards when you have a hand card selected could follow different rules.
