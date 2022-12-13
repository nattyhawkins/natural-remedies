import axios from 'axios'
import { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Comment from '../components/Comment'
import CommentForm from '../components/CommentForm'
import { getToken, isAuthenticated, getPayload } from '../helpers/auth'
import { getTimeElapsed, unixTimestamp } from '../helpers/general'
import IndexIngredients from './IndexIngredients'
import IndexRecipes from './IndexRecipes'


const Profile = ({ setShow }) => {
  const [ profile, setProfile ] = useState(null)
  const [ error, setError ] = useState(false)
  const [ refresh, setRefresh ] = useState(false)
  const [ edit, toEdit ] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState('')
  const [ faveRecipes, setFaveRecipes ] = useState(null)
  const [ faveIngredients, setFaveIngredients ] = useState(null)
  const [ benefits, setBenefits ] = useState('')

  useEffect(() => {
    profile && setFaveRecipes(profile.favourites.filter(favourite => favourite.recipe).map(favourite => favourite.recipe))
    profile && setFaveIngredients(profile.favourites.filter(favourite => favourite.active_ingredient).map(favourite => favourite.active_ingredient))
    
  }, [profile])

  useEffect(() => {
    console.log(faveIngredients)
   
  }, [faveIngredients])


  useEffect(() => {
    const getProfile = async () => {
      try {
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
    console.log()
    getProfile()

  }, [refresh])

  return (
    <main className='profile'>
      <Container className='my-5 d-flex flex-column align-items-center flex-md-row align-items-md-start'>
        {profile && 
        <>
          <div className='me-3 dash d-flex flex-column align-items-center'>
            <div className="profile-pic image" style={{ backgroundImage: profile.profile_image ? `url(${profile.profile_image})` : 'url(https://www.labforward.io/wp-content/uploads/2020/12/default-avatar.png)' }} alt="profile"></div>
            <h1>{profile.username}</h1>
            <p>{profile.email}</p>
            <h4 className='text-center mt-3 mb-2'>My Comments</h4>
            <Container className='section py-3'>
              {profile.comments.sort((a, b) => (unixTimestamp(a.created_at) > unixTimestamp(b.created_at) ? -1 : 1)).map(comment => {
                return (
                  <Comment key={comment.id}  commentId={comment.id} comment={comment} setRefresh={setRefresh} refresh={refresh}/>
                )
              })}
            </Container>
          </div>
          <Col className='ms-2'>
            <Row className='text-center mb-4 h-10 d-flex flex-column align-items-center'>
              <h2>Recipes</h2>
              <Row className='collection d-flex groups-row justify-content-start flex-wrap my-3'>
                {profile && faveRecipes && faveRecipes.length > 0 &&
                  <>
                    <IndexRecipes items={faveRecipes} model='recipes' benefits={benefits} setBenefits={setBenefits} setRefresh={setRefresh} refresh={refresh} setShow={setShow}/>
                    <Col className="mb-4 col-12 col-sm-6 col-lg-6 col-xl-4">
                      <Link to={'/'}>
                        <Card className=" pb-0">
                          <Card.Body className='d-flex p-0 align-items-center justify-content-center'>
                            <div className='fs-1'> ＋ </div>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                    
                  </>
                }</Row>
            </Row>
            <Row className='text-center mb-4 h-10 d-flex flex-column align-items-center'>
              <h2>Ingredients</h2>
              <Row className='collection d-flex groups-row justify-content-start flex-wrap my-3'>
                {profile && faveIngredients && faveIngredients.length > 0 &&
                  <IndexIngredients items={faveIngredients} model='active_ingredients' benefits={benefits} setBenefits={setBenefits} setRefresh={setRefresh} refresh={refresh} setShow={setShow}/>}
              </Row>
            </Row>
          </Col>
        </>
        }
        {/* //   const { name, image, id: favouriteId } = favourite.recipe
        //   return (
        //     <Col  md='3' key={favouriteId} className='feature my-2' >
        //       <Link className='text-decoration-none' to={`/${favouriteId}`}>
        //         <Card className='d-flex align-items-center'
        //           style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${image})` }}>
        //           <div className='favourite-name'>{name}</div>
        //         </Card>
        //       </Link>
        //     </Col>
        //   )
        // })} */}
      </Container>
    </main>
  )
}
export default Profile