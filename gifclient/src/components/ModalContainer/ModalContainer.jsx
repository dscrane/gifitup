/* IMPORTS */
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
/* ------ */

export const ModalContainer = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      className="modal modal__player"
    >
      <Modal.Header className="modal__heading">
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
    </Modal>
  );
};
