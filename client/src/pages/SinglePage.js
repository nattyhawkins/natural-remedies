import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AuthModal from '../components/AuthModal'
import Comment from '../components/Comment'
import CommentsSection from '../components/CommentsSection'
import { getToken, isAuthenticated, isOwner } from '../helpers/auth'
import SingleIngredient from './SingleIngredient'
import SingleRecipe from './SingleRecipe'


const SinglePage = ({ setShow }) => {
  const [ item, setItem ] = useState(null)
  const [ itemError, setItemError ] = useState(false)
  const [ refresh, setRefresh ] = useState(false)
  const { model, itemId } = useParams()
  // const [ modelLoad, setModelLoad ] = useState(model)
  const [tab, setTab] = useState('login')
  const [ favouriteStatus, setFavouriteStatus ] = useState(204)

  useEffect(() => {

    const getItem = async () => {
      try {
        console.log('model', model)
        setItemError(false)
        const { data } = await axios.get(`/api/${model}/${itemId}/`)
        console.log(data)
        setItem(data)
      } catch (err) {
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


  return (
    <main className='single px-1 px-sm-2'>
      <Container style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {item && 
          (model === 'active_ingredients' ?
            <SingleIngredient item={item} favouriteStatus={favouriteStatus} handleFavourite={handleFavourite} setShow={setShow}/>
            :
            <SingleRecipe item={item} favouriteStatus={favouriteStatus} handleFavourite={handleFavourite} setShow={setShow}/>
          )}
        <CommentsSection item={item} model={model} itemId={itemId} setRefresh={setRefresh} refresh={refresh} setShow={setShow} setTab={setTab} tab={tab} />
      </Container>
    </main>
  )
}
export default SinglePage