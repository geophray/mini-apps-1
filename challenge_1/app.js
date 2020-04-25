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
  advanceTurn();
};

var renderScoreBoard = function () {
  // For outputing score board info

   // Add user names to scoreboard
   document.getElementById('x-name').textContent = game.players.X.name;
   document.getElementById('o-name').textContent = game.players.O.name;

   // Add user scores to the scoreboard
   document.getElementById('x-wins').textContent = game.players.X.wins;
   document.getElementById('o-wins').textContent = game.players.O.wins;
};

//=================================================================
// Model - stores the state of the game/board
//=================================================================
var game = {
  board: [
    ['','',''],
    ['','',''],
    ['','','']
  ],
  nextMove: 'O',
  gameOver: false,
  players: {
    X: {
      name: '',
      wins: 0
    },
    O: {
      name: '',
      wins: 0
    }
  }
};

var checkBoard = function () {
  // This will check all the rows, columns, and diagonals to see if someone has won
  checkRows();
  checkCols();
  checkDiags();
  isBoardFull();
};

var checkRows = function () {
  for (let i = 0; i < game.board.length; i++) {
    if (game.board[i][0] && game.board[i][0] === game.board[i][1] && game.board[i][0] === game.board[i][2]) {
      announceWinner(game.players[game.board[i][0]]);
    }
  }
};

var checkCols = function () {
  for (let i = 0; i < game.board.length; i++) {
    if (game.board[0][i] && game.board[0][i] === game.board[1][i] && game.board[0][i] === game.board[2][i]) {
      announceWinner(game.players[game.board[0][i]]);
    }
  }
};

var checkDiags = function () {
  if (game.board[0][0] && game.board[0][0] === game.board[1][1] && game.board[0][0] === game.board[2][2]) {
    announceWinner(game.players[game.board[0][0]]);
  }
  if (game.board[0][2] && game.board[0][2] === game.board[1][1] && game.board[0][2] === game.board[2][0]) {
    announceWinner(game.players[game.board[0][2]]);
  }
};

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
};

var advanceTurn = function () {
  if (game.nextMove === 'X') {
    game.nextMove = 'O';
    document.getElementById('o-name').classList.add('my-turn');
    document.getElementById('x-name').classList.remove('my-turn');
  } else {
    game.nextMove = 'X';
    document.getElementById('x-name').classList.add('my-turn');
    document.getElementById('o-name').classList.remove('my-turn');
  }
}

var announceWinner = function(winner) {
  game.gameOver = true;
  winner.wins++;
  setTimeout(() => {alert(winner.name + ' won!')}, 100);
  renderScoreBoard();
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
};

//=================================================================
// Controller - handles the game logic
//=================================================================

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

  } else if (game.gameOver) {
    alert('This game is over... better luck next time! Clear the board to try again.')
  }else {
    alert('Oops! Looks like that box is already taken. Please try again!');
  }
};

var getUsers = function () {
  // Toggle Scoreboard/new user input
  document.getElementById('get-users').classList.toggle('hidden');
  document.getElementById('score').classList.toggle('hidden');
  document.getElementById('board').classList.toggle('hidden');
};

var startGame = function (e) {
  e.preventDefault();
  // Get escaped data from user input fields
  game.players.X.name = document.getElementById('user-x').value;
  game.players.O.name = document.getElementById('user-o').value;

  // Reset game count
  game.players.X.wins = 0;
  game.players.O.wins = 0;

  // X goes first when starting a new series
  game.nextMove = 'O';

  // Render scoreboard
  renderScoreBoard();

  // Toggle Scoreboard/new user input
  document.getElementById('get-users').classList.toggle('hidden');
  document.getElementById('score').classList.toggle('hidden');
  document.getElementById('board').classList.toggle('hidden');

  // Make sure board is clear for new game
  resetGame();
};

// Add event listeners
document.getElementById("board").addEventListener("click", (e) => addnextMove(e));
document.getElementById("new-game").addEventListener("click", resetGame);
document.getElementById("start-game").addEventListener("click", (e) => startGame(e));
document.getElementById("new-players").addEventListener("click", getUsers);