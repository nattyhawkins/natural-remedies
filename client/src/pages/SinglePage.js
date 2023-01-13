import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import CommentsSection from '../components/CommentsSection'
import Spinner from '../components/Spinner'
import { getToken, isAuthenticated, isOwner } from '../helpers/auth'
import IndexRecipes from './IndexRecipes'
import SingleIngredient from './SingleIngredient'
import SingleRecipe from './SingleRecipe'


const SinglePage = ({ setShow, setIsHome, setShowAddRecipe }) => {
  const [ item, setItem ] = useState(null)
  const [ itemError, setItemError ] = useState(false)
  const [ refresh, setRefresh ] = useState(false)
  const [tab, setTab] = useState('login')
  const [ favouriteStatus, setFavouriteStatus ] = useState(204)

  const { model, itemId } = useParams()
  //for recs
  const [ recModel, setRecModel ] = useState('')
  const [ items, setItems ] = useState([])
  const [ recError, setRecError ] = useState(false)
  const [ benefits, setBenefits ] = useState('')  //this is a placeholder to satisfy indexRecipe/ingredient props
  const [includes, setIncludes] = useState(null)
  const [ modelLoad, setModelLoad ] = useState(model)
  const [ recLoad, setRecLoad ] = useState(recModel)

  
  
  useEffect(() => {
    const getItem = async () => {
      try {
        setItemError(false)
        const { data } = await axios.get(`/api/${model}/${itemId}/`)
        setItem(data)
        console.log(data)
      } catch (err) {
        console.log(err.response)
        setItemError(err.message ? err.message : err.response.data.message)
      }
    }
    console.log(model, itemId)
    setIsHome(false)
    getItem()
  }, [itemId, model, refresh])

  useEffect(() => {
    setModelLoad(model)
  }, [item])


  // check if user is already a member of group on page load
  useEffect(() => {
    if (isAuthenticated() && item && item.favourites.some(favourite => isOwner(favourite.owner.id))) return setFavouriteStatus(201)
    setFavouriteStatus(204)
  }, [item])


  async function handleFavourite(e) {
    try {
      e.preventDefault()
      if (!isAuthenticated()) return setShow(true)
      console.log(itemId[0])
      const { status } = await axios.post('/api/favourites/', { 
        'active_ingredient': model === 'active_ingredients' ? itemId : null,
        'recipe': model === 'recipes' ? itemId : null,
      }, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      setFavouriteStatus(status)
      setRefresh(!refresh)
    } catch (err) {
      console.log(err.response)
      setItemError(err.message ? err.message : err.response.data.message)
    }
  }

  // get recommendation
  useEffect(() => {
    const getItems = async () => {
      try {
        setRecError(false)
        const { data } = await axios.get(`/api/${recModel}/?&search=&benefit=${includes}&/`)
        setItems(data.slice(0, 3))
      } catch (err) {
        console.log(err.response)
        setRecError(err.response.statusText ? err.response.statusText : 'Something went wrong...')
      }
    }
    includes && getItems()
  }, [recModel, includes])


  //set recModel state to oppose model
  useEffect(() => {
    if (item)
      if (model === 'active_ingredients') { 
        setRecModel('recipes')
      } else if (model === 'recipes'){
        setRecModel('active_ingredients')
      } else {
        setRecModel(null)
        setIncludes('')
      }
  }, [model, item, items])

  //set the reccomendation request parameter 'includes' depending on recModel
  useEffect(() => {
    if (item)
      if (model === 'active_ingredients') {       
        setIncludes(`&includes=${item.name}`)
      } else if (model === 'recipes'){
        setIncludes(() => {
          return item.active_ingredients.map(ingredient => `&includes=${ingredient.name}`).join('')
        })
      } else {
        setIncludes('')
      }
  }, [item])

  useEffect(() => {
    setRecLoad(recModel)
  }, [items])

  return (
    <main className='single px-sm-2'>
      <Container style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {itemError ? 
          <div className='text-center'>
            <Spinner />
            <h1>Something went wrong...</h1>
          </div>
          :
          <>
            {items.length > 0 && item && (model === modelLoad) && (recModel === recLoad)
              && (modelLoad === 'active_ingredients' ?
                <>
                  <SingleIngredient item={item} favouriteStatus={favouriteStatus} handleFavourite={handleFavourite} setShow={setShow}/>
                  {!recError && 
                  <Row className='collection d-flex groups-row justify-content-start flex-wrap mt-5'>
                    <h4><span className='highlight'>RECOMMENDED  </span> Recipes with {item.name}</h4>
                    <IndexRecipes items={items} model='recipes' benefits={benefits} setBenefits={setBenefits} 
                      setRefresh={setRefresh} refresh={refresh} setShow={setShow}/>
                  </Row>
                  }
                </>
                : modelLoad === 'recipes' ?
                  <SingleRecipe item={item} items={items} setShowAddRecipe={setShowAddRecipe} recError={recError} 
                    favouriteStatus={favouriteStatus} handleFavourite={handleFavourite} setShow={setShow} setRefresh={setRefresh} 
                    refresh={refresh} benefits={benefits} setBenefits={setBenefits}/>
                  :
                  <></>
              )}
            <CommentsSection item={item} items={items} model={model} itemId={itemId} setRefresh={setRefresh} refresh={refresh} setShow={setShow} setTab={setTab} tab={tab} />
          </>
        }
      </Container>
    </main>
  )
}
export default SinglePage