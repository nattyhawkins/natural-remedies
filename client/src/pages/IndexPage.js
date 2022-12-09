import axios from 'axios'
import { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import IndexIngredients from './IndexIngredients'
import Spinner from '../components/Spinner'
import IndexRecipes from './IndexRecipes'

const IndexPage = () => {
  const [ items, setItems ] = useState([])
  const [ error, setError ] = useState(false)
  const { model } = useParams()
  

  useEffect(() => {
    const getItems = async () => {
      try {
        const { data } = await axios.get(`/api/${model}/`)
        console.log(data)
        setItems(data)
      } catch (err) {
        console.log(err)
        setError(err.response.data.message ? err.response.data.message : err.message)
      }
    }
    getItems()
  }, [model])

  return (
    <main className='index'>
      <Container className="mt-4">
        <Row className="index-row text-center">
          {items.length > 0 ? 
            model === 'active_ingredients' ?
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