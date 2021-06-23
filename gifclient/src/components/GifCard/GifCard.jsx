/* IMPORTS */
// noinspection SpellCheckingInspection

import React, { Component, createRef, useState } from "react";
import ReactFreezeframe from "react-freezeframe";
/* ------ */

class GifCard extends Component {
  constructor(props) {
    super(props);
    this.gif = { ...props.gif };
    this.gifToTableEmitter = props.gifToTableEmitter;
    this.removeGifFromHand = props.removeGifFromHand;
    this.isTableGif = props.isTableGif;
    this.freeze = createRef();
  }
  handleMove() {
    const gifId = this.freeze.current.props.id;
    this.gifToTableEmitter(gifId);
    this.removeGifFromHand(gifId);
  }
  render() {

    return (
      <li
        className="gif__item"
        onClick={this.isTableGif ? null : this.handleMove.bind(this)}
      >
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
