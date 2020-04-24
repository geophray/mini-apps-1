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




//=================================================================
// Model - handles the state of the game/board
//=================================================================