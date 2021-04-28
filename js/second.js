// challenge 1: your age in days
function ageInDays(){
    var birthYear=prompt('what year were you born..Good Friend ?');
    var ageInDayss=(2020-birthYear)*365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('you are'+ ageInDayss + 'days old');
    h1.setAttribute('id','ageIndays');
    h1.appendChild(textAnswer);
    div= document.getElementById('flex-box-result');
    div.appendChild(h1);
    
}
function reset()
{
    document.getElementById('ageIndays').remove();
}
//challenge 2: cat generator
function generateCat(){
    var image=document.createElement('img');
    var div =document.getElementById('flex-cat-gen');
    image.src ="https://i.imgur.com/b96dOB0.gif";
    div.appendChild(image);
} 
//challenge 3:Rock,paper,scissors
function rpsGame(yourChoice){
    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    console.log('computer choice:',botChoice);
    results = decideWinner(humanChoice, botChoice);
    console.log(results);
    message = finalMessage(results);
    console.log(message);
    rpsfrontEnd(yourChoice.id,botChoice,message);
    
    
}
function randToRpsInt()
{
    return Math.floor(Math.random() *3);
}
function numberToChoice(number){
    return['rock','paper','scissors'][number];
}

function decideWinner(yourChoice , computerChoice) {
    var rpsDatabase ={
    'rock': {'scissors': 1,'rock': 0.5, 'paper': 0},
    'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
    'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0}

}
var yourscore =rpsDatabase[yourChoice][computerChoice];
var computerScore = rpsDatabase[computerChoice][yourChoice];

return [yourscore, computerScore];
}
function finalMessage([yourScore]){
    if(yourScore === 0)
    {
        return{'message': 'you lost!','color':'red'};
    }else if(yourScore === 0.5){
        return{'message':'you tied!','color':'yellow'};
    }else{
        return{'message':'you won!','color':'green'}
    }

}
function rpsfrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
        
    }
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv =  document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src'" + imageDatabase[humanImageChoice] + "'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1);'>"
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src'" + imageDatabase[botImageChoice]+"'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,24,1);'>"

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
    

    
}

//challenge 4:change the color of all buttons
var all_buttons = document.getElementsByTagName('button');
console.log(all_buttons);

var copyAllButtons=[];
for(let i=0; i< all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i]);

}
console.log( copyAllButtons);


function buttonColorchange(buttonThingy){
      if (buttonThingy.value === 'red'){
          buttonRed();
      }else if (buttonThingy.value === 'green'){
          buttonsGreen();
      }else if(buttonThingy.value === 'reset'){
          buttoncolorReset();
      }else if (buttonThingy.value === 'random'){
          randomColor();
      }
}
function buttonRed(){
    for(let i=0; i< all_buttons.length;i++)
    {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-danger');
 }
}
function buttonsGreen(){
    for(let i=0; i< all_buttons.length;i++)
    {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-success');
 }
}
function buttoncolorReset(){
    for (let i=0; i < all_buttons.length; i++){
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('copyAllButtons');
    }
    
    
}
function randomColor(){
    let choices = ['btn-primary', 'btn-danger','btn-success','btn-warning']

    for(let i=0; i < all_buttons.length;i++)
    {
        let randomNumber =Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}

let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result','div':'#your-box','score': 0},
    'dealer':{'scoreSpan': '#dealer-blackjack-result','div':'#dealer-box','score': 0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardMap':{'2': 2,'3': 3, '4': 4,'5': 5,'6': 6,'7': 7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A': [1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'turnsOver': false,
};


const YOU =blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitsound = new Audio('sounds/swish.m4a');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);



function blackjackHit() {
    if(blackjackGame['isStand']===false){
    let card = randomCard();
    console.log(card);
    showCard(card,YOU);
    updateScore(card,YOU);
    showScore(YOU);
    }
    


}
function randomCard() {
    
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
    
}
function showCard(card, activeplayer){
    if(activeplayer['score']<=21){
    let cardImage = document.createElement('img');
    cardImage.src = `images/${card}.png`;/*?????*/
    document.querySelector(activeplayer['div']).appendChild(cardImage);
    hitsound.play();
    }
    
}
function blackjackDeal(){
    //let winner=computeWinner();
    //displaywinner(winner);
if(blackjackGame['turnsOver']===true){

    blackjackGame['isStand']=false;

   
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    
  
    for( i=0; i < yourImages.length; i++)
    {
        yourImages[i].remove();
    }
      
    for( i=0; i < dealerImages.length; i++)
    {
    dealerImages[i].remove();
    }
    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent =0;
    document.querySelector('#dealer-blackjack-result').textContent =0;

    document.querySelector('#your-blackjack-result').style.color = '#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

    document.querySelector('#blackjack-result').textContent="Lets's play";
    document.querySelector('#blackjack-result').style.color='black';

    blackjackGame['turnsOver']=true;


 }
}
function updateScore(card , activeplayer){
    if(card === 'A'){
        if(activeplayer['score'] + blackjackGame['cardMap'][card][1] <=21){
        activeplayer['score'] +=blackjackGame['cardMap'][card][1];
        }else{
                activeplayer['score']+= blackjackGame['cardMap'][card][0];
        }

    }
    else{
    activeplayer['score'] += blackjackGame['cardMap'][card];
    }
}
function showScore(activeplayer){
    if(activeplayer['score']>21){
        document.querySelector(activeplayer['scoreSpan']).textContent ='BUST';
        document.querySelector(activeplayer['scoreSpan']).style.color ='red';
    }else{
    document.querySelector(activeplayer['scoreSpan']).textContent =activeplayer['score'];
    }
}
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function dealerLogic(){
    blackjackGame['isStand'] = true;

    while (DEALER['score']< 16 && blackjackGame['isStand']=== true){
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
    }

    
        blackjackGame['turnsOver'] = true;
        let winner = computeWinner();
        displaywinner(winner);
    
}
//compute winner and return who just won
 function computeWinner(){
    let winner;

    if(YOU['score'] <= 21) {
        //condition: higher score then dealer or when dealer  busts but you're
        if(YOU['score'] > DEALER['score'] || (DEALER['score']>21)){
        blackjackGame['wins']++;
        winner = YOU;

         }else if(YOU['score'] < DEALER['score']){
            blackjackGame['losses']++;
            winner= DEALER;
         }
         else if(YOU['score'] ===  DEALER['score'] ){
            blackjackGame['draws']++;
         }
         //condition: when user busts  but dealer doesn't

    }else if(YOU['score'] > 21 && DEALER['score']<=21){
             blackjackGame['lost']++;
             winner = DEALER;
                //conditions: when you AND the dealer busts
         }
         else if(YOU['score'] > 21 && DEALER['score'] > 21){
            blackjackGame['draws']++;
         }
          console.log(blackjackGame); 
         return winner;
}      

    function displaywinner(winner){
        let message, messageColor;
        if(blackjackGame['turnsOver']=== true){
        if(winner === YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'you won!';
            messageColor = 'red';
        }

        else if(winner === DEALER)
        {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'you lost!';
            messageColor = 'red';

        
            
        } else { 
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message ='you drew!';
            messagecolor ='black';

        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
        }

    }

        
    
