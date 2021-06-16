import React, { useEffect } from "react";
import { useGiffyStore, useSessionStore } from "../../../../store/store";
import { GifCard } from "../../../../components/GifCard";
import { giphyFetch } from "../../../../api/fetchFromGiphy";

export const GameHand = ({ thisPlayer }) => {
  const [fetchFromGiphy, toggleFetchFromGiphy] = useSessionStore((state) => [
    state.session.fetchFromGiphy,
    state.toggleFetchFromGiphy,
  ]);
  const [giphyInstance, sessionGifs, setInitialGifs] = useGiffyStore(
    (state) => [state.giphyInstance, state.sessionGifs, state.setInitialGifs]
  );
  useEffect(() => {
    console.log("fetchfromgiphy", fetchFromGiphy);
    const fetchGifs = async () => {
      const initialGifs = await giphyFetch(
        giphyInstance,
        "memes",
        thisPlayer.queryOffset
      );
      console.log("initialgifs", initialGifs);
      setInitialGifs(initialGifs);
    };
    fetchGifs();
  }, []);

  if (sessionGifs) {
    return (
      <div className="game__hand">
        <ul className="giphy__list">
          {sessionGifs.map((gif) => (
            <GifCard key={gif.id} gif={gif} />
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="game__hand">
        <div>Loading...</div>
      </div>
    );
  }
};
