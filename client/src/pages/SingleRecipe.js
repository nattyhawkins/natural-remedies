import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Favourite from '../components/Favourite'
import IndexIngredients from './IndexIngredients'
const SingleRecipe = ({ item, favouriteStatus, handleFavourite, items, setRefresh, refresh, setShow, setBenefits, benefits, recError }) => {
  const [ benefitHTML, setBenefitHTML ] = useState([])

  useEffect(() => {
    const list = []
    item.active_ingredients.forEach(ingredient => {
      return ingredient.benefits.forEach(benefit => {
        if (!list.includes(benefit.name)){
          list.push(benefit.name)
        }
      })
    })
    setBenefitHTML(list)
  }, [item])

  useEffect(() => {
    console.log(items)
  }, [items])



  return (
    <>
      <Row className='main d-flex flex-column flex-md-row p-0 my-5'>
        <Col className='img-single image flex-grow-1 d-none d-md-flex align-items-end' style={{ backgroundImage: `url(${item.image})` }}>
          <Favourite handleFavourite={handleFavourite} favouriteStatus={favouriteStatus} item={item}  />
        </Col>
        <Col className='p-3'>
          <h1 className='text-center text-md-start'>{item.name}</h1>
          <Row className='d-flex img-single image w-100 my-2 d-md-none align-items-end' style={{ backgroundImage: `url(${item.image})`, borderRadius: '15px', color: 'white' }}>
            <Favourite handleFavourite={handleFavourite} favouriteStatus={favouriteStatus} item={item}  />
          </Row> 
          <p>{item.description}</p>
          <div className='d-flex justify-content-evenly'>
            {benefitHTML.length > 0 && benefitHTML.map(benefit => {
              return (
                <Link to={`/recipes/?benefit=${benefit}`} key={benefit}>
                  <p key={benefit} className='my-0 fw-bold benefit-small'>{benefit}</p> 
                </Link>
              )
            })}
          </div>
        </Col>
      </Row>
      {!recError &&
      <Row className='collection d-flex groups-row justify-content-start flex-wrap mt-5'>
        <h4><span className='highlight'>RECOMMENDED  </span> What&apos;s in it?</h4>
        {items && items.length > 0 && 
          <IndexIngredients items={items} model='active_ingredients' benefits={benefits} setBenefits={setBenefits} setRefresh={setRefresh} refresh={refresh} setShow={setShow}/>
        }
      </Row>}
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