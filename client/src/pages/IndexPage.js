import axios from 'axios'
import { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import IndexIngredients from './IndexIngredients'
import Spinner from '../components/Spinner'
import IndexRecipes from './IndexRecipes'
import Filters from '../components/Filters'
import NotFound from './NotFound'
import { getBenefits } from '../helpers/general'

const IndexPage = ({ setShow, setIsHome }) => {
  const [ items, setItems ] = useState(false)
  const [ error, setError ] = useState(false)
  const [search, setSearch] = useState('&search=')
  // const [ benefits, setBenefits ] = useState('')
  const [ benefitFilter, setBenefitFilter ] = useState('&benefit=')
  const [ refresh, setRefresh ] = useState(false)
  const [ benefits, setBenefits ] = useState([])
  
  const { model } = useParams()
  const [ modelLoad, setModelLoad ] = useState(model)

  useEffect(() => {
    console.log(benefits)
  }, [benefits])
  
  useEffect(() => {
    const getItems = async () => {
      try {
        console.log('model', model)
        setError(false)
        const { data } = await axios.get(`/api/${model}?${search}&${benefitFilter}&includes=&/`)
        console.log(data)
        setItems(data)
      } catch (err) {
        console.log(err.response)
        setError(err.response.statusText ? err.response.statusText : 'Something went wrong...')
      }
    }
    setIsHome(false)
    getItems()
  }, [model, search, benefitFilter, refresh])

  useEffect(() => {
    setModelLoad(model)
  }, [items])


  // //Get all benefits, unfiltered
  // useEffect(() => {
  //   const getItems = async () => {
  //     try {
  //       console.log('model', model)
  //       setError(false)
  //       const { data } = await axios.get(`/api/${model}?${search}&${benefitFilter}&/`)
  //       console.log(data)
  //       setItems(data)
  //     } catch (err) {
  //       console.log(err)
  //       setError(err.response.data.message ? err.response.data.message : err.message)
  //     }
  //   }
  //   getItems()
  // }, [model, search, benefitFilter])
  
  return (
    <main className='index'>
      <Container className="mt-4">
        {modelLoad === 'active_ingredients' || modelLoad === 'recipes' ? 
          <>
            <Filters model={model} setSearch={setSearch} benefits={benefits} setBenefits={setBenefits} setBenefitFilter={setBenefitFilter} />
            <Row className="index-row text-center">
              
              {items && items.length > 0 && modelLoad === model ? 
                modelLoad === 'active_ingredients' ?
                  <IndexIngredients items={items} model={model} benefits={benefits} setBenefits={setBenefits} setRefresh={setRefresh} refresh={refresh} setShow={setShow} />
                  :
                  <IndexRecipes items={items} model={model} benefits={benefits} setBenefits={setBenefits} setRefresh={setRefresh} refresh={refresh} setShow={setShow}/>
                :
                error ?
                  <div>
                    <Spinner />
                    <h1>Something went wrong...</h1>
                  </div>
                  :
                  items && items.length === 0 ?
                    <h1>No results</h1>
                    :
                    <Spinner />
              }
            </Row></>
          :
          <NotFound/>}
      </Container>
    </main>
  )
}
export default IndexPage