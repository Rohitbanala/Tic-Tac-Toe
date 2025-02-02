import { useState } from "react";

export default function PlayerInfo({
  playerName,
  playerSymbol,
  isActive,
  onChangeName,
}) {
  const [editablePlayerName, setPlayerName] = useState(playerName);
  const [isEditing, setIsEditing] = useState(false);
  function onButtonClick() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(playerSymbol, editablePlayerName);
    }
  }
  function handleChange(event) {
    setPlayerName(event.target.value);
  }
  let editButtonText = "edit";
  if (isEditing) {
    editButtonText = "save";
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            required
            value={editablePlayerName}
            onChange={handleChange}
          />
        ) : (
          <span className="player-name">{editablePlayerName}</span>
        )}
        <span className="player-symbol">{playerSymbol}</span>
      </span>
      <button onClick={onButtonClick}>{editButtonText}</button>
    </li>
  );
}
