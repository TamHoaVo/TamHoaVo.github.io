const startButton = document.getElementById("start-button");
const gameBoard = document.getElementById("game-board");
const timerDisplay = document.getElementById("time-left");
const message = document.getElementById("message");
const instructionsPopup = document.getElementById("instructions-popup");
const closeInstructions = document.getElementById("close-instructions");

//game var
let cards = [];
let matchedPairs = 0;
let selectedCards = [];
let totalImages, memorizationTime, gameTime, timerInterval;

//start button and close instruction
startButton.addEventListener("click", () => {
    instructionsPopup.style.display = "block"; 
});

closeInstructions.addEventListener("click", () => {
    instructionsPopup.style.display = "none";
    startGame();
});

//start game
function startGame() {
    //get num of images and get time level base on user
    totalImages = parseInt(document.getElementById("image-count").value);
    memorizationTime = parseInt(document.getElementById("difficulty").value);
    gameTime = totalImages === 8 ? 120 : totalImages === 10 ? 150 : 180; //start game base on num of images

    //reset game, new card display, and start timer
    resetGame();
    generateCards(totalImages);
    displayCards();
    setTimeout(hideCards, memorizationTime * 1000);
    startGameTimer(gameTime);
}
//reset game and clear all 
function resetGame() {
    gameBoard.innerHTML = "";
    cards = [];
    matchedPairs = 0;
    selectedCards = [];
    clearInterval(timerInterval);
    timerDisplay.innerText = gameTime;
    message.innerText = "Memorize the images!";
}
//generate a pair of cards for the game
function generateCards(numImages) {
    const images = Array.from({ length: numImages }, (_, i) => `images/image${i + 1}.png`); //create array of unique images sources
    //dupe the images and shuffle them
    const pairs = [...images, ...images];
    cards = pairs.sort(() => 0.5 - Math.random());
    //grid dimensions
    const totalCards = cards.length;
    let columns, rows;
    
    if (totalCards === 16) { // 8 photos
        columns = 4;
        rows = 4;
    } else if (totalCards === 20) { // 10 photos
        columns = 5;
        rows = 4;
    } else if (totalCards === 24) { // 12 photos
        columns = 6;
        rows = 4;
    }

    //apply layout
    gameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

}
//display cards
function displayCards() {
    const columns = totalImages / 2; // Adjust columns based on the total images
    gameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`; // Dynamic grid layout

    cards.forEach((src, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        
        const img = document.createElement("img");
        img.src = src;
        card.appendChild(img);
        
        card.dataset.index = index;
        card.addEventListener("click", onCardClick);
        
        gameBoard.appendChild(card);
    });
}
//hide card
function hideCards() {
    document.querySelectorAll(".card img").forEach(img => img.classList.add("hidden")); 
    message.innerText = "Find the matching pairs!"; 
}

//when a card is clicked, reveal it if it’s hidden
function onCardClick(event) {
    const card = event.currentTarget;
    const img = card.querySelector("img");
    
    //only allow action if the image is hidden and fewer than 2 cards are selected
    if (!img.classList.contains("hidden") || selectedCards.length >= 2) return;
    
    //reveal the clicked card
    img.classList.remove("hidden");
    
    selectedCards.push(card);
    
    //check for a match if two cards are selected
    if (selectedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}
//check if card match
function checkMatch() {
    const [card1, card2] = selectedCards;
    const img1 = card1.querySelector("img");
    const img2 = card2.querySelector("img");

    //check if pair is matched
    if (img1.src === img2.src) {
        matchedPairs++; //inc
        card1.classList.add("match"); //styles
        card2.classList.add("match");
        //check if all pairs are matched
        if (matchedPairs === cards.length / 2) {
            clearInterval(timerInterval); //reset timer
            message.innerText = "Congratulations! You've matched all pairs!"; //win message
            celebrateWin();
        }
    } else {
        //if don't match high them again
        img1.classList.add("hidden");
        img2.classList.add("hidden");
    }
    selectedCards = []; //resets selected cards array
}

//start timer same logic as guessing game but with dec instead
function startGameTimer(seconds) {
    timerDisplay.innerText = seconds;
    timerInterval = setInterval(() => {
        seconds--;
        timerDisplay.innerText = seconds;
        if (seconds <= 0) {
            clearInterval(timerInterval);
            message.innerText = "Time's up! You lost. Try again!";
        }
    }, 1000);
}
//winning animation
function celebrateWin() {
    const colors = ['#FFD700', '#FF6347', '#00FF7F', '#1E90FF', '#FF69B4'];
    const numParticles = 30;

    //loop to create particles
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        //randomize particle color and position
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = `${50 + Math.random() * 50 - 25}%`; 
        particle.style.top = `${50 + Math.random() * 50 - 25}%`;

        //append particle to the game container
        gameBoard.appendChild(particle);

        //animate and remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 1000); //particles disappear after 1 second
    }
}
