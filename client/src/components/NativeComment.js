import { Card } from 'react-bootstrap'
import { isOwner } from '../helpers/auth'
import CommentForm from './CommentForm'
import ConfirmPopUp from './ConfirmPopUp'

const NativeComment = ({ comment, timeElapsed, toEdit, commentFields, setCommentFields, commentError, setCommentError, handleEditSubmit, showConfirm, setShowConfirm, deleteComment, editComment, error }) => {

  return (
    <>
      <Card className='comment'>
        <hr />
        <Card.Body className='pt-2 pb-0 px-0 px-sm-2 px-lg-4'>
          <div className='d-flex justify-content-between mb-2 mb-sm-3'>
            <div className='d-flex align-items-center d-sm-block'>
              {/* Small screens show profile pic here */}
              <div className="image profile-pic icon small me-2 d-sm-none flex-column align-items-center"
                style={{ backgroundImage: comment.owner.profile_image ? `url(${comment.owner.profile_image})` : 'url(https://www.labforward.io/wp-content/uploads/2020/12/default-avatar.png)' }} 
                alt="profile picture"></div>
              <div className='d-sm-flex align-items-center justify-content-end'>
                <Card.Title className="username mb-0" >@{comment.owner.username}</Card.Title>
                <small>{timeElapsed}</small>
              </div>
            </div>
            <div className='d-flex justify-content-end' style={{ height: '20px' }}>
              {/* If owner show edit & delete */}
              {isOwner(comment.owner.id) &&
                <>
                  <p title='edit comment' style={{ fontSize: '20px' }} className='comment-btn' onClick={editComment}>•••</p>
                  <p title='delete comment' style={{ fontSize: '20px' }} className='comment-btn' onClick={() => (setShowConfirm(true))}>🆇</p>
                  <ConfirmPopUp showConfirm={showConfirm} setShowConfirm={setShowConfirm} deleteComment={deleteComment} />

                </>
              }
            </div>
          </div>
          <div className='d-flex flex-column align-items-center justify-content-start flex-sm-row align-items-sm-start' >
            {/* Big screens show profile pic here */}
            <div className="image profile-pic icon d-none d-sm-flex flex-column align-items-center" 
              style={{ backgroundImage: comment.owner.profile_image ? `url(${comment.owner.profile_image})` : 'url(https://www.labforward.io/wp-content/uploads/2020/12/default-avatar.png)' }} 
              alt="profile picture"></div>
            <div className="ms-sm-3">
              {error && <small className='text-warning'>{error}</small>}
              <div >
                {toEdit ?
                  <CommentForm commentFields={commentFields} setCommentFields={setCommentFields} commentError={commentError} setCommentError={setCommentError} handleCommentSubmit={handleEditSubmit} />
                  :
                  <div className="textBox m-0">
                    <Card.Text>{comment.text}</Card.Text>
                  </div>
                }
              </div>
              {/* <div className='infoBox'>
                <div className='d-flex flex-column flex-sm-row align-items-sm-center' style={{ minHeight: '50px' }}>
                  like box
                  <div className="d-flex align-items-center justify-content-end" style={{ width: '200px', height: '35px' }} onClick={handleCommentLike}>
                    {likeStatus === 204 ?
                      <p className='like-btn' >👍</p>
                      :
                      <p className='like-btn liked'>❤️</p>
                    }
                    <div style={{ width: '160px' }}>
                      <small >
                        {comment.likes.length === 0 ? <> Be the first to like</>
                          :
                          comment.likes.length === 1 ? <> 1 Like</>
                            :
                            <>{comment.likes.length} Likes</>
                        }
                      </small>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}
export default NativeComment