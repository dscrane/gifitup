import React, { useEffect } from "react";
import { useGiffyStore, useSessionStore } from "../../../../store/store";
import { GifCard } from "../../../../components/GifCard";
import { giphyFetch } from "../../../../api/fetchFromGiphy";

export const GameHand = ({ localPlayer }) => {
  const [fetchFromGiphy] = useSessionStore((state) => [
    state.session.fetchFromGiphy,
  ]);
  const [giphyInstance, sessionGifs, setInitialGifs] = useGiffyStore(
    (state) => [state.giphyInstance, state.sessionGifs, state.setInitialGifs]
  );

  useEffect(() => {
    // Fetch initial set of gifs for player's hand
    const fetchGifs = async () => {
      const initialGifs = await giphyFetch(
        giphyInstance,
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
          <GifCard key={gif.id} gif={gif} />
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
