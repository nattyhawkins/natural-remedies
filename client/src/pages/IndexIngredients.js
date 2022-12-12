import { useEffect } from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import IndexCard from '../components/IndexCard'


const IndexIngredients = ({ items, model, setBenefits, benefits, refresh, setRefresh }) => {

  useEffect(() => {
    const list = []
    items.forEach(ingredient => {
      return ingredient.benefits.forEach(benefit => {
        if (!list.includes(benefit.name)){
          list.push(benefit.name)
        }
      })
    })
    list.length > benefits.length && setBenefits(list)
  }, [items])

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
          <IndexCard key={id} id={id} item={item} model={model} benefitHTML={benefitHTML} image={image} name={name} setRefresh={setRefresh} refresh={refresh}/>
        )
      })
      }
    </>
  )
}

export default IndexIngredients