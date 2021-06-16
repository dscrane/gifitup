/* IMPORTS */
import React from "react";
import ReactFreezeframe from "react-freezeframe";
/* ------ */

export const GifCard = ({ gif }) => {
  return (
    <li className="gif">
      <ReactFreezeframe
        src={gif.images.fixed_width_small.url}
        alt={gif.title}
        key={gif.id}
        options={{ selector: "giphy__gif", trigger: "hover" }}
      />
    </li>
  );
};
