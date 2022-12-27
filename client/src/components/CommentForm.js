import { Button, Form } from 'react-bootstrap'

const CommentForm = ({ commentFields, setCommentFields, commentError, setCommentError, handleCommentSubmit }) => {

  function handleChange(e) {
    setCommentFields({ ...commentFields, [e.target.name]: e.target.value })
    if (commentError) setCommentError('')
  }

  return (
    <Form onSubmit={handleCommentSubmit}>
      <Form.Group className="comment-form d-flex flex-column align-items-end" controlId="commentInput" >
        {/* <Form.Label>Comments</Form.Label> */}
        <Form.Control as="textarea" rows={3} onChange={handleChange} name='text' value={commentFields.text} placeholder='Write a comment' required/>
        <div className='w-100 d-sm-flex justify-content-between'>
          {commentError && <small className='text-danger'>{commentError}</small>}
          <div></div>
          <Button type="submit" className='mt-2 '>Submit</Button>
        </div>
      </Form.Group>
    </Form>
  )
}

export default CommentForm