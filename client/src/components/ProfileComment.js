import { Card } from 'react-bootstrap'
import CommentForm from './CommentForm'
import ConfirmPopUp from './ConfirmPopUp'

const ProfileComment = ({ comment, timeElapsed, toEdit, commentFields, setCommentFields, commentError, setCommentError, handleEditSubmit, showConfirm, setShowConfirm, deleteComment, editComment, error }) => {

  return (
    <Card className='comment'>
      <hr />
      <Card.Body className='pt-2 pb-0 px-0 px-sm-2 px-lg-4'>
        <div className='d-flex justify-content-between align-items-center mb-1'>
          <small>{timeElapsed}</small>
          <div className='d-flex'>
            <p title='edit comment' style={{ fontSize: '20px' }} className='comment-btn' onClick={editComment}>•••</p>
            <p title='delete comment' style={{ fontSize: '20px' }} className='comment-btn' onClick={() => (setShowConfirm(true))}>🆇</p>
            <ConfirmPopUp showConfirm={showConfirm} setShowConfirm={setShowConfirm} deleteComment={deleteComment} />
          </div>
        </div>
        {toEdit ?
          <CommentForm commentFields={commentFields} setCommentFields={setCommentFields} commentError={commentError} setCommentError={setCommentError} handleEditSubmit={handleEditSubmit} />
          :
          <p className='textBox'>{comment.text}</p>
        }
      </Card.Body>
    </Card>
  )
}

export default ProfileComment