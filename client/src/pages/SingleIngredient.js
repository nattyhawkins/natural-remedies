import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getToken, isAuthenticated, isOwner } from '../helpers/auth'


const SingleIngredient = () => {
  const [ ingredient, setIngredient ] = useState(null)
  const [ ingredientError, setIngredientError ] = useState(false)
  const [ postError, setPostError ] = useState(false)
  const [ refresh, setRefresh ] = useState(false)
  const [ toEdit, setToEdit ] = useState(false)
  const [ postFields, setPostFields ] = useState({
    text: '',
  })
  const [ favouriteStatus, setFavouriteStatus ] = useState(204)

  const { ingredientId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getIngredient = async () => {
      try {
        const { data } = await axios.get(`/api/active_ingredients/${ingredientId}`)
        setIngredient(data)
      } catch (err) {
        setIngredientError(err.message ? err.message : err.response.data.message)
      }
    }
    getIngredient()
  }, [ingredientId, refresh])

  // check if user is already a member of group on page load
  // useEffect(() => {
  //   console.log(ingredient)
  //   if (isAuthenticated() && ingredient.favourites && ingredient.favourites.some(member => isOwner(member.owner))) return setFavouriteStatus(200)
  //   setFavouriteStatus(204)
  // }, [ingredient])

  //submit brand new post
  async function handlePostSubmit(e) {
    try {
      e.preventDefault()
      if (!isAuthenticated()) throw new Error('Please login')
      if (postFields.text.length > 300) throw new Error('Character limit exceeded')
      const { data } = await axios.post('/api/comments/', postFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(data)
      setRefresh(!refresh)
      setPostFields({ text: '' })
    } catch (err) {
      setPostError(err.message ? err.message : err.response.data.message)
    }
  }

  // async function handleFavourite(e) {
  //   try {
  //     e.preventDefault()
  //     if (!isAuthenticated()) return navigate('/login')
  //     const { status } = await axios.post('/api/favourites/', {}, {
  //       headers: {
  //         Authorization: `Bearer ${getToken()}`,
  //       },
  //     })
  //     console.log(status)
  //     setFavouriteStatus(status)
  //     setRefresh(!refresh)
  //   } catch (err) {
  //     setIngredientError(err.message ? err.message : err.response.data.message)
  //   }
  // }


  return (
    <main className='single-ingredient'>
      <h1>single ing</h1>
    </main>
  )
}
export default SingleIngredient