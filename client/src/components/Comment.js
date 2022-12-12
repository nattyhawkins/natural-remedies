import axios from 'axios'
import { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getToken } from '../helpers/auth'
import { getTimeElapsed } from '../helpers/general'
import NativeComment from './NativeComment'
import ProfileComment from './ProfileComment'



const Comment = ({ commentId, comment, setRefresh, refresh, handleCommentSubmit }) => {

  const [open, setOpen] = useState(false)
  // const [likeStatus, setLikeStatus] = useState(() => {
  //   if (getToken() && comment.likes.some(like => isOwner(like.owner))) return 202
  //   return 204
  // })
  const [timeElapsed, setTimeElapsed] = useState(getTimeElapsed(comment.created_at))
  const [toEdit, setToEdit] = useState(false)
  const [ showConfirm, setShowConfirm ] = useState(false)
  const [commentError, setCommentError] = useState(false)
  const [error, setError] = useState(false)
  const [commentFields, setCommentFields] = useState({
    text: '',
  })

  const { itemId } = useParams()

  //update time since commenting every second
  useEffect(() => {
    console.log(getToken())
    const tick = setInterval(() => {
      setTimeElapsed(getTimeElapsed(comment.created_at))
    }, 1000)
    return () => {
      clearInterval(tick)
    }
  }, [])


  //handle edit comment changes
  async function editComment(e) {
    setToEdit(!toEdit)
    setCommentFields({ ...commentFields, text: comment.text })
  }
  
  //submit edit comment
  async function handleEditSubmit(e) {
    try {
      e.preventDefault()
      if (commentFields.text.length > 300) throw new Error('Character limit exceeded')
      await axios.put(`/api/comments/${commentId}/`, commentFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      setRefresh(!refresh)
      setToEdit(false)
      setCommentFields({ ...commentFields, text: '' })
    } catch (err) {
      console.log(err)
      setCommentError(err.message ? err.message : err.response.data.message)
    }
  }
  //delete comment
  async function deleteComment(e) {
    try {
      e.preventDefault()
      await axios.delete(`/api/comments/${commentId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      setRefresh(!refresh)
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  useEffect(() => {
    console.log(itemId)
  }, [itemId])

  // async function handleCommentLike(e) {
  //   try {
  //     if (!getToken()) throw new Error('Please login')
  //     e.preventDefault()
  //     const { status } = await axios.comment(`/api/groups/${groupId}/comments/${commentId}/likes`, {}, {
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
    comment && (itemId ? 
      <NativeComment comment={comment} timeElapsed={timeElapsed} toEdit={toEdit} commentFields={commentFields} setCommentFields={setCommentFields} commentError={commentError} setCommentError={setCommentError} handleEditSubmit={handleEditSubmit} showConfirm={showConfirm} setShowConfirm={setShowConfirm} deleteComment={deleteComment} editComment={editComment} error={error}  />
      :
      <ProfileComment comment={comment} timeElapsed={timeElapsed} toEdit={toEdit} commentFields={commentFields} setCommentFields={setCommentFields} commentError={commentError} setCommentError={setCommentError} handleEditSubmit={handleEditSubmit} showConfirm={showConfirm} setShowConfirm={setShowConfirm} deleteComment={deleteComment} editComment={editComment} error={error}/>
    )
  )
}

export default Comment