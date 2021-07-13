/* IMPORTS */
import React, { useEffect, useState } from "react";
import { useEmitterStore, useSessionStore } from "../../store/store";

// Style Imports
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
/* ------ */

// TODO:
//  make this a modal on the game page when first loaded
//  while this is up show skeleton gifs then load them when the player finishes the form

export const PlayerForm = () => {
  const [roomId, toggleFetchFromGiphy] = useSessionStore((state) => [
    state.roomId,
    state.togglePlayerModal,
  ]);
  const joinSessionEmitter = useEmitterStore(
    (state) => state.joinSessionEmitter
  );
  const [playerName, setPlayerName] = useState("");

  const handleNameChange = (e) => setPlayerName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await toggleFetchFromGiphy(true);
    await joinSessionEmitter(playerName, roomId);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Name: </Form.Label>
        <Form.Control
          type="name"
          name="player-name"
          value={playerName}
          onChange={handleNameChange}
        />
      </Form.Group>
      <Button type="submit">Join Game</Button>
    </Form>
  );
};
