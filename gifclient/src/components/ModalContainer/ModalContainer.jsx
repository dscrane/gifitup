/* IMPORTS */
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
/* ------ */

export const ModalContainer = (props) => {
  console.log(props.body);
  return (
    <Modal
      onHide={props.onHide}
      dialogClassName="modal__judgement"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
    >
      <Modal.Header className="modal__heading">
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal__body">{props.body}</Modal.Body>
    </Modal>
  );
};
