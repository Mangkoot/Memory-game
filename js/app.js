let cardToggler = [];
let moves = 0;
let counting = 0;


const deck = document.querySelector('.deck');
const starOne = document.querySelector('.checked1');
const starTwo = document.querySelector('.checked2');
const starThree = document.querySelector('.checked3');




//Show cards
function shuffler(){
	const shuffledCards = Array.from(document.querySelectorAll('.deck li')); //ARRAY.FROM: https://stackoverflow.com/questions/3199588/fastest-way-to-convert-javascript-nodelist-to-array - The Node list is NOT an array, and must be made into one. 
	let cardMixer = shuffle(shuffledCards);
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
	 		checkPairs(cardClicked);
	 		addMoves();
	 		starsCount();
 	 	} 
 		}
});
 	

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

//Toggle cards
function cardClickToggle(cardClicked) {
 	cardClicked.classList.toggle('open');
 	cardClicked.classList.toggle('show');
 }

function cardClickToggler(cardClicked) {
	cardToggler.push(cardClicked);
	console.log(cardToggler);
}

//Check for pairs + delay 1200 ms before turning cards backside up again.
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
	}, 1200);
	}
}

//Add moves function
function addMoves() {
	moves = moves + 1;
	const amountOfMoves = document.querySelector('.moves');
	amountOfMoves.innerHTML = moves;
}

//Show star count based on moves
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

//Start timer on first click. Hints from https://stackoverflow.com/questions/28610365/how-can-i-add-an-event-for-a-one-time-click-to-a-function
let start = document.querySelector('.card')
start.addEventListener("click", function() {
startTimer();
}, {once : true});

function youWon(){
    clearInterval(interval); 
    modalResults()
    modalToggle()
}
//Toggling the modal on and off
function modalToggle() {
	const modal = document.querySelector('.modal_background');
	modal.classList.toggle('hidden');
}

//Show results in the modal
function modalResults() {
	const clocky = document.querySelector('.clock');
	const clockies = clocky.cloneNode(true);
		document.querySelector('.modal_time_spent').appendChild(clockies);

	const amountOfMoves = document.querySelector('.moves');
	const flytte = amountOfMoves.cloneNode(true);
		document.querySelector('.modal_amount_of_moves').appendChild(flytte);

	const starOne = document.querySelector('.checked1');
 	const starTwo = document.querySelector('.checked2');
 	const starThree = document.querySelector('.checked3');
	const str = starOne.cloneNode(true);
	const str1 = starTwo.cloneNode(true);
	const str2 = starThree.cloneNode(true);
		document.querySelector('.modal_stars_count').appendChild(str);
		document.querySelector('.modal_stars_count').appendChild(str1);
		document.querySelector('.modal_stars_count').appendChild(str2);
}

//Restart game
const restartButton = document.querySelector('.restart');
	restartButton.addEventListener('click', function() {
	location.reload();
	})

//New game button
const newGame = document.querySelector('.modal_button_replay');
	newGame.addEventListener('click', function() {
	location.reload();
	})

//Close modal
const closeX = document.querySelector('.modal_close');
	closeX.addEventListener('click', function() {
	modalToggle();
	})