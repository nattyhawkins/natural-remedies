import axios from 'axios'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { getToken, isAuthenticated } from '../helpers/auth'
import { unixTimestamp } from '../helpers/general'
import AuthModal from './AuthModal'
import Comment from './Comment'
import CommentForm from './CommentForm'

const CommentsSection = ({ item, model, itemId, setRefresh, refresh }) => {
  const [show, setShow] = useState(false)
  const [tab, setTab] = useState('login')
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
      if (!isAuthenticated()) return setShow(true)
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


  return (
    <Row className='my-4 '>
      <Col style={{ maxWidth: '800px', margin: '0 auto' }}>
        <CommentForm commentFields={commentFields} setCommentFields={setCommentFields} commentError={commentError} setCommentError={setCommentError} handleCommentSubmit={handleCommentSubmit}  />
        {item && item.comments && item.comments.sort((a, b) => (unixTimestamp(a.created_at) > unixTimestamp(b.created_at) ? -1 : 1)).map(comment => {
          const { id: commentId } = comment
          return (
            <Comment key={commentId} commentId={commentId} comment={comment} setRefresh={setRefresh} refresh={refresh} />
          )
        })}
        <AuthModal show={show} setShow={setShow} tab={tab} setTab={setTab}/>
      </Col>
    </Row>
  )
}
export default CommentsSection