import { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import IndexCard from '../components/IndexCard'
import { getRecipeBenefits } from '../helpers/general'


const IndexRecipes = ({ items, model, setBenefits, benefits, refresh, setRefresh, setShow }) => {

  useEffect(() => {
    getRecipeBenefits(items).length > benefits.length && setBenefits(getRecipeBenefits(items))
  }, [items])

  

  return (
    <>
      {items.length > 0 && items.map(item => {
        // Benefits set different for each item so can't se benefits state
        const { id, name, image, active_ingredients: ingredients } = item
        const list = []
        const benefitHTML = ingredients.map(ingredient => {
          const ingredientBenefits = ingredient.benefits.map(benefit => {
            if (list.includes(benefit.name)) return (null)
            else {
              list.push(benefit.name)
              return (
                <Card.Text className='m-0 px-2 text-end' key={benefit.id}>{benefit.name}</Card.Text>
              )
            }
          })
          return (
            <div key={ingredient.id}>{ingredientBenefits}</div>
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

export default IndexRecipes