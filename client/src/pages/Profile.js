import axios from 'axios'
import { useEffect, useState } from 'react'
import { Col, Container } from 'react-bootstrap'
import Comment from '../components/Comment'
import CommentForm from '../components/CommentForm'
import { getToken, isAuthenticated, getPayload } from '../helpers/auth'
import { getTimeElapsed, unixTimestamp } from '../helpers/general'


const Profile = () => {
  const [ profile, setProfile ] = useState(null)
  const [ error, setError ] = useState(false)
  const [ refresh, setRefresh ] = useState(false)
  const [ edit, toEdit ] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState('')



  useEffect(() => {
    const getProfile = async () => {
      try {
        console.log(getPayload().sub)
        const { data } = await axios.post('/api/auth/profile/', { 
          'id': getPayload().sub,
        },{
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        console.log(data)
        setProfile(data)
      } catch (err) {
        console.log(err.response)
        setError(err.response.data.message)
      }
    }
    getProfile()

  }, [refresh])

  return (
    <main className='profile'>
      <Container className='my-5 d-flex flex-column flex-md-row'>
        {profile && 
        <>
          <div className='dash d-flex flex-column align-items-center'>
            <div className="profile-pic image" style={{ backgroundImage: profile.profile_image ? `url(${profile.profile_image})` : 'url(https://www.labforward.io/wp-content/uploads/2020/12/default-avatar.png)' }} alt="profile"></div>
            <h1>{profile.username}</h1>
            <p>{profile.email}</p>
            <Container className='my-comments'>
              {profile.comments.sort((a, b) => (unixTimestamp(a.created_at) > unixTimestamp(b.created_at) ? -1 : 1)).map(comment => {
                return (
                  <Comment key={comment.id}  commentId={comment.id} comment={comment} setRefresh={setRefresh} refresh={refresh}/>
                )
              })}
            </Container>
          </div>
          <Col offset={1}>
            <h1>hello</h1>
          </Col>
        </>
        }
      </Container>
    </main>
  )
}
export default Profile