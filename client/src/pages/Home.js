import axios from 'axios'
import { useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import TheNavbar from '../components/TheNavbar'
import { getIngredientBenefits } from '../helpers/general'


const Home = ({ setIsHome, isHome, setShow, setTab }) => {
  const [ items, setItems ] = useState([])
  const [ benefits, setBenefits ] = useState([])
  const [ showBenefit, setShowBenefit ] = useState('')
  const [ ingredients, setIngredients ] = useState([])
  const [ error, setError ] = useState(false)
  let index = 0
  

  useEffect(() => {
    setItems(ingredients.filter(item => item.bg_image).sort((a, b) => 0.5 - Math.random()))
  }, [ingredients])

  useEffect(() => {
    items.length > 0 && setBenefits(getIngredientBenefits(items))
  }, [items])

  useEffect(() => {
    setShowBenefit(benefits[index])
    const tick = setInterval(() => {
      index = (index + 1) % benefits.length
      setShowBenefit(benefits[index])
    }, 1500)
    return () => {
      clearInterval(tick)
    }
  }, [benefits])

  useEffect(() => {
    setIsHome(true)
  }, [])

  //get all ingredients
  useEffect(() => {
    const getItems = async () => {
      try {
        setError(false)
        const { data } = await axios.get('/api/active_ingredients/?&search=&benefit=&includes=&/')
        console.log('home data', data)
        setIngredients(data)
      } catch (err) {
        console.log(err.response)
        setError(err.response.statusText ? err.response.statusText : 'Something went wrong...')
      }
    }
    getItems()
  }, [])

  return (
    !error ?
      <main className='home '>
        <Carousel fade wrap>
          
          {items.length > 0 && items.map(item => {
            return (
              <Carousel.Item className='home image' key={item.id} interval={3000} style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${item.bg_image})` }}>
                <TheNavbar setShow={setShow} isHome={isHome} setTab={setTab} />
                <Carousel.Caption className='my-3 d-flex justify-content-center justify-content-lg-end'>
                  <>
                    <div className='feature'>
                      <Link to={`/active_ingredients/${item.id}`} className='benefit-small'><h3>{item.name}</h3></Link>
                      <h6 className='fst-italic'>{item.latin_name}</h6>
                      <p>{item.description.slice(0, 300)} <Link  to={`/active_ingredients/${item.id}`}> →</Link></p>
                      <div className='d-flex justify-content-evenly flex-wrap'>
                        {item.benefits.map(benefit => {
                          return (
                            <Link to={`/recipes/?benefit=${benefit.name}`} key={benefit.id}>
                              <p className='m-0 px-2 text-end fw-bold benefit-small'>{benefit.name}</p>
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
          <h1 className='text-center text-lg-start header'>Wellbean</h1>
          <div className='d-flex text-center flex-column flex-lg-row slogan'>
            <h2 >Natural remedies for </h2>
            <div className='ms-2 benefits' >
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
      :
      <main className='home '>
        <div className='text-center mt-5'>
          <h1 className=' header'>Wellbean</h1>
          <Spinner />
          <h1>Oops! Something went wrong...</h1>
        </div>
      </main>
  )
}
export default Home