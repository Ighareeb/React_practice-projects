import { useEffect, useState } from 'react';
import './styles.css';
//utility function
function Square({ value, onClick }) {
	return (
		<button className="square" onClick={onClick}>
			{value}
		</button>
	);
}

export default function TicTacToe() {
	const [squares, setSquares] = useState(Array(9).fill('')); //create an array of 9 empty strings for all the squares as initialState
	const [isXTurn, setIsXTurn] = useState(true);
	const [status, setStatus] = useState('');

	//each square can either be null, X or O
	function getWinner(squares) {
		const winningPatterns = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
			[0, 3, 6],
			[1, 4, 7],
		];

		for (let i = 0; i < winningPatterns.length; i++) {
			const [x, y, z] = winningPatterns[i];
			//check to see if the squares have the same value (either X or O) and are not null
			if (
				squares[x] &&
				squares[x] === squares[y] &&
				squares[x] === squares[z]
			) {
				return squares[x];
			}
		}
		return null;
	}
	//getCurrentSquare === index of currentSquare
	function handleClick(getCurrentSquare) {
		let squaresCopy = [...squares];
		//check if the game has already been won or if the square is already filled
		if (getWinner(squaresCopy) || squaresCopy[getCurrentSquare]) return;
		//else fill square with current players symbol and check whose turn it is to place either X/O, then toggle whose turn it is and update squares state
		squaresCopy[getCurrentSquare] = isXTurn ? 'X' : 'O';
		setIsXTurn(!isXTurn);
		setSquares(squaresCopy);
	}

	function handleRestart() {
		setIsXTurn(true);
		setSquares(Array(9).fill(''));
	}

	useEffect(() => {
		if (!getWinner(squares) && squares.every((square) => square !== '')) {
			setStatus('Tie Game. Click Restart to play again');
		} else if (getWinner(squares)) {
			setStatus(`Winner is ${getWinner(squares)}. Click Restart to play again`);
		} else {
			setStatus(`Next player is ${isXTurn ? 'X' : 'O'}`);
		}
	}, [squares, isXTurn]);

	console.log(squares);

	return (
		<div className="tic-tac-toe-container">
			<div className="row">
				<Square value={squares[0]} onClick={() => handleClick(0)} />
				<Square value={squares[1]} onClick={() => handleClick(1)} />
				<Square value={squares[2]} onClick={() => handleClick(2)} />
			</div>
			<div className="row">
				<Square value={squares[3]} onClick={() => handleClick(3)} />
				<Square value={squares[4]} onClick={() => handleClick(4)} />
				<Square value={squares[5]} onClick={() => handleClick(5)} />
			</div>
			<div className="row">
				<Square value={squares[6]} onClick={() => handleClick(6)} />
				<Square value={squares[7]} onClick={() => handleClick(7)} />
				<Square value={squares[8]} onClick={() => handleClick(8)} />
			</div>
			<h1>{status}</h1>
			<button onClick={handleRestart}>Restart Game</button>
		</div>
	);
}
