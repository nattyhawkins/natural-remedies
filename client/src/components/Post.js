import axios from 'axios'
import { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { getToken, isOwner } from '../helpers/auth'
import { getTimeElapsed } from '../helpers/general'
import PostForm from './PostForm'



const Post = ({ postId, post, groupId, setRefresh, refresh }) => {

  const [open, setOpen] = useState(false)
  // const [likeStatus, setLikeStatus] = useState(() => {
  //   if (getToken() && post.likes.some(like => isOwner(like.owner))) return 202
  //   return 204
  // })
  const [timeElapsed, setTimeElapsed] = useState(getTimeElapsed(post.createdAt))
  const [toEdit, setToEdit] = useState(false)
  const [postError, setPostError] = useState(false)
  const [error, setError] = useState(false)
  const [postFields, setPostFields] = useState({
    text: '',
  })


  //time since posting
  useEffect(() => {
    const tick = setInterval(() => {
      setTimeElapsed(getTimeElapsed(post.created_at))
    }, 1000)
    return () => {
      clearInterval(tick)
    }
  }, [])


  //handle edit post changes
  async function editPost(e) {
    setToEdit(!toEdit)
    setPostFields({
      text: post.text,
    })
  }
  
  //submit edit post
  async function handlePostSubmit(e) {
    try {
      e.preventDefault()
      if (postFields.message.length > 300) throw new Error('Character limit exceeded')
      await axios.put(`/api//api/comments/${postId}/`, postFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      setRefresh(!refresh)
      setToEdit(false)
      setPostFields({ text: '' })
    } catch (err) {
      setPostError(err.message ? err.message : err.response.data.message)
    }
  }
  //delete post
  async function deletePost(e) {
    try {
      e.preventDefault()
      await axios.delete(`/api/comments/${postId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      setRefresh(!refresh)
      setPostFields({ title: '', message: '' })
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  // async function handlePostLike(e) {
  //   try {
  //     if (!getToken()) throw new Error('Please login')
  //     e.preventDefault()
  //     const { status } = await axios.post(`/api/groups/${groupId}/posts/${postId}/likes`, {}, {
  //       headers: {
  //         Authorization: `Bearer ${getToken()}`,
  //       },
  //     })
  //     setLikeStatus(status)
  //     setRefresh(!refresh)
  //   } catch (err) {
  //     setError( err.response.data.message)
  //   }
  // }


  return (
    <Card key={postId} className='post'>
      <hr />
      <Card.Body className='pt-2 pb-0 px-0 px-sm-2 px-lg-4'>
        <div className='d-flex justify-content-between mb-2 mb-sm-3'>
          <div className='d-flex align-items-center d-sm-block'>
            {/* Small screens show profile pic here */}
            <div className="profile-pic icon small me-2 d-sm-none flex-column align-items-center" style={{ backgroundImage: `url(${post.owner.image})` }} alt="profile"></div>
            <div className='d-sm-flex align-items-center justify-content-end'>
              <Card.Title className="username mb-0" >@{post.owner.username}</Card.Title>
              <small>{timeElapsed}</small>
            </div>
          </div>
          <div className='d-flex justify-content-end' style={{ height: '20px' }}>
            {/* If owner show edit & delete */}
            {isOwner(post.owner._id) &&
              <>
                <p title='edit post' className='post-btn' onClick={editPost}>•••</p>
                <p title='delete post' style={{ fontSize: '15px' }} className='post-btn' onClick={deletePost}>🆇</p>
              </>
            }
          </div>
        </div>
        <div className='d-flex flex-column align-items-center justify-content-start flex-sm-row align-items-sm-start' >
          {/* Big screens show profile pic here */}
          <div className="profile-pic icon d-none d-sm-flex flex-column align-items-center" style={{ backgroundImage: `url(${post.owner.image})` }} alt="profile"></div>
          <div className="ms-sm-3" style={{ width: '100%' }}>
            {error && <small className='text-warning'>{error}</small>}
            <div >
              {toEdit ?
                <PostForm postFields={postFields} setPostFields={setPostFields} postError={postError} setPostError={setPostError} handlePostSubmit={handlePostSubmit} />
                :
                <div className="textBox m-0">
                  <Card.Text>{post.text}</Card.Text>
                </div>
              }
            </div>
            <div className='infoBox'>
              <div className='d-flex flex-column flex-sm-row align-items-sm-center' style={{ minHeight: '50px' }}>
                {/* like box
                <div className="d-flex align-items-center justify-content-end" style={{ width: '200px', height: '35px' }} onClick={handlePostLike}>
                  {likeStatus === 204 ?
                    <p className='like-btn' >👍</p>
                    :
                    <p className='like-btn liked'>❤️</p>
                  }
                  <div style={{ width: '160px' }}>
                    <small >
                      {post.likes.length === 0 ? <> Be the first to like</>
                        :
                        post.likes.length === 1 ? <> 1 Like</>
                          :
                          <>{post.likes.length} Likes</>
                      }
                    </small>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Post