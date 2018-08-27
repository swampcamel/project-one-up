var monsterTracker = 2;
//this is for proto display reasons and starting with 2 inputted monsters

//begin business
function Card(attkDamage,attkHealth,attkName){
this.attkDamage = attkDamage;
this.attkHealth = attkHealth;
this.attkName =  attkName;
}
// card.protoype(damage,damage,health,id,name),
//
//end business logic




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
})


})
