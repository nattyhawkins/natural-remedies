import { useEffect, useState } from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import IndexCard from '../components/IndexCard'


const IndexRecipes = ({ items, model, setBenefits, benefits }) => {

  useEffect(() => {
    const list = []
    items.forEach(item => {
      const { active_ingredients: ingredients } = item
      return ingredients.forEach(ingredient => {
        return ingredient.benefits.forEach(benefit => {
          if (!list.includes(benefit.name)){
            list.push(benefit.name)
          }
        })
      })
    })
    list.length > benefits.length && setBenefits(list)
  }, [items])

  

  return (
    <>
      {items.map(item => {
        // Benefits set different for each item so can't se benefits state
        const { id, name, favourites, image, active_ingredients: ingredients } = item
        const list = []
        const benefitHTML = ingredients.map(ingredient => {
          const ingredientBenefits = ingredient.benefits.map(benefit => {
            if (list.includes(benefit.name)) return (null)
            else {
              list.push(benefit.name)
              return (
                <Card.Text className='m-0 px-2 text-end'key={benefit.id}>{benefit.name}</Card.Text>
              )
            }
          })
          return (
            <div key={ingredient.id}>{ingredientBenefits}</div>
          )
        })
        return (
          <IndexCard key={id} id={id} model={model} benefitHTML={benefitHTML} image={image} name={name} />
        )
      })
      }
    </>
  )
}

export default IndexRecipes