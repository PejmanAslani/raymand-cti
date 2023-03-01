import React from 'react';
import { Button, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
const ModalC = (props: any) => {
  return (
    <>
      <Modal size='lg'  show={props.show} onHide={props.onHide}  >
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

ModalC.defaultProps = {
  title: "Add Route"
}
export default ModalC