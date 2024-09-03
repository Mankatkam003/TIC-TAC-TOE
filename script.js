const cells = document.querySelectorAll('.cell');
//selecting the eleemnts we want to interact with
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6] 
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = clickedCell.getAttribute('data-index');

    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        if (checkWin()) {
            status.textContent = `Player ${currentPlayer} wins`;
            gameActive = false;
        } 
        else if (gameBoard.every(cell => cell !== '')) {
            status.textContent = "It's a draw";
            gameActive = false;
        } 
        else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWin() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    status.textContent = "Player X's turn";
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
//adding event listeners to attach a click event to each cell
//loops thru each cell using for each,each cell has a click event listener - when the cell is clicked,
//handleCellClick function is added - it s an event handler


resetButton.addEventListener('click', resetGame);