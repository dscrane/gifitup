import React from "react";
import { useGiffyStore } from "../../../../store/store";
import ReactFreezeframe from "react-freezeframe";

export const GameHand = () => {
  const sessionGifs = useGiffyStore((state) => state.sessionGifs);

  if (sessionGifs.length > 1) {
    const gifGrid = sessionGifs.map((gif) => {
      return (
        <li key={gif.id} className="gif">
          <ReactFreezeframe
            src={gif.images.fixed_width_small.url}
            alt={gif.title}
            key={gif.id}
            options={{ selector: "giphy__gif", trigger: "hover" }}
          />
        </li>
      );
    });
    return (
      <div className="game__hand">
        <ul className="giphy__list">{gifGrid}</ul>
      </div>
    );
  } else {
    return (
      <div className="game__hand">
        <div>waiting</div>
        {/*<SVGContainer />*/}
      </div>
    );
  }
};
