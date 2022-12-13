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
  const [ recModel, setRecModel ] = useState('')
  const [ items, setItems ] = useState([])
  const [ recError, setRecError ] = useState(false)
  const [ benefitFilter, setBenefitFilter ] = useState('&benefit=')
  const [search, setSearch] = useState('&search=')
  const [includes, setIncludes] = useState(null)
  const [ modelLoad, setModelLoad ] = useState(model)

  
  
  useEffect(() => {
    const getItem = async () => {
      try {
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

  useEffect(() => {
    setModelLoad(model)
  }, [items, item])

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
        setRecError(false)
        const { data } = await axios.get(`/api/${recModel}?${search}${benefitFilter}${includes}&/`)
        console.log('recs response-', data)
        setItems(data.slice(0, 3))
      } catch (err) {
        console.log(err.response)
        setRecError(err.response.statusText ? err.response.statusText : 'Something went wrong...')
      }
    }
    console.log('modelo', model)
    console.log('rec model', recModel)
    includes && getItems()
  }, [model, includes])

  // useEffect(() => {
  //   model && setRecModel(() => { 
  //     return model === 'active_ingredients' ? 'recipes' 
  //       : model === 'recipes' ? 'active_ingredients'
  //         : null
  //   })
  //   item && setIncludes(() => {
  //     return model === ? 
  //   }`&includes=${item.name}`)
  // }, [model, item])

  function getIngredientFilters(){
    
  }

  useEffect(() => {
    console.log(items)
    if (item)
      if (model === 'active_ingredients') { 
        setRecModel('recipes')
        setIncludes(`&includes=${item.name}`)
      } else if (model === 'recipes'){
        setRecModel('active_ingredients')
        setIncludes(() => {
          return item.active_ingredients.map(ingredient => `&includes=${ingredient.name}`).join('')
        })
      } else {
        setRecModel(null)
        setIncludes('')
      }
  }, [model, item, items])


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
            {items.length > 0 && item && (model === modelLoad)
              && (modelLoad === 'active_ingredients' ?
                <>
                  <SingleIngredient item={item} favouriteStatus={favouriteStatus} handleFavourite={handleFavourite} setShow={setShow}/>
                  <Row className='collection d-flex groups-row justify-content-start flex-wrap mt-5'>
                    <h4><span className='highlight'>RECOMMENDED  </span> Recipes with {item.name}</h4>
                    <IndexRecipes items={items} model='recipes' benefits={benefits} setBenefits={setBenefits} setRefresh={setRefresh} refresh={refresh} setShow={setShow}/>
                  </Row>
                </>
                : modelLoad === 'recipes' ?
                  <SingleRecipe item={item} favouriteStatus={favouriteStatus} handleFavourite={handleFavourite} setShow={setShow} setRefresh={setRefresh} refresh={refresh}/>
                  :
                  <></>
              )}
            <CommentsSection item={item} items={items} model={model} itemId={itemId} setRefresh={setRefresh} refresh={refresh} setShow={setShow} setTab={setTab} tab={tab} />
          </>
          // <>
          //   {item && item && (model === modelLoad) && (modelLoad === 'active_ingredients' ?
          //     <SingleIngredient item={item} favouriteStatus={favouriteStatus} handleFavourite={handleFavourite} setShow={setShow}/>
          //     :
          //     <SingleRecipe item={item} favouriteStatus={favouriteStatus} handleFavourite={handleFavourite} setShow={setShow}/>
          //   )}
          //   <Row className='collection d-flex groups-row justify-content-start flex-wrap mt-5'>
          //     {items && (model === modelLoad) && items.length > 0 && item &&
          //       (modelLoad === 'active_ingredients' ?
          //         <>
          //           <h4><span className='highlight'>RECOMMENDED  </span> Recipes with {item.name}</h4>
          //           <IndexRecipes items={items} model='recipes' benefits={benefits} setBenefits={setBenefits} setRefresh={setRefresh} refresh={refresh} setShow={setShow}/>
          //         </>
          //         : modelLoad === 'recipes' ?
          //           <>
          //             <h4><span className='highlight'>RECOMMENDED  </span> What&apos;s in {item.name}?</h4>
          //             <IndexIngredients items={items} model='active_ingredients' benefits={benefits} setBenefits={setBenefits} setRefresh={setRefresh} refresh={refresh} setShow={setShow}/>
                      
          //           </>
          //           :
          //           <></>)}
          //   </Row>
          //   <CommentsSection item={item} model={model} itemId={itemId} setRefresh={setRefresh} refresh={refresh} setShow={setShow} setTab={setTab} tab={tab} />
          // </>
        }
      </Container>
    </main>
  )
}
export default SinglePage