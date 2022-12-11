import { Button, Modal } from 'react-bootstrap'

const ConfirmPopUp = ({ showConfirm, setShowConfirm, deleteComment }) => {

  const handleClose = () => setShowConfirm(false)

  return (
    <Modal show={showConfirm} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure you want to delete?</Modal.Title>
      </Modal.Header>
      {/* <Modal.Body>Woohoo, youre reading this text in a modal!</Modal.Body> */}
      <Modal.Footer className='justify-content-center'>
        <Button variant="primary" onClick={deleteComment}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmPopUp