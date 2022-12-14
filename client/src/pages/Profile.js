import axios from 'axios'
import { useEffect, useState } from 'react'
import { Card, Carousel, CarouselItem, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Comment from '../components/Comment'
import CommentForm from '../components/CommentForm'
import Spinner from '../components/Spinner'
import { getToken, isAuthenticated, getPayload } from '../helpers/auth'
import { getTimeElapsed, unixTimestamp } from '../helpers/general'
import IndexIngredients from './IndexIngredients'
import IndexRecipes from './IndexRecipes'
import { v4 as uuid } from 'uuid'


const Profile = ({ setShow, setIsHome }) => {
  const [ profile, setProfile ] = useState(null)
  const [ error, setError ] = useState(false)
  const [ refresh, setRefresh ] = useState(false)
  const [ edit, toEdit ] = useState(false)
  const [ faveRecipes, setFaveRecipes ] = useState([])
  const [ faveIngredients, setFaveIngredients ] = useState([])
  const [ faveIngredientsGrouped, setFaveIngredientsGrouped ] = useState([])
  const [ faveRecipesGrouped, setFaveRecipesGrouped ] = useState([])
  const [ benefits, setBenefits ] = useState('')
  const [ size, setSize ] = useState(getCarouselSize())
  
  function partitionArray(array){
    const groups = []
    if (array.length > 0){
      for (let i = 0; i < array.length; i += size) {
        const group = array.slice(i, i + size)
        groups.push(group)
      }
    }  
    return groups 
  }

  function getCarouselSize() {
    if (window.innerWidth < 576){
      return 1
    } else if (window.innerWidth < 1200) {
      return 2
    } else {
      return 3
    }
  }

  useEffect(() => {
    profile && setFaveRecipes(profile.favourites.filter(favourite => favourite.recipe).map(favourite => favourite.recipe))
    profile && setFaveIngredients(profile.favourites.filter(favourite => favourite.active_ingredient).map(favourite => favourite.active_ingredient))
    
  }, [profile])

  useEffect(() => {
    window.addEventListener('resize', () => {
      console.log(window.innerWidth)
      setSize(getCarouselSize())
    })
  }, [])

  useEffect(() => {
    setFaveRecipesGrouped(partitionArray(faveRecipes))
  }, [faveRecipes, size])

  useEffect(() => {
    setFaveIngredientsGrouped(partitionArray(faveIngredients))
  }, [faveIngredients, size])



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
        setError(err.response.data.message ? err.response.data.message : err.response.statusText)
      }
    }
    setIsHome(false)
    console.log()
    getProfile()

  }, [refresh])

  return (
    error ? 
      <div className='text-center'>
        <Spinner />
        <h1>Something went wrong...</h1>
      </div>
      :
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
                <h2>★ Recipes</h2>
                <Row className='collection d-flex groups-row justify-content-start flex-wrap my-3'>
                  <Carousel interval={null} variant="dark" >
                    {faveRecipesGrouped.length > 0 && faveRecipesGrouped.map(group => {
                      return (
                        <Carousel.Item key={uuid()} >
                          <Carousel.Caption  className='d-flex'>
                            <IndexRecipes items={group} model='active_ingredients' benefits={benefits} setBenefits={setBenefits} setRefresh={setRefresh} refresh={refresh} setShow={setShow}/>

                          </Carousel.Caption>
                        </Carousel.Item>
                      )
                    })}
                  </Carousel>
                  {/* {profile && faveRecipes && faveRecipes.length > 0 &&
                    <>
                      <IndexRecipes items={faveRecipes} model='recipes' benefits={benefits} setBenefits={setBenefits} setRefresh={setRefresh} refresh={refresh} setShow={setShow}/>
                      {/* Extra PLUS Card */}
                  {/* <Col className="mb-4 col-12 col-sm-6 col-lg-6 col-xl-4">
                        <Link to={'/recipes'}>
                          <Card className=" pb-0">
                            <Card.Body className='d-flex p-0 align-items-center justify-content-center'>
                              <div className='fs-1'> ＋ </div>
                            </Card.Body>
                          </Card>
                        </Link>
                      </Col>
                    </>} */} 
                </Row>
              </Row>
              {/* <Row className='text-center mb-4 h-10 d-flex flex-column align-items-center'>
                <h2>★ Ingredients</h2>
                <Row className='collection d-flex groups-row justify-content-start flex-wrap my-3'>
                  {profile && faveIngredients && faveIngredients.length > 0 &&
                    <IndexIngredients items={faveIngredients} model='active_ingredients' benefits={benefits} setBenefits={setBenefits} setRefresh={setRefresh} refresh={refresh} setShow={setShow}/>}
                </Row>
              </Row> */}
              <Row className='text-center mb-4 h-10 d-flex flex-column align-items-center'>
                <h2>★ Ingredients</h2>
                <Row className='collection d-flex groups-row justify-content-start flex-wrap my-3'>
                  <Carousel interval={null} variant="dark" >
                    {faveIngredientsGrouped.length > 0 && faveIngredientsGrouped.map(group => {
                      return (
                        <Carousel.Item key={uuid()} >
                          <Carousel.Caption  className='d-flex'>
                            <IndexIngredients items={group} model='active_ingredients' benefits={benefits} setBenefits={setBenefits} setRefresh={setRefresh} refresh={refresh} setShow={setShow}/>

                          </Carousel.Caption>
                        </Carousel.Item>
                      )
                    })}
                  </Carousel>
                </Row>
              </Row>
            </Col>
          </>
          }
        </Container>
      </main>
  )
}
export default Profile