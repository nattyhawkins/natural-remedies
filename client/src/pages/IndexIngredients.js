import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const IndexIngredients = ({ items, model }) => {

  return (
    <>
      {items.map(item => {
        const { id, name, favourites, image, benefits } = item
        const benefitHTML = benefits.map(benefit => {
          return (
            <Card.Text className='m-0 px-2 text-end'key={benefit.id}>{benefit.name}</Card.Text>
          )
        })
        return (
          <Col key={id} className="mb-4 col-12 col-sm-6 col-md-6 offset-md-0 col-lg-4">
            <Link to={`/${model}/${id}`}>
              <Card className="index-card pb-0" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5)), url(${image})` }}>
                <Card.Body className='d-flex p-0 flex-column justify-content-end'>
                  <div className='align-self-end index-detail'>{benefitHTML}</div>
                  <div className='d-flex justify-content-between align-items-center'>
                    <p className='fave m-0 align-self-end'>✩</p>
                    <Card.Title className='mb-0'>{name}</Card.Title>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        )
      })
      }
    </>
  )
}

export default IndexIngredients