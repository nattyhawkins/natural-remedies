import ConfirmPopUp from './ConfirmPopUp'

const EditButtons = ({ editComment, setShowConfirm, deleteComment, showConfirm }) => {

  return (
    <>
      <p title='edit comment' className='edit-btn' onClick={editComment}>•••</p>
      <p title='delete comment' className='edit-btn' onClick={() => (setShowConfirm(true))}>🆇</p>
      <ConfirmPopUp showConfirm={showConfirm} setShowConfirm={setShowConfirm} deleteComment={deleteComment} />
    </>
  )
}
export default EditButtons