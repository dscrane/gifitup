import React from "react";
import { usePlayerStore, useSessionStore } from "../../../store/store";
import SidebarListItem from "./SidebarListItem";
import ListGroup from "react-bootstrap/ListGroup";

const SidebarList = () => {
  const [players] = usePlayerStore((state) => [state.players]);
  const [isStarted] = useSessionStore((state) => [state.isStarted]);
  return (
    <>
      <ListGroup className="sidebar__list">
        {players.map((el, i) => (
          <ListGroup.Item variant={i / 2 === 0 ? "light" : "secondary"}>
            <SidebarListItem
              key={el.playerId}
              itemContent={el.playerName}
              itemIcon={"*icon*"}
              itemScore={"*score*"}
              skeletonDisplay={!isStarted}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default SidebarList;
