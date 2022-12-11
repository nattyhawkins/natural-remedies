import { Col, Row } from 'react-bootstrap'

const SingleRecipe = ({ item }) => {

  return (
    <>
      <Row className='main d-flex flex-column flex-md-row p-0 my-5'>
        <Col className='image flex-grow-1 d-none d-md-block' style={{ backgroundImage: `url(${item.image})` }}></Col>
        <Col className='flex-grow-1 p-3'>
          <h1 className='text-center text-md-start'>{item.name}</h1>
          {/* <h2>{item.mediums.name}</h2> */}
          <Row className='image w-100 my-2 d-md-none' style={{ backgroundImage: `url(${item.image})`, borderRadius: '15px' }}></Row> 
          <p>{item.description}</p>
          <div className='text-end'>
            {item && item.active_ingredients.map(ingredient => {
              const benefits = ingredient.benefits.map(benefit => {
                return (
                  <p key={benefit.id} className='my-0'>{benefit.name}</p> 
                )
              })
              return (
                <div key={ingredient.id}>{benefits}</div>
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