import axios from 'axios'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { getToken, isAuthenticated } from '../helpers/auth'
import { unixTimestamp } from '../helpers/general'
import Comment from './Comment'
import CommentForm from './CommentForm'

const CommentsSection = ({ item, model, itemId, setRefresh, refresh }) => {

  const [commentError, setCommentError] = useState(false)
  const [toEdit, setToEdit] = useState(false)
  const [commentFields, setCommentFields] = useState({
    text: '',
    [model.slice(0, -1)]: [itemId][0],
  })
  const [memberStatus, setMemberStatus] = useState(204)

  //submit brand new comment
  async function handleCommentSubmit(e) {
    try {
      e.preventDefault()
      if (!isAuthenticated()) throw new Error('Please login')
      if (commentFields.text.length > 300) throw new Error('Character limit exceeded')
      console.log(commentFields)
      const { data } = await axios.post('/api/comments/', commentFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(data)
      setRefresh(!refresh)
      setCommentFields({ ...commentFields, text: '' })
    } catch (err) {
      setCommentError(err.message ? err.message : err.response.data.message)
    }
  }
  useEffect(() => {
    console.log(commentFields)
   
  }, [])

  return (
    <Row className='mb-5'>
      <Col md={{ span: 10, offset: 1 }}>
        <CommentForm commentFields={commentFields} setCommentFields={setCommentFields} commentError={commentError} setCommentError={commentError} handleCommentSubmit={handleCommentSubmit}  />
        {item && item.comments && item.comments.sort((a, b) => (unixTimestamp(a.created_at) > unixTimestamp(b.created_at) ? -1 : 1)).map(comment => {
          const { id: commentId } = comment
          return (
            <Comment key={commentId} commentId={commentId} comment={comment} setRefresh={setRefresh} refresh={refresh} />
          )
        })}
      </Col>
    </Row>
  )
}
export default CommentsSection