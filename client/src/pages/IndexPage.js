import axios from 'axios'
import { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import IndexIngredients from './IndexIngredients'
import Spinner from '../components/Spinner'
import IndexRecipes from './IndexRecipes'
import Filters from '../components/Filters'

const IndexPage = () => {
  const [ items, setItems ] = useState([])
  const [ error, setError ] = useState(false)
  const { model } = useParams()
  const [ modelLoad, setModelLoad ] = useState(model)
  const [search, setSearch] = useState('')

  
  useEffect(() => {
    const getItems = async () => {
      try {
        console.log('model', model)
        const { data } = await axios.get(`/api/${model}?${search}&/`)
        console.log(data)
        setItems(data)
      } catch (err) {
        console.log(err)
        setError(err.response.data.message ? err.response.data.message : err.message)
      }
    }
    getItems()
  }, [model, search])

  useEffect(() => {
    setModelLoad(model)
  }, [items])
  
  return (
    <main className='index'>
      <Container className="mt-4">
        <Filters model={model} setSearch={setSearch}/>
        <Row className="index-row text-center">
          
          {items.length > 0 && modelLoad === model ? 
            modelLoad === 'active_ingredients' ?
              <IndexIngredients items={items} model={model} />
              :
              <IndexRecipes items={items} model={model}/>
            :
            error ?
              <h1>{error}</h1>
              : 
              <Spinner />
          }
        </Row>
      </Container>
    </main>
  )
}
export default IndexPage