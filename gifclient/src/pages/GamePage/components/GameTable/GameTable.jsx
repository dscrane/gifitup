import React from "react";
import { Grid } from "@giphy/react-components";
import { SVGContainer } from "../SVGContainer";

export const GameTable = ({ gf }) => {
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
      {/*<SVGContainer />*/}
    </div>
  );
};
