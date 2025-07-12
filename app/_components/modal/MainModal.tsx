import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface MainModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  children?: React.ReactNode;
}

function MainModal({ modalOpen, setModalOpen, children }: MainModalProps)  {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        animation={false}
        keyboard={false}
        size="lg"
      >
      
        <Modal.Body>
          {children}
        </Modal.Body>
      
      </Modal>
    </>
  );
}

export default MainModal;