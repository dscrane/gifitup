import React, {useState, useEffect} from "react";
import { Grid } from "@giphy/react-components";
import { SVGContainer } from "../SVGContainer";
import { useGiphyStore, useSessionStore } from "../../../../store/store";
import { GifCard } from '../../../../components/GifCard'

export const GameTable = () => {
  const [tableContent, setTableContent] = useState(null)
  const tableGifs = useGiphyStore(state => state.tableGifs);
  useEffect(() => {
    setTableContent(tableGifs.map(gif => <GifCard gif={gif} />))
  }, [tableGifs])
  return <div className="game__table">{tableContent ? tableContent : "<GameTable/>"}</div>;
};
