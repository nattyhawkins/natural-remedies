import axios from 'axios'
import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import EditButtons from '../components/EditButtons'
import Favourite from '../components/Favourite'
import { getToken, isOwner } from '../helpers/auth'
import IndexIngredients from './IndexIngredients'
const SingleRecipe = ({ item, favouriteStatus, handleFavourite, items, setRefresh, refresh, setShow, setBenefits, benefits, recError, setShowAddRecipe }) => {
  const [ benefitHTML, setBenefitHTML ] = useState([])
  const [ showConfirm, setShowConfirm ] = useState(false)
  // const [ editRecipe, setEditRecipe ] = useState(false)
  const [ recipeError, setRecipeError ] = useState('')
  const [ recipeFields, setRecipeFields ] = useState({
    name: '',
    image: '',
    description: '',
    active_ingredients: [],
    inventory: '',
    steps: '',
    mediums: [],
  })
  const navigate = useNavigate()


  useEffect(() => {
    const list = []
    item.active_ingredients.forEach(ingredient => {
      return ingredient.benefits.forEach(benefit => {
        if (!list.includes(benefit.name)){
          list.push(benefit.name)
        }
      })
    })
    setBenefitHTML(list)
  }, [item])

  useEffect(() => {
    console.log(item.id)
  }, [item])

  //handle edit comment changes
  async function handleEditRecipe(e) {
    setShowAddRecipe(true)
    setRecipeFields({ ...recipeFields, 
      name: item.name,
      image: item.image,
      description: item.description,
      active_ingredients: item.active_ingredients,
      inventory: item.inventory,
      steps: item.steps,
      mediums: [],
    })
  }

  //submit edit own recipe
  async function handleEditSubmit(e) {
    try {
      e.preventDefault()
      if (recipeFields.text.length > 300) throw new Error('Character limit exceeded')
      await axios.put(`/api/recipes/${item.id}/`, recipeFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      setRefresh(!refresh)
      setShowAddRecipe(false)
      setRecipeFields({
        name: '',
        image: '',
        description: '',
        active_ingredients: [],
        inventory: '',
        steps: '',
        mediums: [],
      })
    } catch (err) {
      console.log(err)
      setRecipeError(err.response.data.detail ? err.response.data.detail : err.response.statusText)
    }
  }

  //delete own recipe
  async function handleDeleteRecipe(e) {
    try {
      e.preventDefault()
      await axios.delete(`/api/comments/${item.id}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate('/profile')
    } catch (err) {
      setRecipeError(err.response.data.detail ? err.response.data.detail : err.response.statusText)
    }
  }


  return (
    <>
      <Row className='main d-flex flex-column flex-md-row p-0 my-5'>
        <Col className='img-single image flex-grow-1 d-none d-md-flex align-items-end' style={{ backgroundImage: `url(${item.image})` }}>
          <Favourite handleFavourite={handleFavourite} favouriteStatus={favouriteStatus} item={item}  />
        </Col>
        <Col className='p-3'>
          <div className='d-flex justify-content-between'>
            <h1 className='text-center text-md-start'>{item.name}</h1>
            <div className='d-flex fs-5'>
              {isOwner(item.owner.id) &&
                <EditButtons editComment={handleEditRecipe} showConfirm={showConfirm} setShowConfirm={setShowConfirm} deleteComment={handleDeleteRecipe}  />
              }</div>
          </div>
          <Row className='d-flex img-single image w-100 my-2 d-md-none align-items-end' style={{ backgroundImage: `url(${item.image})`, borderRadius: '15px', color: 'white' }}>
            <Favourite handleFavourite={handleFavourite} favouriteStatus={favouriteStatus} item={item}  />
          </Row> 
          <p>{item.description}</p>
          <div className='d-flex justify-content-evenly'>
            {benefitHTML.length > 0 && benefitHTML.map(benefit => {
              return (
                <Link to={`/recipes/?benefit=${benefit}`} key={benefit}>
                  <p key={benefit} className='my-0 fw-bold benefit-small'>{benefit}</p> 
                </Link>
              )
            })}
          </div>
        </Col>
      </Row>
      {!recError &&
      <Row className='collection d-flex groups-row justify-content-start flex-wrap mt-5'>
        <h4><span className='highlight'>RECOMMENDED  </span> What&apos;s in it?</h4>
        {items && items.length > 0 && 
          <IndexIngredients items={items} model='active_ingredients' benefits={benefits} setBenefits={setBenefits} setRefresh={setRefresh} refresh={refresh} setShow={setShow}/>
        }
      </Row>}
      <Row>
        <h3>You will need:</h3>
        <p className='ps-3'>{item.inventory}</p>
        <h3 className='mt-2'>Method:</h3>
        <p>{item.steps}</p>
      </Row>
    </>
  )
}

export default SingleRecipe