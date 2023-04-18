const squares = document.querySelectorAll('.square');
let currentPlayer = 'X';
const board = ['', '', '', '', '', '', '', '', ''];

squares.forEach(square => {
	square.addEventListener('click', handleClick);
});

function handleClick(event) {
	const square = event.target;
	if (square.textContent !== '') {
		return;
	}
	const index = Array.from(squares).indexOf(square);
	square.textContent = currentPlayer;
	board[index] = currentPlayer;
	if (checkForWin(currentPlayer, board)) {
		alert('Player ' + currentPlayer + ' wins!');
		resetBoard();
	} else if (checkForDraw()) {
		alert('Draw!');
		resetBoard();
	} else {
		currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
	}
}

function checkForWin(player, board) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (board[a] === player && board[b] === player && board[c] === player) {
      // Display X or O symbol
      const symbol = player === 'X' ? '❌' : '⭕';
      document.querySelector('.winner').innerHTML = `${symbol} wins!`;

      // Add crossline across winning squares
      const winningSquares = document.querySelectorAll(`#${a}, #${b}, #${c}`);
      winningSquares.forEach(square => square.classList.add('winning-square'));

      return true;
    }
  }
  return false;
}

function checkForDraw() {
	return [...squares].every(square => {
		return square.textContent !== '';
	});
}

function resetBoard() {
	squares.forEach(square => {
		square.textContent = '';
	});
	board.fill('');
	currentPlayer = 'X';
	document.querySelectorAll('.winning-square').forEach(square => {
		square.classList.remove('winning-square');
	});
	document.querySelector('.winner').innerHTML = '';
}
