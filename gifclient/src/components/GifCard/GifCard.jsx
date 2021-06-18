/* IMPORTS */
// noinspection SpellCheckingInspection

import React, { Component, createRef, useState } from "react";
import ReactFreezeframe from "react-freezeframe";
import freezeframe from "freezeframe";
import { useGiffyStore } from "../../store/store";
/* ------ */

class GifCard extends Component {
  constructor(props) {
    super(props);
    this.gif = { ...props.gif };
    this.gifToTableEmitter = props.gifToTableEmitter;
    this.removeGifFromHand = props.removeGifFromHand;
    this.freeze = createRef();
  }
  handleMove() {
    const gifId = this.freeze.current.props.id;
    console.log(gifId);
    this.gifToTableEmitter(gifId);
    this.removeGifFromHand(gifId);
  }
  render() {
    return (
      <li className="gif__item" onClick={this.handleMove.bind(this)}>
        <ReactFreezeframe
          className="freeze__container"
          ref={this.freeze}
          id={this.gif.id}
          src={this.gif.images.fixed_width_small.url}
          alt={this.title}
          options={{ selector: ".freeze__container" }}
        />
      </li>
    );
  }
}

export { GifCard };
