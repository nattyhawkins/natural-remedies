import axios from 'axios'
import { useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Home = () => {
  const [ items, setItems ] = useState([])
  const [ error, setError ] = useState(false)

  useEffect(() => {
    const getItems = async () => {
      try {
        setError(false)
        const { data } = await axios.get('/api/active_ingredients?&search=&benefit=&includes=&/')
        console.log('home data', data)
        setItems(data.filter(item => item.bg_image))
      } catch (err) {
        console.log(err.response)
        setError(err.response.statusText ? err.response.statusText : 'Something went wrong...')
      }
    }
    getItems()
  }, [])

  return (
    <main >
      <Carousel fade className='home '>
        {items.length > 0 && items.map(item => {
          return (
            <Carousel.Item className='home image d-flex justify-content-end' key={item.id} interval={20000} style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5)), url(${item.bg_image})` }}>
              {/* <img
                className="d-block image w-100 h-100"
                src={item.bg_image}
                alt={item.name}
              /> */}
              <Carousel.Caption className=''>
                <Link to={`/active_ingredients/${item.id}`}><h3>{item.name}</h3></Link>
                <h6 className='fst-italic'>{item.latin_name}</h6>
                <p>{item.description.slice(0, 300)}...</p>
                <div className='d-flex justify-content-evenly'>
                  {item.benefits.map(benefit => {
                    return (
                      <p className='m-0 px-2 text-end'key={benefit.id}>{benefit.name}</p>
                    )
                  })}
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          )
        })}
      </Carousel>
    </main>
  )
}
export default Home