import { Button, Card, Form } from 'react-bootstrap'

const CommentForm = ({ commentFields, setCommentFields, commentError, setCommentError, handleCommentSubmit }) => {



  function handleChange(e) {
    setCommentFields({ ...commentFields, [e.target.name]: e.target.value })
    if (commentError) setCommentError('')
  }

  return (
    <Form onSubmit={handleCommentSubmit}>
      <Form.Group className="mb-3" controlId="commentInput" >
        {/* <Form.Label>Comments</Form.Label> */}
        <Form.Control as="textarea" rows={3} onChange={handleChange} name='text' value={commentFields.text} placeholder='Write a comment' required/>
        <Button type="submit" className='mt-2'>Submit</Button>
        {commentError && <small className='text-warning'>{commentError}</small>}
      </Form.Group>
    </Form>
  )
}

export default CommentForm