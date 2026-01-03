const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const startBtn = document.querySelector(".start-btn");
const playerXInput = document.getElementById("playerX");
const playerOInput = document.getElementById("playerO");

// variables to be Used
let currentPlayer;
let gameGrid;
let playerXName = "Player X";
let playerOName = "Player O";

// win position
const winningPositions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];






// Initialize game
function initGame() {
    currentPlayer = "X";
    console.log("inside the initGame");
    gameGrid = ["","","","","","","","",""];
    
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = ` ${playerXName} (X)`;
    // gameInfo.innerText = `Current Player - ${playerXName} (X)`;
}


//  player swap function
function swapTurn() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    gameInfo.innerText = ` ${(currentPlayer === "X" ? playerXName : playerOName)} (${currentPlayer})`;
}

// check for game over
function checkGameOver() {
    let winner = "";

    winningPositions.forEach((position) => {
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) 
            && (gameGrid[position[1]] === gameGrid[position[2]])) {

            winner = gameGrid[position[0]];
                // non clickable of the game boxes
            boxes.forEach((box) => box.style.pointerEvents = "none");

            boxes[position[0]].classList.add("win", "winner-animation");
            boxes[position[1]].classList.add("win", "winner-animation");
            boxes[position[2]].classList.add("win", "winner-animation");
        }
    });

    if(winner !== "") {
        const winnerName = (winner === "X") ? playerXName : playerOName;
        gameInfo.innerText = `🏆 Winner: ${winnerName} (${winner}) 🏆`;
        newGameBtn.classList.add("active");
        return;
    }

    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" ) fillCount++;
    });
    // check gmae tie 
    if(fillCount === 9) {
        gameInfo.innerText = "🤝 It's a Tie!";
        newGameBtn.classList.add("active");
    }
}
// click for each boxes
function handleClick(index) {
    if(gameGrid[index] === "" ) {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";  // none clicable
        swapTurn();
        checkGameOver();
    }
}

// Attach event listeners to each box
boxes.forEach((box, index) => {
    box.addEventListener("click", () => handleClick(index));
});

// startBtn.addEventListener("click", handleStartGame);
newGameBtn.addEventListener("click", initGame);

// start button click function
startBtn.addEventListener("click", () => {
    playerXName = playerXInput.value || "Player X";
    playerOName = playerOInput.value || "Player O";
    console.log("input filled");
    document.querySelector(".player-inputs").style.display = "none";
    document.querySelector(".wrapper").classList.add("active");

    console.log("now game start");
    initGame();
});
