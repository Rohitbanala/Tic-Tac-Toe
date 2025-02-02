export default function GameBoard({ onSelectingSquare, gameBoard }) {
  // const [gameBoard, setGameBoard] = useState(initialArray);
  // function handleSelect(rowIndex, colIndex) {
  //   setGameBoard((prevGameBoard) => {
  //     const updatedBoard = [...prevGameBoard.map((row) => [...row])];
  //     updatedBoard[rowIndex][colIndex] = currentActivePlayerSymbol;
  //     return updatedBoard;
  //   });
  //   onSelectingSquare();
  // }
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIdx) => (
        <li key={rowIdx}>
          <ol>
            {row.map((playerSymbol, colIdx) => (
              <li key={colIdx}>
                <button
                  onClick={() => onSelectingSquare(rowIdx, colIdx)}
                  disabled={playerSymbol != null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
