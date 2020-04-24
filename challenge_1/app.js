console.log('hello');

//=================================================================
// View - handles delivering output to client
//=================================================================
var renderBoard = function () {
  // Output the current state of the game to the board.
  for (let i = 0; i < game.board.length; i++) {
    let currentRow = game.board[i];
    for (let j = 0; j < currentRow.length; j++) {
      document.getElementById('r' + i + 'c' + j).innerText = currentRow[j];
    }
  }
}

var renderScoreBoard = function () {
  // For outputing score board info
}


//=================================================================
// Model - stores the state of the game/board
//=================================================================
var game = {
  board: [
    ['','',''],
    ['','',''],
    ['','','']
  ],
  nextMove: 'X',
  gameOver: false,
  players: {
    X: '',
    O: ''
  }

}

var checkBoard = function () {
  // This will check all the rows, columns, and diagonals to see if someone has won
  checkRows();
  checkCols();
  checkDiags();
  isBoardFull();
}

var checkRows = function () {
  for (let i = 0; i < game.board.length; i++) {
    if (game.board[i][0] && game.board[i][0] === game.board[i][1] && game.board[i][0] === game.board[i][2]) {
      game.gameOver = true;
      setTimeout(() => {alert(game.board[i][0] + ' wins!')}, 100);
    }
  }
}

var checkCols = function () {
  for (let i = 0; i < game.board.length; i++) {
    if (game.board[0][i] && game.board[0][i] === game.board[1][i] && game.board[0][i] === game.board[2][i]) {
      game.gameOver = true;
      setTimeout(() => {alert(game.board[0][i] + ' wins!')}, 100);
    }
  }
}

var checkDiags = function () {
  if (game.board[0][0] && game.board[0][0] === game.board[1][1] && game.board[0][0] === game.board[2][2]) {
    game.gameOver = true;
    setTimeout(() => {alert(game.board[0][0] + ' wins!')}, 100);
  }
  if (game.board[0][2] && game.board[0][2] === game.board[1][1] && game.board[0][2] === game.board[2][0]) {
    game.gameOver = true;
    setTimeout(() => {alert(game.board[0][2] + ' wins!')}, 100);
  }
}

var isBoardFull = function () {
  if (!game.gameOver) {
    for (let i = 0; i < game.board.length; i++) {
      let currentRow = game.board[i];
      for (let j = 0; j < currentRow.length; j++) {
        if (currentRow[j] === '') {
          return false;
        }
      }
    }
    game.gameOver = true;
    setTimeout(() => {alert('Looks like a tie game! Clear the board to play again.')}, 100);
  }
}

// Function to reset the gameboard
var resetGame = function () {
  game.board = [
    ['','',''],
    ['','',''],
    ['','','']
  ];
  game.gameOver = false;
  renderBoard();
}

// Initialize an empty board
resetGame();

//=================================================================
// Controller - handles the game logic
//=================================================================

// Add event listeners
document.getElementById("board").addEventListener("click", (e) => addnextMove(e));
document.getElementById("new-game").addEventListener("click", resetGame);
document.getElementById("new-players").addEventListener("click", getUsers);



var addnextMove = function(e) {
  if (e.target.textContent === '' && !game.gameOver) {
    // Get the id of the cell clicked
    // Parse it into ['r', row, 'c', column]
    let parsedId = e.target.id.split('');
    // Add game.nextMove to game.board[row][column]
    game.board[parsedId[1]][parsedId[3]] = game.nextMove;
    // Re-render the board
    renderBoard();
    // Check to see if someone won
    checkBoard();
    // update game.nextMove to be the following players move
    if (game.nextMove === 'X') {
      game.nextMove = 'O';
    } else {
      game.nextMove = 'X';
    }
  } else if (game.gameOver) {
    alert('This game is over... better luck next time! Clear the board to try again.')
  }else {
    alert('Oops! Looks like that box is already taken. Please try again!');
  }
}

var getUsers = function () {

}
