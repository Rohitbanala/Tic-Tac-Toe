import { useState } from "react";
import PlayerInfo from "./Components/player";
import GameBoard from "./Components/GameBoard";
import Log from "./Components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./Components/GameOver";
const initialArray = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function deriveGameBoard(GameTurns) {
  let gameBoard = [...initialArray.map((innerArray) => [...innerArray])];

  for (const turn of GameTurns) {
    const { squares, player } = turn;
    const { row, col } = squares;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}
function derivePlayerName(gameTurns) {
  let currPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currPlayer = "O";
  }
  return currPlayer;
}
function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column];
    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = players[firstSymbol];
    }
  }
  return winner;
}
function App() {
  const [players, setPlayers] = useState({ X: "Player 1", O: "Player 2" });
  const [GameTurns, setGameTurns] = useState([]);
  let gameBoard = deriveGameBoard(GameTurns);
  let winner = deriveWinner(gameBoard, players);
  const hasDraw = GameTurns.length === 9 && !winner;
  // const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer = derivePlayerName(GameTurns);
  function handleActivePlayer(rowIndex, colIndex) {
    // setActivePlayer((curPlayer) => (curPlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      const currPlayer = derivePlayerName(prevTurns);

      const updatedTurn = [
        { squares: { row: rowIndex, col: colIndex }, player: currPlayer },
        ...prevTurns,
      ];

      return updatedTurn;
    });
  }
  function handleRestart() {
    setGameTurns([]);
  }
  function handlePlayerNameChange(playerSymbol, newName) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [playerSymbol]: newName };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <PlayerInfo
            playerName="Player 1"
            playerSymbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          ></PlayerInfo>
          <PlayerInfo
            playerName="Player 2"
            playerSymbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          ></PlayerInfo>
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} handleRestart={handleRestart}></GameOver>
        )}
        <GameBoard
          onSelectingSquare={handleActivePlayer}
          gameBoard={gameBoard}
        ></GameBoard>
      </div>
      <Log turns={GameTurns}></Log>
    </main>
  );
}

export default App;
