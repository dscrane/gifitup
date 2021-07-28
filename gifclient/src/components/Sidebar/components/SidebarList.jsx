import React from "react";
import { usePlayerStore, useSessionStore } from "../../../store/store";
import SidebarListItem from "./SidebarListItem";
import ListGroup from "react-bootstrap/ListGroup";

const SidebarList = () => {
  const [players, localPlayer] = usePlayerStore((state) => [
    state.players,
    state.localPlayer,
  ]);
  const [isStarted] = useSessionStore((state) => [state.isStarted]);

  const setVariant = (index, name) => {
    if (name === localPlayer.playerName) {
      return "primary";
    } else if (index / 2 !== 0) {
      return "secondary";
    } else if (index / 2 === 0) {
      return "light";
    }
  };
  return (
    <>
      <ListGroup className="sidebar__list">
        {players.map((player, i) => (
          <ListGroup.Item
            key={player.playerId}
            variant={
              localPlayer ? setVariant(i, player.playerName) : "secondary"
            }
          >
            <SidebarListItem
              key={player.playerId}
              itemContent={player.playerName}
              itemScore={player.score}
              skeletonDisplay={!isStarted}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default SidebarList;
