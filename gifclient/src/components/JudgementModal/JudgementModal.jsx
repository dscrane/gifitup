/* IMPORTS */
import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { GifCard } from "../GifCard";
import { Gif } from "@giphy/react-components";
import { Card } from "react-bootstrap";
import { JudgedCard } from "../JudgedCard";

/* ------ */

export const JudgementModal = ({ tableGifs }) => {
  const [index, setIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([]);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const gifs = tableGifs.map((gif) => (
    <Gif className="mx-auto" gif={gif} width={300} noLink={true} />
  ));

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
    <div className="modal__body">
      <div className="judgement__card">
        <JudgedCard />
      </div>
      <Carousel
        slide={false}
        variant="dark"
        interval={null}
        activeIndex={index}
        onSelect={handleSelect}
        className="d-flex align-items-center w-75 h-100 bg-secondary"
      >
        {carouselItems}
      </Carousel>
    </div>
  );
};
