import { useEffect, useState } from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'


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
        const benefitsHTML = ingredients.map(ingredient => {
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
          <Col key={id} className="mb-4 col-12 col-sm-6 col-md-6 offset-md-0 col-lg-4">
            <Link to={`/${model}/${id}`}>
              <Card className="index-card pb-0" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5)), url(${image})` }}>
                <Card.Body className='d-flex p-0 flex-column justify-content-end'>
                  <div className='align-self-end index-detail'>{benefitsHTML}</div>
                  <div className='d-flex justify-content-between align-items-center'>
                    <p className='fave m-0 align-self-end'>✩</p>
                    <Card.Title className='mb-0 text-end'>{name}</Card.Title>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        )
      })
      }
    </>
  )
}

export default IndexRecipes