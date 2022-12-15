import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Card, Carousel, CarouselItem, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Comment from '../components/Comment'
import CommentForm from '../components/CommentForm'
import Spinner from '../components/Spinner'
import { getToken, isAuthenticated, getPayload } from '../helpers/auth'
import { getTimeElapsed, unixTimestamp } from '../helpers/general'
import IndexIngredients from './IndexIngredients'
import IndexRecipes from './IndexRecipes'
import { v4 as uuid } from 'uuid'
import ImageUpload from '../components/ImageUpload'
import defaultBean from '../assets/logos2/def-orange.png'


const Profile = ({ setShow, setIsHome }) => {
  const [ profile, setProfile ] = useState(null)
  const [ error, setError ] = useState(false)
  const [ refresh, setRefresh ] = useState(false)
  const [ editProfile, setEditProfile ] = useState(false)
  const [ faveRecipes, setFaveRecipes ] = useState([])
  const [ faveIngredients, setFaveIngredients ] = useState([])
  const [ faveIngredientsGrouped, setFaveIngredientsGrouped ] = useState([])
  const [ faveRecipesGrouped, setFaveRecipesGrouped ] = useState([])
  const [ benefits, setBenefits ] = useState('')
  const [ size, setSize ] = useState(getCarouselSize())
  const [ formFields, setFormFields ] = useState({
    profile_image: '',
  })

  
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

  //get profile
  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get('/api/auth/profile/',{
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

  //submit profile update
  async function handleSubmit(e) {
    try {
      e.preventDefault()
      const res = await axios.put('/api/auth/profile/', formFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(res)
      setFormFields({ profile_image: '' })
      setRefresh(!refresh)
      setEditProfile(false)
    } catch (err) {
      console.log(err)
      setError(err.response.data.message ? err.response.data.message : err.response.statusText)
    }
  }

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
              {editProfile &&
                <Form className='d-flex mb-3' onSubmit={handleSubmit} >
                  <Button type='submit my-button' >Submit</Button>
                  <ImageUpload formFields={formFields} setFormFields={setFormFields} imageKey='profile_image' />
                </Form>
              }
              <div className="profile-pic image d-flex justify-content-end" style={{ backgroundImage: profile.profile_image ? `url(${profile.profile_image})` : `url(${defaultBean})` }} alt="profile">
                <p className='fw-bold fs-5 edit-btn' style={{ height: '10px' }} onClick={() => setEditProfile(!editProfile)}>•••</p>
              </div>
              <h1>{profile.username}</h1>
              <p>{profile.email}</p>
              <h4 className='text-center mt-3 mb-2'>My Comments</h4>
              <Container className='section py-3'>
                {profile.comments.length > 0 ? 
                  profile.comments.sort((a, b) => (unixTimestamp(a.created_at) > unixTimestamp(b.created_at) ? -1 : 1)).map(comment => {
                    return (
                      <Comment key={comment.id}  commentId={comment.id} comment={comment} setRefresh={setRefresh} refresh={refresh}/>
                    )
                  })
                  :
                  <p>You have not left any commments yet</p>}
              </Container>
            </div>
            <Col className='ms-2'>
              <Row className='text-center mb-4 h-10 d-flex flex-column align-items-center'>
                <h2><span className='star'>★</span> Recipes</h2>
                <Row className='collection d-flex groups-row justify-content-start flex-wrap my-3'>
                  {faveRecipesGrouped.length > 0 ?
                    <Carousel interval={null} variant="dark" >
                      {faveRecipesGrouped.map(group => {
                        return (
                          <Carousel.Item key={uuid()} >
                            <Carousel.Caption  className='d-flex'>
                              <IndexRecipes items={group} model='active_ingredients' benefits={benefits} setBenefits={setBenefits} setRefresh={setRefresh} refresh={refresh} setShow={setShow}/>

                            </Carousel.Caption>
                          </Carousel.Item>
                        )
                      })}
                    </Carousel>
                    :
                    <h5>You&apos;re favourite Recipes will be saved here. <Link to={'/recipes'} className='fw-bold'> Search Recipes now!</Link ></h5>}
                </Row>
              </Row>
              <Row className='text-center mb-4 h-10 d-flex flex-column align-items-center'>
                <h2><span className='star'>★</span>  Ingredients</h2>
                <Row className='collection d-flex groups-row justify-content-start flex-wrap my-3'>
                  {faveIngredientsGrouped.length > 0 ? 
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
                    :
                    <h5>You&apos;re favourite Ingredients will be saved here. <Link to={'/active_ingredients'} className='fw-bold'>Search Ingredients now!</Link ></h5>}

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