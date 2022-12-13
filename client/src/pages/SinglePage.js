import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AuthModal from '../components/AuthModal'
import Comment from '../components/Comment'
import CommentsSection from '../components/CommentsSection'
import Spinner from '../components/Spinner'
import { getToken, isAuthenticated, isOwner } from '../helpers/auth'
import IndexIngredients from './IndexIngredients'
import IndexRecipes from './IndexRecipes'
import SingleIngredient from './SingleIngredient'
import SingleRecipe from './SingleRecipe'


const SinglePage = ({ setShow }) => {
  const [ item, setItem ] = useState(null)
  const [ itemError, setItemError ] = useState(false)
  const [ refresh, setRefresh ] = useState(false)
  const [tab, setTab] = useState('login')
  const [ favouriteStatus, setFavouriteStatus ] = useState(204)

  const { model, itemId } = useParams()
  //for recs
  const [ benefits, setBenefits ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ recModel, setRecModel ] = useState('')
  const [ items, setItems ] = useState(false)
  const [ recError, setRecError ] = useState(false)
  const [ benefitFilter, setBenefitFilter ] = useState('&benefit=')
  const [search, setSearch] = useState('&search=')
  const [includes, setIncludes] = useState('&includes=Lavender')


  
  
  useEffect(() => {
    const getItem = async () => {
      try {
        console.log('model', model)
        setItemError(false)
        const { data } = await axios.get(`/api/${model}/${itemId}/`)
        console.log(data)
        setItem(data)
      } catch (err) {
        console.log(err.response)
        setItemError(err.message ? err.message : err.response.data.message)
      }
    }
    getItem()
  }, [itemId, model, refresh])

  // check if user is already a member of group on page load
  useEffect(() => {
    console.log(item)
    if (isAuthenticated() && item && item.favourites.some(favourite => isOwner(favourite.owner.id))) return setFavouriteStatus(201)
    setFavouriteStatus(204)
  }, [item])


  async function handleFavourite(e) {
    try {
      e.preventDefault()
      if (!isAuthenticated()) return setShow(true)
      const { status } = await axios.post('/api/favourites/', { 
        'active_ingredient': model === 'active_ingredients' ? itemId[0] : null,
        'recipe': model === 'recipes' ? itemId[0] : null,
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
        console.log('rec model', recModel)
        setRecError(false)
        const { data } = await axios.get(`/api/${recModel}?${search}${benefitFilter}${includes}&/`)
        console.log(data)
        setItems(data.slice(0, 3))
      } catch (err) {
        console.log(err.response)
        setRecError(err.response.statusText ? err.response.statusText : 'Something went wrong...')
      }
    }
    getItems()
  }, [model, filter])

  useEffect(() => {
    model && setRecModel(() => { 
      return model === 'active_ingredients' ? 'recipes' 
        : model === 'recipes' ? 'active_ingredients'
          : null
    })
    item && setIncludes(`&includes=${item.name}`)
  }, [model, item])


  return (
    <main className='single px-1 px-sm-2'>
      <Container style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {itemError ? 
          <div className='text-center'>
            <Spinner />
            <h1>Something went wrong...</h1>
          </div>
          :
          <>
            {item && (model === 'active_ingredients' ?
              <SingleIngredient item={item} favouriteStatus={favouriteStatus} handleFavourite={handleFavourite} setShow={setShow}/>
              :
              <SingleRecipe item={item} favouriteStatus={favouriteStatus} handleFavourite={handleFavourite} setShow={setShow}/>
            )}
            <Row className='collection d-flex groups-row justify-content-start flex-wrap mt-5'>
              {items && items.length > 0 &&
                model === 'active_ingredients' ?
                <>
                  <h4><span className='highlight'>RECOMMENDED  </span> Recipes with {item.name}</h4>
                  <IndexRecipes items={items} model='recipes' benefits={benefits} setBenefits={setBenefits} setRefresh={setRefresh} refresh={refresh} setShow={setShow}/>
                </>
                : model === 'recipes' ?
                  <>
                    <h4><span className='highlight'>RECOMMENDED  </span> More on what&apos;s in {item.name}</h4>
                    <IndexIngredients items={items} model='active_ingredients' benefits={benefits} setBenefits={setBenefits} setRefresh={setRefresh} refresh={refresh} setShow={setShow}/>
                    
                  </>
                  :
                  <></>}
            </Row>
            <CommentsSection item={item} model={model} itemId={itemId} setRefresh={setRefresh} refresh={refresh} setShow={setShow} setTab={setTab} tab={tab} />
          </>
        }
      </Container>
    </main>
  )
}
export default SinglePage