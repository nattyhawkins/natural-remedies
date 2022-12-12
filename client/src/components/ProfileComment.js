const ProfileComment = ({ comment, timeElapsed, toEdit, CommentForm, commentFields, setCommentFields, commentError, setCommentError, handleEditSubmit }) => {

  return (
    <div className='comment' key={comment.id}>
      {/* <p title='edit comment' style={{ fontSize: '20px' }} className='comment-btn' onClick={editComment}>•••</p> */}
      {/* <p title='delete comment' style={{ fontSize: '20px' }} className='comment-btn' onClick={() => (setShowConfirm(true))}>🆇</p> */}
      {/* <ConfirmPopUp showConfirm={showConfirm} setShowConfirm={setShowConfirm} deleteComment={deleteComment} /> */}
      <small>{timeElapsed}</small>
      {toEdit ?
        <CommentForm commentFields={commentFields} setCommentFields={setCommentFields} commentError={commentError} setCommentError={setCommentError} handleCommentSubmit={handleEditSubmit} />
        :
        <p className='textBox'>{comment.text}</p>
      }
    </div>
  )
}

export default ProfileComment