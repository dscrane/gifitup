/* IMPORTS */
import React from "react";
import ReactFreezeframe from "react-freezeframe";
import { useDrag, DragSource } from "react-dnd";
import { ItemTypes } from "../../utils/dragNdrop/ItemTypes";
import { giphyFetch } from "../../api/fetchFromGiphy";
import { useGiffyStore } from "../../store/store";
/* ------ */

export const GifCard = ({ gif }) => {
  // const [{ isDragging }, drag] = useDrag(() => ({
  //   type: ItemTypes.CARD,
  //   item: { id: gif.id },
  //
  //   collect: (monitor) => ({
  //     isDragging: monitor.isDragging(),
  //     handlerId: monitor.getHandlerId(),
  //   }),
  // }));
  return (
    <li /*ref={drag}*/ className="gif">
      <ReactFreezeframe
        src={gif.images.fixed_width_small.url}
        alt={gif.title}
        key={gif.id}
        options={{ selector: "giphy__gif", trigger: "hover" }}
      />
    </li>
  );
};
