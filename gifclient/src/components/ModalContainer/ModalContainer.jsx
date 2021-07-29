/* IMPORTS */
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
/* ------ */

export const ModalContainer = (props) => {
  console.log(props);
  return (
    <Modal
      onHide={props.onHide}
      dialogClassName={props.dialogClassName}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
    >
      <Modal.Header className="modal__heading">
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
};
