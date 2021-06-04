import React from "react";
import { Grid } from "@giphy/react-components";
import TableSVGContainer from "./TableSVGContainer";
import { JudgedCard } from "../JudgedCard";

const GameTable = ({ gf }) => {
  const fetchGifs = () =>
    gf.search("sexy", {
      sort: "relevant",
      limit: 7,
      offset: 0,
      rating: "r",
      type: "gifs",
      lang: "en",
    });
  return (
    <div className="gametable">
      <Grid width={500} columns={7} fetchGifs={fetchGifs} />
      {/*<TableSVGContainer />*/}
    </div>
  );
};

export default GameTable;
