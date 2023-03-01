import React from 'react';
import { ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
const ModalCustom = (props: any) => {
  return (
    <>
      <Modal size={props.size} show={props.show} onHide={props.onHide}  >
        <ModalHeader>
          <ModalTitle>
            {props.title}
          </ModalTitle>
        </ModalHeader>
        <ModalBody>{props.children}</ModalBody>
        <ModalFooter>

        </ModalFooter>
      </Modal>
    </>
  )
}
ModalCustom.defaultProps = {
  title: "",
  size: "lg"
}
export default ModalCustom