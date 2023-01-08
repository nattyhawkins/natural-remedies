import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Comment from '../components/Comment'
import Spinner from '../components/Spinner'
import { getToken } from '../helpers/auth'
import { unixTimestamp } from '../helpers/general'
import ImageUpload from '../components/ImageUpload'
import defaultUser from '../assets/logos2/default-basic.jpeg'
import CardCarousel from '../components/CardCarousel'


const Profile = ({ setShow, setIsHome, setShowAddRecipe }) => {
  const [ profile, setProfile ] = useState(null)
  const [ error, setError ] = useState(false)
  const [ refresh, setRefresh ] = useState(false)
  const [ editProfile, setEditProfile ] = useState(false)
  const [ faveRecipes, setFaveRecipes ] = useState([])
  const [ faveIngredients, setFaveIngredients ] = useState([])
  const [ faveIngredientsGrouped, setFaveIngredientsGrouped ] = useState([])
  const [ faveRecipesGrouped, setFaveRecipesGrouped ] = useState([])
  const [ myRecipesGrouped, setMyRecipesGrouped ] = useState([])
  const [ size, setSize ] = useState(getCarouselSize())
  const [ formFields, setFormFields ] = useState({
    profile_image: '',
  })

  useEffect(() => {
    window.addEventListener('resize', () => {
      setSize(getCarouselSize())
    })
  }, [])

  function getCarouselSize() {
    if (window.innerWidth < 576){
      return 1
    } else if (window.innerWidth < 1200) {
      return 2
    } else {
      return 3
    }
  }

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

  useEffect(() => {
    profile && setFaveRecipes(profile.favourites.filter(favourite => favourite.recipe).map(favourite => favourite.recipe))
    profile && setFaveIngredients(profile.favourites.filter(favourite => favourite.active_ingredient).map(favourite => favourite.active_ingredient))
    // profile && setMyRecipesGrouped(partitionArray(profile.recipes))
  }, [profile])

  useEffect(() => {
    setFaveRecipesGrouped(partitionArray(faveRecipes))
    setFaveIngredientsGrouped(partitionArray(faveIngredients))
    profile && setMyRecipesGrouped(partitionArray(profile.recipes))
  }, [faveRecipes, faveIngredients, size, profile])



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
        <Container className='my-5 p-0 d-flex flex-column align-items-center flex-md-row align-items-md-start'>
          {profile && 
          <>
            <div className='ms-1 me-sm-3 mb-5 dash d-flex flex-column align-items-center '>
              {editProfile &&
                <Form className='d-flex mb-3' onSubmit={handleSubmit} >
                  <Button type='submit my-button' >Submit</Button>
                  <ImageUpload formFields={formFields} setFormFields={setFormFields} imageKey='profile_image'  />
                </Form>
              }
              <div className="profile-pic image d-flex justify-content-end" style={{ backgroundImage: profile.profile_image ? `url(${profile.profile_image})` : `url(${defaultUser})` }} alt="profile">
                <p className='fw-bold fs-5 edit-btn' style={{ height: '10px' }} onClick={() => setEditProfile(!editProfile)}>•••</p>
              </div>
              <h1 className='mt-2'>{profile.username}</h1>
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
                  <p className='mt-2'>You have not left any commments yet</p>}
              </Container>
            </div>

            <Col className='ms-sm-2 px-3 w-100'>
              {/* MY RECIPES */}
              <Row className='text-center pb-sm-5 d-flex flex-column align-items-center ' >
                <div className='d-flex flex-column align-items-center ' >
                  <h2  ><span className='star'>✎</span> My Recipes</h2>
                  <Button className='create' onClick={() => setShowAddRecipe(true)}>+ Create</Button>
                </div>
                <Row className='collection d-flex groups-row justify-content-start flex-wrap px-0 my-0'>
                  {myRecipesGrouped.length > 0 ? 
                    <CardCarousel model='recipes' groups={myRecipesGrouped} refresh={refresh} setRefresh={setRefresh} setShow={setShow}  />
                    :
                    <h5 className='mt-3'>You have not created any recipes yet</h5>}
                </Row>
              </Row>
              
              {/* FAVE RECIPES  */}
              <Row className='text-center my-4 pb-sm-5 d-flex flex-column align-items-center'>
                <h2 className='flex-grow-1 mb-0' ><span className='star'>★</span> Recipes</h2>
                <Row className='collection px-0 d-flex groups-row justify-content-start flex-wrap my-0'>
                  {faveRecipesGrouped.length > 0 ?
                    <CardCarousel model='recipes' groups={faveRecipesGrouped} refresh={refresh} setRefresh={setRefresh} setShow={setShow}  />
                    :
                    <h5 className='mt-3'>Your favourite Recipes will be saved here. <Link to={'/recipes'} className='fw-bold'> Search Recipes now!</Link ></h5>}
                </Row>
              </Row>

              {/* FAVE INGREDIENTS */}
              <Row className='text-center my-sm-5 d-flex flex-column align-items-center'>
                <h2 className='mb-0'><span className='star'>★</span>  Ingredients</h2>
                <Row className='collection px-0 d-flex groups-row justify-content-start flex-wrap my-0'>
                  {faveIngredientsGrouped.length > 0 ? 
                    <CardCarousel model='active_ingredients' groups={faveIngredientsGrouped} refresh={refresh} setRefresh={setRefresh} setShow={setShow}  />
                    :
                    <h5 className='mt-3'>Your favourite Ingredients will be saved here. <Link to={'/active_ingredients'} className='fw-bold'>Search Ingredients now!</Link ></h5>}
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