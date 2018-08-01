let cardToggler = [];
let moves = 0;
let counting = 0;


/*
 * Create a list that holds all of your cards //CHECK
 */
 /*
let cardList = ['fa fa-diamond', ' fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-cube',
 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];
*/
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 const deck = document.querySelector('.deck');
 const starOne = document.querySelector('.checked1');
 const starTwo = document.querySelector('.checked2');
 const starThree = document.querySelector('.checked3');

/*Shuffle function*/
function shuffler(){
	const shuffledCards = Array.from(document.querySelectorAll('.deck li')); //ARRAY.FROM: https://stackoverflow.com/questions/3199588/fastest-way-to-convert-javascript-nodelist-to-array - The Node list is NOT an array, and must be made into one. 
	//console.log(shuffledCards);
	let cardMixer = shuffle(shuffledCards);
	//console.log(cardMixer);
	for (card of cardMixer) {
		deck.appendChild(card);
	}
}
shuffler();

 



  deck.addEventListener('click', evt => {
 	const cardClicked = evt.target;
 	if (cardClicked.classList.contains('card') && !cardClicked.classList.contains('match') && cardToggler.length < 2 && !cardToggler.includes(cardClicked)) {
 		cardClickToggle(cardClicked);
 		cardClickToggler(cardClicked);
 	if (cardToggler.length === 2) {
 		//console.log('yess');
 		checkPairs(cardClicked);
 		addMoves();
 		starsCount();
 		
 	} 
 }
 });
 	/*console.log('yes');						//just checking if the code works
 	}						
 	else{
 		console.log('no');
 	} */


 // Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function cardClickToggle(cardClicked) {
 	cardClicked.classList.toggle('open');
 	cardClicked.classList.toggle('show');
 }

function cardClickToggler(cardClicked) {
	cardToggler.push(cardClicked);
	console.log(cardToggler);
}

function checkPairs() {
	if (cardToggler[0].firstElementChild.className === cardToggler[1].firstElementChild.className) {
	console.log('You got it!');
	cardToggler[0].classList.toggle('match');
	cardToggler[1].classList.toggle('match');
	cardToggler = [];
	counting ++;
}
		else {
			setTimeout(() => {					//https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
			console.log('nope');
			cardClickToggle(cardToggler[0]);
			cardClickToggle(cardToggler[1]);
			cardToggler = [];
	}
			, 1200);
	}
}

function addMoves() {
	moves = moves + 1;
	const amountOfMoves = document.querySelector('.moves');
	amountOfMoves.innerHTML = moves;
}


function starsCount() {
	if (moves <= 12) {
		console.log('3 stars');
	} 
	else if ((moves > 12) && (moves <=18)) {
		starThree.style.color='black';
		console.log('2 stars');
	}
	else if ((moves > 18) && (moves <=24)){
		(starThree.style.color='black') && (starTwo.style.color='black'); 
		console.log('1 star');
	}
	else {
		(starThree.style.color='black') && (starTwo.style.color='black') && (starOne.style.color='black');
		console.log('0 stars');
	}
}



//Timer function
    let sec = 00, min = 00;
    let timer = document.querySelector('.clock');
    let interval;
    let matchedCard = document.querySelector('.match');

    	function startTimer(){ //https://stackoverflow.com/questions/31559469/how-to-create-a-simple-javascript-timer
         interval = setInterval(function(){
        timer.innerHTML = min + ':' + sec;
        sec++;
            if(sec == 60){
            min++;
            sec= 00;
        }
        if (counting === 8){
        youWon();
    }

    }, 1000);
}

//Start timer on first click (https://stackoverflow.com/questions/28610365/how-can-i-add-an-event-for-a-one-time-click-to-a-function)
document.addEventListener("click", function() {

startTimer();
}, {once : true});



function youWon(){
        clearInterval(interval);
    }



   //     finalTime = timer.innerHTML;

/*
function createCardHtml(){
let cardFunction = shuffle(cardList);
cardFunction.forEach(function(card) {
    $(".deck").append('<li><i class="card fa ' + card + '"></i></li>');
  })
}
*/

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one) //CHECK
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//shuffle(array);
//createCardHtml;
