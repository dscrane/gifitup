import React, { useEffect, useState } from "react";
import { useStore } from "../../../store/store";

import SidebarListItem from "./SidebarListItem";

const SidebarList = () => {
  const [players] = useStore((state) => [state.players]);

  return (
    <>
      <div className="sidebar__list">
        {players.map((el) => (
          <SidebarListItem key={el.id} itemContent={el.playerName} />
        ))}
      </div>
    </>
  );
};

export default SidebarList;
