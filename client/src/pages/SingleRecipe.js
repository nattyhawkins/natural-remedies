import { Col, Row } from 'react-bootstrap'

const SingleRecipe = ({ item }) => {

  return (
    <>
      <Row className='main d-flex flex-column flex-md-row p-0 my-5'>
        <Col className='image flex-grow-1' style={{ backgroundImage: `url(${item.image})` }}></Col>
        <Col className='flex-grow-1 p-3'>
          <h1>{item.name}</h1>
          {/* <h2>{item.mediums.name}</h2> */}
          <Row className='image w-100 mx-0 my-2 d-md-none' style={{ backgroundImage: `url(${item.image})`, borderRadius: '15px' }}></Row> 
          <p>{item.description}</p>
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