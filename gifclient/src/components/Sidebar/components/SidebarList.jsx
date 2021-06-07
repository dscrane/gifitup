import React, { useEffect, useState } from "react";
import { usePlayers, useSession } from "../../../store/store";

import SidebarListItem from "./SidebarListItem";

const content = [
  "List Item 1",
  "List Item 2",
  "List Item 3",
  "List Item 4",
  "List Item 5",
  "List Item 6",
];

const SidebarList = () => {
  const [playerName, setPlayerName] = useState("");
  const [players, addPlayer] = usePlayers((state) => [
    state.players,
    state.addPlayer,
  ]);
  const [session] = useSession((state) => [state.session]);

  const handleChange = (e) => {
    setPlayerName(e.target.value);
  };
  const addNewPlayer = async () => {
    await addPlayer(playerName);
    session.socketIO.emit("new-player", { name: playerName });
    setPlayerName("");
  };

  return (
    <>
      <div>
        <input name="new-player" value={playerName} onChange={handleChange} />
        <button onClick={addNewPlayer}>Add</button>
      </div>
      <div className="sidebar__list">
        {players.map((el) => (
          <SidebarListItem itemContent={el.name} />
        ))}
      </div>
    </>
  );
};

export default SidebarList;
