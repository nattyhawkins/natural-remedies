import { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import Favourite from '../components/Favourite'
import { isAuthenticated, isOwner } from '../helpers/auth'

const SingleIngredient = ({ item, favouriteStatus, handleFavourite }) => {
  

  return (
    <>
      <Row className='main d-flex flex-column flex-md-row p-0 my-5'>
        <Col className='image img-single flex-grow-1 d-none d-md-flex align-items-end' style={{ backgroundImage: `url(${item.image})` }}>
          <Favourite handleFavourite={handleFavourite} favouriteStatus={favouriteStatus} item={item}  />
        </Col>
        <Col className='flex-grow-1 p-3'>
          <div className='d-flex justify-content-between'>
            <div className='text-center text-md-start'>
              <h1>{item.name}</h1>
              <h6 className='fst-italic mb-3'>{item.latin_name}</h6>
            </div>
            
          </div>
          <Row className='d-flex image img-single w-100 my-2 d-md-none align-items-end' style={{ backgroundImage: `url(${item.image})`, borderRadius: '15px', color: 'white' }}>
            <Favourite handleFavourite={handleFavourite} favouriteStatus={favouriteStatus} item={item}  />
          </Row> 
          <p>{item.description}</p>
          <div className='text-end d-flex justify-content-evenly'>
            {item && item.benefits.map(benefit => {
              return (
                <p key={benefit.id} className='my-0 fw-bold'>{benefit.name}</p>
              )
            })}
          </div>
        </Col>
      </Row>
      <Row>

      </Row>
    </>
  )
}

export default SingleIngredient