//initialize var for number, guesses, timer, and elasped time
let secretNum; 
let guesses = 10;
let timerInterval;
let elapsedSeconds = 0;

//start or restart game
function startGame() {
    secretNum = Math.floor(Math.random() * 100) + 1; //generates secret num randomly 
    guesses = 10; //resets guesses
    elapsedSeconds = 0; //reset timer
    //reseting guesses, feedback, timer
    document.getElementById("guesses").innerText = guesses; 
    document.getElementById("feedback").innerText = "Make your guess!";
    document.getElementById("timer").innerText = "00:00";
    startTimer(); //start timer
}

//timer 
function startTimer() {
    clearInterval(timerInterval); //clear any existing timer
    timerInterval = setInterval(() => { //set new interval to inc
        elapsedSeconds++; //inc elasped by 1 sec
        const minutes = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0"); //format mins
        const seconds = String(elapsedSeconds % 60).padStart(2, "0"); //format sec
        document.getElementById("timer").innerText = `${minutes}:${seconds}`; //update display
    }, 1000);
}

//listener for guess button
document.getElementById("guessButton").addEventListener("click", () => {
    const guess = parseInt(document.getElementById("guessInput").value); //get and parse player guesses
    const feedback = document.getElementById("feedback"); 
    const correctSound = document.getElementById("correctSound"); 
    const incorrectSound = document.getElementById("incorrectSound");

    //if nums is within 1 and 100
    if (isNaN(guess) || guess < 1 || guess > 100) {
        feedback.innerText = "Please enter a valid number between 1 and 100.";
        return;
    }

    guesses--; //dec guesses by 1 each time
    document.getElementById("guesses").innerText = guesses; //updates display

    //check if it is correct
    if (guess === secretNum) {
        feedback.innerText = `Correct! The number was ${secretNum}. Starting a new game...`; //win message
        correctSound.play(); //play correct sound 
        clearInterval(timerInterval); //stop timer
        setTimeout(startGame, 3000); //start new game 
    //check if still have guesses left and same logic 
    } else if (guesses === 0) {
        feedback.innerText = `You've run out of guesses! The number was ${secretNum}. Starting a new game...`; 
        incorrectSound.play();
        clearInterval(timerInterval);
        setTimeout(startGame, 3000);
    //if guess is too high
    } else if (guess > secretNum) {
        feedback.innerText = "Too high! Try again.";
        incorrectSound.play();
    //if guess is too low
    } else {
        feedback.innerText = "Too low! Try again.";
        incorrectSound.play();
    }
});

startGame();
