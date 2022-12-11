import { Col, Row } from 'react-bootstrap'

const SingleIngredient = ({ item }) => {

  return (
    <>
      <Row className='main d-flex flex-column flex-md-row p-0 my-5'>
        <Col className='image flex-grow-1 d-none d-md-block' style={{ backgroundImage: `url(${item.image})` }}></Col>
        <Col className='flex-grow-1 p-3'>
          <div className='text-center text-md-start'>
            <h1>{item.name}</h1>
            <h6 className='fst-italic mb-3'>{item.latin_name}</h6>
          </div>
          <Row className='image w-100 my-2 d-md-none' style={{ backgroundImage: `url(${item.image})`, borderRadius: '15px' }}></Row> 
          <p>{item.description}</p>
        </Col>
      </Row>
      <Row>

      </Row>
    </>
  )
}

export default SingleIngredient