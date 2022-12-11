import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Comment from '../components/Comment'
import CommentsSection from '../components/CommentsSection'
import { getToken, isAuthenticated, isOwner } from '../helpers/auth'
import SingleIngredient from './SingleIngredient'
import SingleRecipe from './SingleRecipe'


const SinglePage = () => {
  const [ item, setItem ] = useState(null)
  const [ itemError, setItemError ] = useState(false)
  const [ refresh, setRefresh ] = useState(false)
  const { model, itemId } = useParams()
  const [ modelLoad, setModelLoad ] = useState(model)

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
  // useEffect(() => {
  //   console.log(item)
  //   if (isAuthenticated() && item.favourites && item.favourites.some(member => isOwner(member.owner))) return setFavouriteStatus(200)
  //   setFavouriteStatus(204)
  // }, [item])

  // //submit brand new comment
  // async function handleCommentSubmit(e) {
  //   try {
  //     e.preventDefault()
  //     if (!isAuthenticated()) throw new Error('Please login')
  //     if (commentFields.text.length > 300) throw new Error('Character limit exceeded')
  //     const { data } = await axios.comment('/api/comments/', commentFields, {
  //       headers: {
  //         Authorization: `Bearer ${getToken()}`,
  //       },
  //     })
  //     console.log(data)
  //     setRefresh(!refresh)
  //     setCommentFields({ text: '' })
  //   } catch (err) {
  //     setCommentError(err.message ? err.message : err.response.data.message)
  //   }
  // }

  // async function handleFavourite(e) {
  //   try {
  //     e.preventDefault()
  //     if (!isAuthenticated()) return navigate('/login')
  //     const { status } = await axios.comment('/api/favourites/', {}, {
  //       headers: {
  //         Authorization: `Bearer ${getToken()}`,
  //       },
  //     })
  //     console.log(status)
  //     setFavouriteStatus(status)
  //     setRefresh(!refresh)
  //   } catch (err) {
  //     setItemError(err.message ? err.message : err.response.data.message)
  //   }
  // }


  return (
    <main className='single px-1 px-sm-2'>
      <Container className=''>
        {item && 
          (modelLoad === 'active_ingredients' ?
            <SingleIngredient item={item} />
            :
            <SingleRecipe item={item}  />
          )}
        <CommentsSection item={item} model={model} itemId={itemId} setRefresh={setRefresh} refresh={refresh}/>
      </Container>
    </main>
  )
}
export default SinglePage