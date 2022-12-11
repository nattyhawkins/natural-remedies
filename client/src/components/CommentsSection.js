import axios from 'axios'
import { useState } from 'react'
import { Row } from 'react-bootstrap'
import { getToken, isAuthenticated } from '../helpers/auth'
import { unixTimestamp } from '../helpers/general'
import PostForm from './PostForm'

const CommentsSection = ({ model, itemId }) => {

  const [postError, setPostError] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [toEdit, setToEdit] = useState(false)
  const [postFields, setPostFields] = useState({
    text: '',
  })
  const [memberStatus, setMemberStatus] = useState(204)

  //submit brand new post
  async function handlePostSubmit(e) {
    try {
      e.preventDefault()
      if (!isAuthenticated()) throw new Error('Please login')
      if (postFields.text.length > 300) throw new Error('Character limit exceeded')
      const { data } = await axios.post('api/comments/', postFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(data)
      setRefresh(!refresh)
      setPostFields({ text: '' })
    } catch (err) {
      setPostError(err.message ? err.message : err.response.data.message)
    }
  }
  

  return (
    <Row>
      <PostForm postFields={postFields} setPostFields={setPostFields} postError={postError} setPostError={postError} handlePostSubmit={handlePostSubmit}  />
      {/* {{model}.posts && {model}.posts.sort((a, b) => (unixTimestamp(a.createdAt) > unixTimestamp(b.createdAt) ? -1 : 1)).map(post => {
        const { _id: postId, comments } = post
        const commentHTML = comments.sort((a, b) => (unixTimestamp(a.createdAt) > unixTimestamp(b.createdAt) ? -1 : 1)).map(comment => {
          const { _id: commentId } = comment
          return (
            <Comments key={commentId} comment={comment} itemId={itemId} postId={postId} setRefresh={setRefresh} refresh={refresh} />
          )
        })
        return (
          <Post key={postId} postId={postId} post={post} commentHTML={commentHTML} itemId={itemId} setRefresh={setRefresh} refresh={refresh} />
        )
      })} */}
    </Row>
  )
}
export default CommentsSection