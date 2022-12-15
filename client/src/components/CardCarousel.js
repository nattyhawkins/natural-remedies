import { useState } from 'react'
import { Carousel } from 'react-bootstrap'
import IndexIngredients from '../pages/IndexIngredients'
import { v4 as uuid } from 'uuid'
import IndexRecipes from '../pages/IndexRecipes'

const CardCarousel = ({ groups, refresh, setRefresh, setShow, model }) => {
  const [ benefits, setBenefits ] = useState([])
  


  return (
    <Carousel interval={null} variant="dark" >
      {groups.length > 0 && groups.map(group => {
        return (
          <Carousel.Item key={uuid()} >
            <Carousel.Caption  className='d-flex'>
              {model === 'active_ingredients' ?
                <IndexIngredients items={group} model={model} benefits={benefits} setBenefits={setBenefits} setRefresh={setRefresh} refresh={refresh} setShow={setShow}/>
                :
                model === 'recipes' ?
                  <IndexRecipes items={group} model={model} benefits={benefits} setBenefits={setBenefits} setRefresh={setRefresh} refresh={refresh} setShow={setShow}/>
                  :
                  <h1>Somethind went wrong...</h1>
              }
            </Carousel.Caption>
          </Carousel.Item>
        )
      })}
    </Carousel>

    
  )
}

export default CardCarousel