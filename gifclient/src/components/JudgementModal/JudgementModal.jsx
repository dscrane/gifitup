/* IMPORTS */
import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { GifCard } from "../GifCard";
import { Gif } from "@giphy/react-components";
import { Card } from "react-bootstrap";

/* ------ */

export const JudgementModal = ({ tableGifs }) => {
  const gifs = tableGifs.map((gif) => <Gif gif={gif} width={300} />);

  const [index, setIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([]);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  useEffect(() => {
    setCarouselItems(
      gifs.map((gif) => (
        <Carousel.Item key={gif.id}>
          {gif}
          <Carousel.Caption>{gif.title}</Carousel.Caption>
        </Carousel.Item>
      ))
    );
  }, [tableGifs]);

  console.log(carouselItems);
  return (
    <Carousel
      variant="dark"
      interval={null}
      activeIndex={index}
      onSelect={handleSelect}
    >
      {carouselItems}
    </Carousel>
  );
};
