import { useEffect } from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import IndexCard from '../components/IndexCard'
import { getIngredientBenefits } from '../helpers/general'


const IndexIngredients = ({ items, model, setBenefits, benefits, refresh, setRefresh, setShow }) => {

  useEffect(() => {
    getIngredientBenefits(items) > benefits.length && setBenefits(getIngredientBenefits(items))
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
          <IndexCard key={id} id={id} item={item} model={model} benefitHTML={benefitHTML} image={image} name={name} setRefresh={setRefresh} refresh={refresh} setShow={setShow}/>
        )
      })
      }
    </>
  )
}

export default IndexIngredients