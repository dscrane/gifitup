import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { usePlayerStore, useSessionStore } from "../../../../store/store";
import { GameTable } from "../GameTable";
import { GameHand } from "../GameHand";
import { PlayerForm } from "../../../../components/PlayerForm";
import history from "../../../../config/history";
import socket from "../../../../config/socket";
import { ModalContainer } from "../../../../components/ModalContainer";

export const GameContainer = () => {
  const [showModal, setShowModal] = useState(true);
  const [localPlayer] = usePlayerStore((state) => [state.localPlayer]);
  const [
    roomId,
    displayPlayerModal,
    togglePlayerModal,
    toggleFetchFromGiphy,
    updateSession,
  ] = useSessionStore((state) => [
    state.roomId,
    state.displayPlayerModal,
    state.togglePlayerModal,
    state.toggleFetchFromGiphy,
    state.updateSession,
  ]);

  const handDisplay = localPlayer ? (
    <GameHand localPlayer={localPlayer} />
  ) : (
    <Spinner animation="border" role="status" variant="secondary">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );

  const tableDisplay =
    !localPlayer && displayPlayerModal ? (
      <ModalContainer
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Create Player Profile"
        body={<PlayerForm />}
      />
    ) : (
      <GameTable />
    );

  return (
    <div className="game">
      <div className="game__table">{tableDisplay}</div>
      <div className="game__hand">{handDisplay}</div>
    </div>
  );
};
