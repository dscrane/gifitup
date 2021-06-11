import React from "react";
import { Grid } from "@giphy/react-components";
import { SVGContainer } from "../SVGContainer";
import { useGiffyStore, useGameStore } from "../../../../store/store";

export const GameTable = () => {
  const session = useGameStore((state) => state.session);
  const sessionGifs = useGiffyStore((state) => state.sessionGifs);
  if (session.inProgress) {
    const gifGrid = sessionGifs.map((gif) => {
      console.log(gif.images.downsized_small);
      return (
        <li key={gif.id} className="gif">
          <img alt="gif" src={`${gif.images.fixed_height_small.url}`} />
        </li>
      );
    });
    return (
      <div className="gametable">
        <ul className="gif__list">{gifGrid}</ul>
        {/*<SVGContainer />*/}
      </div>
    );
  } else {
    return (
      <div className="gametable">
        <div>waiting</div>
        {/*<SVGContainer />*/}
      </div>
    );
  }
};
