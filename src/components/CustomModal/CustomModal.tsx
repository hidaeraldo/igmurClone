import React, { ReactChild } from "react";
import { Modal, Button, ModalProps } from "react-bootstrap";

interface CustomModalProps extends ModalProps { }

const CustomModal = ({
  content,
  closeBtn = false,
  ...rest
}: CustomModalProps) => {
  return (
    <Modal animation={false} centered size="lg" keyboard {...rest}>
      <Modal.Body>{content}</Modal.Body>
    </Modal>
  );
};

export default CustomModal;
