import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Favourite from '../components/Favourite'

const SingleIngredient = ({ item, favouriteStatus, handleFavourite, setShow }) => {
  

  return (
    <>
      <Row className='main d-flex flex-column flex-md-row p-0 mt-sm-5'>
        <Col className='image img-single flex-grow-1 d-none d-md-flex align-items-end' style={{ backgroundImage: `url(${item.image})` }}>
          <Favourite handleFavourite={handleFavourite} favouriteStatus={favouriteStatus} item={item}  />
        </Col>
        <Col className='flex-grow-1 py-3 px-1'>
          <div className='d-flex justify-content-center justify-content-md-between'>
            <div className='text-center text-md-start'>
              <h1>{item.name}</h1>
              <h6 className='fst-italic mb-3'>{item.latin_name}</h6>
            </div>
            
          </div>
          <Row className='d-flex image img-single w-100 my-2 d-md-none align-items-end' style={{ backgroundImage: `url(${item.image})`, borderRadius: '15px', color: 'white' }}>
            <Favourite handleFavourite={handleFavourite} favouriteStatus={favouriteStatus} item={item}  />
          </Row> 
          <p>{item.description}</p>
          <div className='text-end d-flex justify-content-evenly flex-wrap'>
            {item && item.benefits.map(benefit => {
              return (
                <Link to={`/recipes/?benefit=${benefit.name}`} key={benefit.id}>
                  <p className='my-2 mx-3 fw-bold benefit-small'>{benefit.name}</p>
                </Link>
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