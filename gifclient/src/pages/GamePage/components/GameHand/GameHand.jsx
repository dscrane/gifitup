import React, { useEffect, useState } from "react";
import { useGiphyStore, useEmitterStore } from "../../../../store/store";
import { gf } from "../../../../config/giphySDK";
import { GifCard } from "../../../../components/GifCard";
import { giphyFetch } from "../../../../api/fetchFromGiphy";
import { GameCTA } from '../../../../components/GameCTA'

export const GameHand = ({ localPlayer }) => {
  const [gifToTableEmitter] = useEmitterStore((state) => [
    state.gifToTableEmitter,
  ]);
  const [
    giphyCategory,
    sessionGifs,
    noGifs,
    setInitialGifs,
    removeGifFromHand,
    handleNoGifReturn,
    pullNewGif
  ] = useGiphyStore((state) => [
    state.giphyCategory,
    state.sessionGifs,
    state.noGifs,
    state.setInitialGifs,
    state.removeGifFromHand,
    state.handleNoGifReturn,
    state.pullNewGif
  ]);
  const [placeholder, setPlaceholder] = useState(<div>Loading...</div>);

  useEffect(() => {
    // Fetch initial set of gifs for player's hand
       setInitialGifs(giphyCategory, localPlayer.queryOffset);
  }, []);

  useEffect(() => {
    const placeholderText = noGifs ? (
      <div>
        We ran into an issue fetching your gifs! Please wait while to try again!
      </div>
    ) : (
      <div>Loading...</div>
    );
    setPlaceholder(placeholderText);
  }, [noGifs]);

  const gameHandDisplay = (
    <ul className="giphy__list">
      {sessionGifs.map((gif) => (
        <GifCard
          key={gif.id}
          gif={gif}
          gifToTableEmitter={gifToTableEmitter}
          removeGifFromHand={removeGifFromHand}
        />
      ))}
      {sessionGifs.length < 7 ? <GameCTA fn={pullNewGif} text={"Draw Gif"} /> : null}
    </ul>
  );

  return (
    <div className="game__hand">
      {sessionGifs && !noGifs ? gameHandDisplay : placeholder}
    </div>
  );
};
