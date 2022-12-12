import axios from 'axios'
import { useEffect, useState } from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getToken, isAuthenticated, isOwner } from '../helpers/auth'
import Favourite from './Favourite'

const IndexCard = ({ id, model, benefitHTML, image, name, item, setRefresh, refresh, setShow }) => {
  const [ faveError, setFaveError ] = useState(false)
  const [ favouriteStatus, setFavouriteStatus ] = useState(204)

  async function handleFavourite(e) {
    setFaveError('')
    try {
      e.preventDefault()
      if (!isAuthenticated()) return setShow(true)
      const { status } = await axios.post('/api/favourites/', { 
        'active_ingredient': model === 'active_ingredients' ? item.id : null,
        'recipe': model === 'recipes' ? item.id : null,
      }, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(status)
      setFavouriteStatus(status)
      setRefresh(!refresh)
    } catch (err) {
      console.log(err.response)
      setFaveError(err.response.statusText ? err.response.statusText : 'Something went wrong...')
    }
  }

  useEffect(() => {
    console.log(item)
    if (isAuthenticated() && item && item.favourites.some(favourite => isOwner(favourite.owner))) return setFavouriteStatus(201)
    setFavouriteStatus(204)
  }, [item])

  return (
    <Col className="mb-4 col-12 col-sm-6 col-lg-6 col-xl-4">
      <Link to={`/${model}/${id}`}>
        <Card className="index-card image pb-0" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5)), url(${image})` }}>
          <Card.Body className='d-flex p-0 flex-column justify-content-end'>
            <div className='align-self-end index-detail'>{benefitHTML}</div>
            <div className='d-flex justify-content-between align-items-end'>
              <Favourite handleFavourite={handleFavourite} favouriteStatus={favouriteStatus} item={item} faveError={faveError} />
              <Card.Title className='mb-0 text-end'>{name}</Card.Title>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </Col>

  )
}
  

export default IndexCard