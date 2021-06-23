import React, { useEffect, useState } from "react";
import { useSessionStore } from "../../../../store/store";
import { PlayerForm } from "../../../../components/PlayerForm";
import { GameTable } from "../GameTable";
import { GameHand } from "../GameHand";

export const GameContainer = () => {
  const [localPlayer] = useSessionStore((state) => [state.localPlayer]);

  return (
    <div className="game">
      {localPlayer ? (
        <>
          <GameTable />
          <GameHand localPlayer={localPlayer} />
        </>
      ) : (
        <PlayerForm />
      )}
    </div>
  );
};
