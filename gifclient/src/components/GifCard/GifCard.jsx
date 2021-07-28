/* IMPORTS */
// noinspection SpellCheckingInspection

import React, { Component, createRef, useState } from "react";
import ReactFreezeframe from "react-freezeframe";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { log } from "../../utils/logs";
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
  renderTooltip(overlayTriggerProps) {
    return (
      <Tooltip id="gif-tooltip" {...overlayTriggerProps}>
        Cannot play card as judge.
      </Tooltip>
    );
  }
  renderTooltipOverlay(content) {
    return (
      <OverlayTrigger
        delay={{ show: 150, hide: 200 }}
        overlay={this.props.isJudge ? this.renderTooltip : null}
        placement="right"
      >
        {content}
      </OverlayTrigger>
    );
  }
  gifCardContainer() {
    return (
      <li
        className={`gif__item ${this.props.isJudge ? "gif__item-locked" : ""}`}
        onClick={
          this.isTableGif || this.props.isJudge
            ? null
            : this.handleMove.bind(this)
        }
      >
        <ReactFreezeframe
          className="freeze__container"
          ref={this.freeze}
          id={this.gif.id}
          src={
            this.isJudgementGif
              ? this.gif.images.original
              : this.gif.images.fixed_width_small.url
          }
          alt={this.title}
          options={{
            selector: ".freeze__container",
            trigger: this.props.isJudge ? false : "hover",
          }}
        />
      </li>
    );
  }

  render() {
    return this.props.isJudge
      ? this.renderTooltipOverlay(this.gifCardContainer())
      : this.gifCardContainer();
  }
}

export { GifCard };
