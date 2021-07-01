import React, { useEffect, useState } from "react";
import { usePlayerStore } from "../../../store/store";

import SidebarListItem from "./SidebarListItem";

const SidebarList = () => {
  const [players] = usePlayerStore((state) => [state.players]);

  return (
    <>
      <div className="sidebar__list">
        {players.map((el) => (
          <SidebarListItem key={el.playerId} itemContent={el.playerName} />
        ))}
      </div>
    </>
  );
};

export default SidebarList;
