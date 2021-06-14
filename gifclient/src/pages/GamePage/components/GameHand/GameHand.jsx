import React from "react";
import { useSessionStore, useGiffyStore } from "../../../../store/store";

export const GameHand = () => {
  const session = useSessionStore((state) => state.session);
  const sessionGifs = useGiffyStore((state) => state.sessionGifs);

  if (sessionGifs.length > 1) {
    const gifGrid = sessionGifs.map((gif) => {
      return (
        <li key={gif.id} className="gif">
          <img alt="gif" src={`${gif.images.fixed_width_small.url}`} />
        </li>
      );
    });
    return (
      <div className="game__hand">
        <ul className="gif__list">{gifGrid}</ul>
        {/*<SVGContainer />*/}
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
