import React from "react";
import { usePlayerStore, useSessionStore } from "../../../store/store";

import SidebarListItem from "./SidebarListItem";

const SidebarList = () => {
  const [players] = usePlayerStore((state) => [state.players]);
  const [isStarted] = useSessionStore((state) => [state.isStarted]);
  return (
    <>
      <div className="sidebar__list">
        {players.map((el) => (
          <SidebarListItem
            key={el.playerId}
            itemContent={el.playerName}
            skeletonDisplay={!isStarted}
          />
        ))}
      </div>
    </>
  );
};

export default SidebarList;
