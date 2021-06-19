import React, { useEffect, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { PlayerForm } from "../../../../components/PlayerForm";
import { GameTable } from "../GameTable";
import { GameHand } from "../GameHand";

import { fetchFromGiphy } from "../../../../api/fetchFromGiphy";
import { useGiphyStore, useSessionStore } from "../../../../store/store";

export const GameContainer = () => {
  const [localPlayer, fetchFromGiphy, toggleFetchFromGiphy] = useSessionStore(
    (state) => [
      state.localPlayer,
      state.fetchFromGiphy,
      state.toggleFetchFromGiphy,
    ]
  );
  const setGiphySDK = useGiphyStore((state) => state.setGiphySDK);
  useEffect(() => {
    const initializeGiphyInstance = async () => {
      const gf = await new GiphyFetch("ENiNvfm90KcAX4An2sM8ajbvtg3R6v18");
      await setGiphySDK(gf);
    };
    initializeGiphyInstance();
  }, []);

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
