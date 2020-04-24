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
// Model - handles the state of the game/board
//=================================================================
var gameState;
var nextMove;



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
  renderBoard();
}

// Initialize an empty board
resetGame();


var addNextMove = function(e) {
  console.log(e);
  if (e.target.textContent === '') {
    // Get the id of the cell clicked
    // Parse it into ['r', row, 'c', column]
    let parsedId = e.target.id.split('');
    // Add nextMove to gameState[row][column]
    gameState[parsedId[1]][parsedId[3]] = nextMove;
    // Re-render the board
    renderBoard();
    // update nextMove to be the following players move
    if (nextMove === 'X') {
      nextMove = 'O';
    } else {
      nextMove = 'X';
    }
  } else {
    alert('Oops! Looks like that box is already taken. Please try again!');
  }

}


