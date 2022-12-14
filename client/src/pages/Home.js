import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import TheNavbar from '../components/TheNavbar'
import { getIngredientBenefits } from '../helpers/general'


const Home = ({ setIsHome, isHome, setShow }) => {
  const [ items, setItems ] = useState([])
  const [ error, setError ] = useState(false)
  const [ benefits, setBenefits ] = useState([])
  const [ showBenefit, setShowBenefit ] = useState('')
  // let delay = 0
  let index = 0

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
    setIsHome(true)
    getItems()
  }, [])

  useEffect(() => {
    items.length > 0 && setBenefits(getIngredientBenefits(items))
  }, [items])

  useEffect(() => {
    // items.length > 0 && 
    // const benefits = getIngredientBenefits(items)
    setShowBenefit(benefits[index])
    const tick = setInterval(() => {
      // console.log(benefits)
      index = (index + 1) % benefits.length
      setShowBenefit(benefits[index])
    }, 1500)
    return () => {
      clearInterval(tick)
    }
  }, [benefits])

  // useEffect(() => {
  //   console.log(benefits)
  // }, [benefits])

  return (
    <main className='home '>

      <Carousel fade wrap>
        
        {items.length > 0 && items.map(item => {
          return (
            <Carousel.Item className='home image' key={item.id} interval={5000} style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${item.bg_image})` }}>
              <TheNavbar setShow={setShow} isHome={isHome} />
              <Carousel.Caption className='h-100 d-flex flex-column justify-content-evenly'>
                <>
                  <div className='feature'>
                    <Link to={`/active_ingredients/${item.id}`}><h3>{item.name}</h3></Link>
                    <h6 className='fst-italic'>{item.latin_name}</h6>
                    <p>{item.description.slice(0, 300)} <Link  to={`/active_ingredients/${item.id}`}> →</Link></p>
                    <div className='d-flex justify-content-evenly'>
                      {item.benefits.map(benefit => {
                        return (
                          <Link to={`/recipes/?benefit=${benefit.name}`} key={benefit.id}>
                            <p className='m-0 px-2 text-end fw-bold'>{benefit.name}</p>
                          </Link>
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
      <div className='text-start' id="overlay">
        <h1 className='text-start header'>Wellbean</h1>
        <div className='d-flex'>
          <h2>Natural remedies for </h2>
          <div className='ms-2 benefits text-center ' >
            {showBenefit && <h2 className='benefit mb-5'>{showBenefit}</h2>}
            {/* {items.length > 0 && benefits && benefits.map(benefit => {
              delay += 1
              console.log(delay)
              return (
                <h2 key={benefit} className='benefit mb-5' style={{ animationDelay: `${delay}s` }}> {benefit}</h2>
              )
            })} */}
          </div>
        </div>
      </div>
    </main>
  )
}
export default Home