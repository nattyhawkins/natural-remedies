import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Favourite from '../components/Favourite'
const SingleRecipe = ({ item, favouriteStatus, handleFavourite }) => {
  const [ benefits, setBenefits ] = useState([])

  useEffect(() => {
    const list = []
    item.active_ingredients.forEach(ingredient => {
      return ingredient.benefits.forEach(benefit => {
        if (!list.includes(benefit.name)){
          list.push(benefit.name)
        }
      })
    })
    setBenefits(list)
  }, [item])



  return (
    <>
      <Row className='main d-flex flex-column flex-md-row p-0 my-5'>
        <Col className='img-single image flex-grow-1 d-none d-md-flex align-items-end' style={{ backgroundImage: `url(${item.image})` }}>
          <Favourite handleFavourite={handleFavourite} favouriteStatus={favouriteStatus} item={item}  />
        </Col>
        <Col className='p-3'>
          <h1 className='text-center text-md-start'>{item.name}</h1>
          {/* <h2>{item.mediums.name}</h2> */}
          <Row className='d-flex img-single image w-100 my-2 d-md-none align-items-end' style={{ backgroundImage: `url(${item.image})`, borderRadius: '15px', color: 'white' }}>
            <Favourite handleFavourite={handleFavourite} favouriteStatus={favouriteStatus} item={item}  />
          </Row> 
          <p>{item.description}</p>
          <div className='d-flex justify-content-evenly'>
            {benefits.length > 0 && benefits.map(benefit => {
              return (
                <p key={benefit} className='my-0 fw-bold'>{benefit}</p> 
              )
            })}
          </div>
        </Col>
      </Row>
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