import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import ConfirmPopUp from './ConfirmPopUp'


const ProfileComment = ({ comment, timeElapsed, toEdit, commentFields, setCommentFields, commentError, setCommentError, handleEditSubmit, showConfirm, setShowConfirm, deleteComment, editComment, error }) => {
  const [ model, setModel ] = useState(() => {
    return comment.active_ingredient ? 'active_ingredient' : 'recipe'
  })

  return (
    comment &&
    <Card className='comment mt-2'>
      <Card.Title className='mb-0 username fs-6'>
        {model === 'recipe' ?
          <Link to={`/recipes/${comment.recipe.id}`}>→ {comment.recipe.name}</Link>
          :
          <Link to={`/active_ingredients/${comment.active_ingredient.id}`}>→ {comment.active_ingredient.name}</Link>
        }</Card.Title> 
      <Card.Body className='pt-0 pb-0 px-0 d-flex'>
        <div className="mt-2 me-2 image profile-pic icon small d-flex align-items-center" 
          style={{ backgroundImage: comment.recipe ? `url(${comment.recipe.image})` 
            : comment.active_ingredient ? `url(${comment.active_ingredient.image})` 
              : 'url(https://www.labforward.io/wp-content/uploads/2020/12/default-avatar.png)' }} 

          alt="profile picture">
        </div>
        <div className='flex-grow-1'>
          <div className='d-flex justify-content-between align-items-center mb-1'>
            <small>{timeElapsed}</small>
            <div className='d-flex'>
              <p title='edit comment' className='edit-btn ms-2' onClick={editComment}>•••</p>
              <p title='delete comment' className='edit-btn ms-2' onClick={() => (setShowConfirm(true))}>🆇</p>
              <ConfirmPopUp showConfirm={showConfirm} setShowConfirm={setShowConfirm} deleteComment={deleteComment} />
            </div>
          </div>
          {toEdit ?
            <CommentForm commentFields={commentFields} setCommentFields={setCommentFields} commentError={commentError} setCommentError={setCommentError} handleCommentSubmit={handleEditSubmit} />
            :
            <p className='textBox'>{comment.text}</p>
          }
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProfileComment