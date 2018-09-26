let startButton = document.querySelector("#startButton");
let boxGuessInput = document.querySelector("#boxguessinput");
let boxGuessButton = document.querySelector("#boxguessbutton");
let boxTriesLeft = document.querySelector("#boxtriesleft");
let boxHighGuesses = document.querySelector("#boxhighguesses"); 
let boxLowGuesses = document.querySelector("#boxlowguesses"); 
let boxMessage = document.querySelector("#messagebox"); 

let triesLeft = 0;
let rightAnswer = undefined;
let highNumbers = [];
let lowNumbers = [];
let time = 0;
let gameOn = false;

let checkAnswer = (input) => {
	switch(true) {
		case (input > rightAnswer):
			boxMessage.textContent = `Your guess of ${input} was too high. Try again`;
			console.log(`Your guess of ${input} was too high. Try again`);
			highNumbers.push(input);
			boxHighGuesses.textContent = highNumbers.join();
			triesLeft--;
			checkGameOver();
			break;
		case (input < rightAnswer):
			boxMessage.textContent = `Your guess of ${input} was too low. Try again`;
			console.log(`Your guess of ${input} was too low. Try again`);
			lowNumbers.push(input);
			boxLowGuesses.textContent = lowNumbers.join();
			triesLeft--;
			checkGameOver();
			break;
		case (input == rightAnswer):
			boxMessage.textContent = `Congratulations! ${input} was your secret number`;
			console.log(`Congratulations! ${input} was your secret number`);
			buttonControl("gameEnd")
			break;
	}
	boxTriesLeft.textContent = triesLeft;
	boxGuessInput.value = " ";
	console.log(`Yout have ${triesLeft} tries left`);
}

let numberGuess = () => {
		userInput = boxGuessInput.value;
	if (triesLeft <= 0) {
		boxMessage.textContent = `Your right number was ${rightAnswer}.\r\n`;
		boxMessage.textContent += `Game Over`;
	}
	else {
		checkAnswer(userInput);
	}
}

let checkGameOver = () => {
	if (triesLeft <= 0) {
	boxMessage.textContent = `Your right number was ${rightAnswer}.\r\n`;
	boxMessage.textContent += `Game Over`;
	buttonControl("gameEnd");
	}
}


let defineDifficulty = () => {
	let deasy = document.querySelectorAll("#difficultyInput")[0].checked;
	let dnormal = document.querySelectorAll("#difficultyInput")[1].checked;
	let dhard = document.querySelectorAll("#difficultyInput")[2].checked;
	let dnight = document.querySelectorAll("#difficultyInput")[3].checked;
	let dasian = document.querySelectorAll("#difficultyInput")[4].checked;
	switch (true) {
		case (deasy === true):
			return "Easy-peasy";
			break;
		case (dnormal === true):
			return "Average Joe";
			break;
		case (dhard === true):
			return "Barbarian";
			break;
		case (dnight === true):
			return "Chuck Norris";
			break;
		case (dasian === true):
			return "Asian";
			break;
	}
}

let buttonControl = (input) => {
	switch(true) {
		case (input === "gameStart"):
			// startButton.disabled = true;
			startButton.classList.remove("btn-success");
			startButton.classList.add("btn-danger");
			startButton.textContent = "Stop";
			boxGuessButton.disabled = false;
			boxGuessInput.disabled = false;
			gameOn = true;
			init();

			break;
		case (input === "gameEnd"):
			// startButton.disabled = false;
			startButton.classList.add("btn-success");
			startButton.classList.remove("btn-danger");
			startButton.textContent = "Start";
			boxGuessButton.disabled = true;
			boxGuessInput.disabled = true;
			gameOn = false;
			break;
	}
}

let cleanEnviroment = () => {
	let rightAnswer = undefined;
	let highNumbers = [];
	let lowNumbers = [];
	boxHighGuesses.textContent = highNumbers.join();
	boxLowGuesses.textContent = lowNumbers.join();
}

let checkStartButton = () => {
	if (gameOn === false) {
		startGame();
	}
	else if (gameOn === true) {
		gameOn = false;
		buttonControl("gameEnd");
		boxMessage.textContent = `Your right number was ${rightAnswer}.\r\n`;
		boxMessage.textContent += `Game Over`;
	}
}

let startGame = () => {
	cleanEnviroment();
	buttonControl("gameStart");
	let range;
	let difficulty = defineDifficulty();
	switch(defineDifficulty()) {
		case "Easy-peasy":
			triesLeft = 7;
			range = 100;
			time = triesLeft*15;
			break;
		case "Average Joe":
			triesLeft = 9;
			range = 500;
			time = triesLeft*13;
			break;
		case "Barbarian":
			triesLeft = 11;
			range = 2000;
			time = triesLeft*9;
			break;
		case "Chuck Norris":
			triesLeft = 14;
			range = 16000;
			time = triesLeft*7;
			break;
		case "Asian":
			triesLeft = 16;
			range = 64000;
			time = 5;
			break;
		case undefined:
			console.log(`This is a bug. Enter a valid difficulty`)
	}
	highNumbers = [];
	lowNumbers = [];
	rightAnswer = Math.floor(Math.random() * range);
	boxMessage.setAttribute('style', 'white-space: pre;');
	boxMessage.textContent = `You are playing on ${difficulty} mode.\r\n`;
	boxMessage.textContent += `You have ${triesLeft} tries left to guess the right number.\r\n`;
	boxMessage.textContent += `The right number is between 1 and ${range}`;

	boxTriesLeft.textContent = triesLeft;

	console.log(`You are playing on ${difficulty} mode. You have ${triesLeft} tries left to guess the right number. The right number is between 1 and ${range}`);
}


let keyInput = (keyInputCode) => {
	 keyInputCode.keyCode === 13 ? numberGuess() : "";
}


function addItemAfterKeyPress(keyPressed) {
	if (keyPressed.keyCode === 13) {
		numberGuess();
	}
}


boxGuessButton.disabled = true;
startButton.addEventListener("click", checkStartButton);
boxGuessButton.addEventListener("click", numberGuess)
boxGuessInput.addEventListener("keypress", keyInput);



// Timer - Library simplegamelib.js
var mostrador = document.querySelector('#boxTimeLeft');
var timer;
var game;
function init(){
	game = new Scene();
	timer = new Timer();
	timer.reset();
	game.start();
	currentTime = 1;
} // end init

function update(){
	game.hide();
	if (currentTime <= 0 && gameOn === true) {
		mostrador.innerHTML = " 0";
		buttonControl("gameEnd");
		boxMessage.textContent = `Your right number was ${rightAnswer}.\r\n`;
		boxMessage.textContent += `Game Over`;
	}
	else if (gameOn === true) {
	currentTime = time - Math.floor(timer.getElapsedTime());
	mostrador.innerHTML = currentTime;}
} // end update

function reset(){
	timer.reset();
} // end reset