console.log('hello');

//=================================================================
// View - handles delivering output to client
//=================================================================
var renderBoard = function () {
  // Output the current state of the game to the board.
  for (let i = 0; i < gameState.length; i++) {
    let currentRow = gameState[i];
    for (let j = 0; j < currentRow.length; j++) {
      document.getElementById('r' + i + 'c' + j).innerText = currentRow[j];
    }
  }
}

//=================================================================
// Model - stores the state of the game/board
//=================================================================
var gameState;
var nextMove;
var gameOver = false;

var checkBoard = function () {
  // This will check all the rows, columns, and diagonals to see if someone has won
  checkRows();
  checkCols();
  checkDiags();
  isBoardFull();
}

var checkRows = function () {
  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i][0] && gameState[i][0] === gameState[i][1] && gameState[i][0] === gameState[i][2]) {
      gameOver = true;
      setTimeout(() => {alert(gameState[i][0] + ' wins!')}, 100);
    }
  }
}

var checkCols = function () {
  for (let i = 0; i < gameState.length; i++) {
    if (gameState[0][i] && gameState[0][i] === gameState[1][i] && gameState[0][i] === gameState[2][i]) {
      gameOver = true;
      setTimeout(() => {alert(gameState[0][i] + ' wins!')}, 100);
    }
  }
}

var checkDiags = function () {
  if (gameState[0][0] && gameState[0][0] === gameState[1][1] && gameState[0][0] === gameState[2][2]) {
    gameOver = true;
    setTimeout(() => {alert(gameState[0][0] + ' wins!')}, 100);
  }
  if (gameState[0][2] && gameState[0][2] === gameState[1][1] && gameState[0][2] === gameState[2][0]) {
    gameOver = true;
    setTimeout(() => {alert(gameState[0][2] + ' wins!')}, 100);
  }
}

var isBoardFull = function () {
  if (!gameOver) {
    for (let i = 0; i < gameState.length; i++) {
      let currentRow = gameState[i];
      for (let j = 0; j < currentRow.length; j++) {
        if (currentRow[j] === '') {
          return false;
        }
      }
    }
    gameOver = true;
    setTimeout(() => {alert('Looks like a tie game! Clear the board to play again.')}, 100);
  }
}


//=================================================================
// Controller - handles the game logic
//=================================================================

// Add event listeners
document.getElementById("board").addEventListener("click", (e) => addNextMove(e));
document.getElementById("reset").addEventListener("click", (e) => resetGame());

// Function to reset the gameboard
var resetGame = function () {
  gameState = [
    ['','',''],
    ['','',''],
    ['','','']
  ];
  nextMove = 'X';
  gameOver = false;
  renderBoard();
}

// Initialize an empty board
resetGame();


var addNextMove = function(e) {
  if (e.target.textContent === '' && !gameOver) {
    // Get the id of the cell clicked
    // Parse it into ['r', row, 'c', column]
    let parsedId = e.target.id.split('');
    // Add nextMove to gameState[row][column]
    gameState[parsedId[1]][parsedId[3]] = nextMove;
    // Re-render the board
    renderBoard();
    // Check to see if someone won
    checkBoard();
    // update nextMove to be the following players move
    if (nextMove === 'X') {
      nextMove = 'O';
    } else {
      nextMove = 'X';
    }
  } else if (gameOver) {
    alert('This game is over... better luck next time! Clear the board to try again.')
  }else {
    alert('Oops! Looks like that box is already taken. Please try again!');
  }
}


