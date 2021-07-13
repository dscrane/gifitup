/* IMPORTS */
import React from "react";
import Button from "react-bootstrap/Button";
/* ------ */

export const GameCTA = ({ fn, text }) => {
  return (
    <Button variant="secondary" size="sm" type="button" onClick={() => fn()}>
      {text}
    </Button>
  );
};
