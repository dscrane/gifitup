import React, { useEffect, useState } from "react";
import {
  useGiphyStore,
  useSessionStore,
  useEmitterStore,
} from "../../../../store/store";
import { gf } from "../../../../api/giphySDK";
import { GifCard } from "../../../../components/GifCard";
import { giphyFetch } from "../../../../api/fetchFromGiphy";
import freezeframe from "freezeframe";

export const GameHand = ({ localPlayer }) => {
  const [fetchFromGiphy] = useSessionStore((state) => [
    state.session.fetchFromGiphy,
  ]);

  const [gifToTableEmitter] = useEmitterStore((state) => [
    state.gifToTableEmitter,
  ]);

  const [sessionGifs, setInitialGifs, removeGifFromHand] = useGiphyStore(
    (state) => [
      state.sessionGifs,
      state.setInitialGifs,
      state.removeGifFromHand,
    ]
  );

  useEffect(() => {
    // Fetch initial set of gifs for player's hand
    const fetchGifs = async () => {
      const initialGifs = await giphyFetch(
        gf,
        "memes",
        localPlayer.queryOffset
      );
      setInitialGifs(initialGifs);
    };
    fetchGifs();
  }, []);

  const gameHandDisplay = (
    <div className="game__hand">
      <ul className="giphy__list">
        {sessionGifs.map((gif) => (
          <GifCard
            key={gif.id}
            gif={gif}
            gifToTableEmitter={gifToTableEmitter}
            removeGifFromHand={removeGifFromHand}
          />
        ))}
      </ul>
    </div>
  );

  const placeholderDisplay = (
    <div className="game__hand">
      <div>Loading...</div>
    </div>
  );

  return sessionGifs ? gameHandDisplay : placeholderDisplay;
};
