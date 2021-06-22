import React, { useState, useEffect } from "react";
import { useGiphyStore, useSessionStore } from "../../../../store/store";
import { GifCard } from "../../../../components/GifCard";
import { JudgedCard } from "../../../../components/JudgedCard";

export const GameTable = () => {
  const [tableContent, setTableContent] = useState();
  const [tableGifs, pullNewGif] = useGiphyStore((state) => [state.tableGifs]);
  useEffect(() => {
    setTableContent(
      tableGifs.map((gif) => (
        <GifCard key={gif.id} gif={gif} isTableGif={true} />
      ))
    );
  }, [tableGifs]);
  return (
    <div className="game__table">
      <JudgedCard />
      {tableContent ? tableContent : "<GameTable/>"}
    </div>
  );
};
