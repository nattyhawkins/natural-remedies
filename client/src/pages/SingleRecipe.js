import axios from 'axios'
import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import AddRecipe from '../components/AddRecipe'
import EditButtons from '../components/EditButtons'
import Favourite from '../components/Favourite'
import { getToken, isOwner } from '../helpers/auth'
import IndexIngredients from './IndexIngredients'

const SingleRecipe = ({ item, favouriteStatus, handleFavourite, items, setRefresh, refresh, setShow, setBenefits, benefits, recError }) => {
  const [ benefitHTML, setBenefitHTML ] = useState([])
  const [ showConfirm, setShowConfirm ] = useState(false)
  // const [ editRecipe, setEditRecipe ] = useState(false)
  const [ showAddRecipe, setShowAddRecipe ] = useState(false)
  const [ recipeError, setRecipeError ] = useState('')
  const [ recipeFields, setRecipeFields ] = useState({
    name: '',
    description: '',
    inventory: '',
    steps: '',
    mediums: [],
  })
  const navigate = useNavigate()

  //get benefit htmls from single recipe
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




  //handle edit comment changes
  async function handleEditRecipe(e) {
    console.log('item', item)
    setShowAddRecipe(true)
    setRecipeFields({ ...recipeFields, 
      name: item.name,
      description: item.description,
      image: item.image,
      // active_ingredients: item.active_ingredients,
      inventory: item.inventory,
      steps: item.steps,
      mediums: [],
    })
  }

  useEffect(() => {
    console.log(recipeFields)
  }, [recipeFields])

  //submit edit own recipe
  async function handleRecipeSubmit(e) {
    try {
      e.preventDefault()
      console.log('fields', recipeFields)
      if (recipeFields.image === '') throw new Error('Add an image to upload')
      if (recipeFields.active_ingredients && recipeFields.active_ingredients.length === 0) throw new Error('Please add at least 1 featured ingredient')
      await axios.put(`/api/recipes/${item.id}/`, recipeFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      setRefresh(!refresh)
      setShowAddRecipe(false)
      setRecipeFields({
        name: '',
        // image: '',
        description: '',
        inventory: '',
        steps: '',
        mediums: [],
      })
    } catch (err) {
      console.log(err)
      setRecipeError(err.message ? err.message : err.response.statusText)
    }
  }

  //delete own recipe
  async function handleDeleteRecipe(e) {
    try {
      e.preventDefault()
      await axios.delete(`/api/recipes/${item.id}/`, {
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
          <div className='d-flex justify-content-center justify-content-md-between'>
            <h1 className='text-center text-md-start'>{item.name}</h1>
            <div className='d-flex fs-5'>
              {isOwner(item.owner.id) &&
                <>
                  <EditButtons editComment={handleEditRecipe} showConfirm={showConfirm} setShowConfirm={setShowConfirm} deleteComment={handleDeleteRecipe}  />
                  <AddRecipe showAddRecipe={showAddRecipe} setShowAddRecipe={setShowAddRecipe} setFormFields={setRecipeFields} formFields={recipeFields} error={recipeError} setError={setRecipeError} handleRecipeSubmit={handleRecipeSubmit}/>
                </>
              }</div>
          </div>
          <Row className='d-flex img-single image w-100 my-2 d-md-none align-items-end' style={{ backgroundImage: `url(${item.image})`, borderRadius: '15px', color: 'white' }}>
            <Favourite handleFavourite={handleFavourite} favouriteStatus={favouriteStatus} item={item}  />
          </Row> 
          <p>{item.description}</p>
          <div className='d-flex flex-wrap justify-content-evenly' >
            {benefitHTML.length > 0 && benefitHTML.map(benefit => {
              return (
                <Link to={`/recipes/?benefit=${benefit}`} key={benefit}>
                  <p key={benefit} className='my-2 mx-3 fw-bold benefit-small'>{benefit}</p> 
                </Link>
              )
            })}
          </div>
        </Col>
      </Row>
      {!recError &&
      <Row className='collection d-flex groups-row justify-content-start flex-wrap mt-5'>
        <h4 className='d-flex flex-wrap align-items-end'><span className='highlight me-2'>RECOMMENDED  </span> What&apos;s in it?</h4>
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