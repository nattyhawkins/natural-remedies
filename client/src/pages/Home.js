import axios from 'axios'
import { useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getIngredientBenefits } from '../helpers/general'


const Home = () => {
  const [ items, setItems ] = useState([])
  const [ error, setError ] = useState(false)
  const [ benefits, setBenefits ] = useState([])
  let delay = 0

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

  useEffect(() => {
    items.length > 0 && setBenefits(getIngredientBenefits(items))
  }, [items])

  useEffect(() => {
    console.log(benefits)
  }, [benefits])

  return (
    <main >
      <Carousel fade className='home '>
        
        {items.length > 0 && items.map(item => {
          return (
            <Carousel.Item className='home image' key={item.id} interval={20000} style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${item.bg_image})` }}>
              {/* <img
                className="d-block image w-100 h-100"
                src={item.bg_image}
                alt={item.name}
              /> */}
              <Carousel.Caption className='h-100 d-flex flex-column justify-content-evenly'>
                <>
                  <div className='text-start'>
                    <h1 className='text-start header'>wellbean</h1>
                    <div className='d-flex'>
                      <h2>Natural remedies for </h2>
                      <div className='ms-3 benefits'>
                        {items.length > 0 && benefits && benefits.map(benefit => {
                          delay += 1
                          console.log(delay)
                          return (
                            <h2 key={benefit} className='benefit' style={{ animationDelay: `${delay}s` }}> {benefit}</h2>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                  <div className='feature'>
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
                  </div>
                </>
              </Carousel.Caption>
            </Carousel.Item>
          )
        })}
      </Carousel>
    </main>
  )
}
export default Home