import React, { useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal, Tab, Tabs } from 'react-bootstrap'
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import { getToken } from '../helpers/auth'
import ImageUpload from './ImageUpload'

const AddRecipe = ({ showAddRecipe, setShowAddRecipe, ingredients, getIngredientsError }) => {
  const [ error, setError ] = useState([])
  const [ selectField, setSelectField ] = useState([])
  const [formFields, setFormFields] = useState({
    name: '',
    image: '',
    description: '',
    active_ingredients: [],
    inventory: '',
    steps: '',
    mediums: [],
  })

  const handleClose = () => setShowAddRecipe(false)

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    if (error !== []) setError([])
  }

  const handleSelectChange = (e) => {
    if (e.target.value === 'default'){
      setSelectField([])
    } else if (selectField.includes(e.target.value)){
      const removeIngredient = [... selectField].filter(ingredient => ingredient !== e.target.value)
      setSelectField(removeIngredient)
    } else {
      setSelectField([ ...selectField, parseInt(e.target.value) ])
    }
  }

  useEffect(() => {
    console.log(selectField)
    setFormFields({ ...formFields, 'active_ingredients': selectField })
    if (error !== []) setError([])
  }, [selectField])

  useEffect(() => {
    console.log(formFields)
  }, [formFields])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/recipes/', formFields,{
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(data)
      setFormFields({
        name: '',
        image: '',
        description: '',
        active_ingredients: '',
        inventory: '',
        steps: '',
      })
      setShowAddRecipe(false)
      // window.location.reload(false)
    } catch (err) {
      console.log(err.response)
      setError(err.response.data.detail ? err.response.data.detail : err.response.statusText)

    }
  }

  return (
    <Modal show={showAddRecipe} onHide={handleClose} size="lg" centered >
      <Modal.Header closeButton>
        ➕ Add your own recipe
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} >
          <Form.Group className="my-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              // placeholder="Name"
              onChange={handleChange}
              value={formFields.name}
              autoComplete="on"
              required
              autoFocus
            />
          </Form.Group>
          <ImageUpload formFields={formFields} setFormFields={setFormFields} imageKey='image' />
          <Form.Group className="my-3" controlId="desc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea" 
              rows={3}
              name="description"
              // placeholder="Description"
              onChange={handleChange}
              value={formFields.description}
              autoComplete="on"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="act_ingredients">
            <Form.Label>Select featured ingredients</Form.Label>
            {getIngredientsError ?
              <Form.Text className='d-block'>Something went wrong... Cannot add featured ingredients at this time</Form.Text>
              :
              <Form.Select
                name="active_ingredients"
                onChange={handleSelectChange}
                value={selectField}
                autoComplete="on"
                multiple
              >
                <option value='default' style={{ color: 'grey' }}>None</option>
                {ingredients.length > 0 && ingredients.map(ingredient => {
                  return <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
                })}
              </Form.Select>
            }
          </Form.Group>
          <Form.Group className="mb-3" controlId="inv">
            <Form.Label>You will need</Form.Label>
            <Form.Control
              as="textarea" 
              rows={3}
              name="inventory"
              placeholder='• List any other ingredients or equipment'
              onChange={handleChange}
              value={formFields.inventory}
              autoComplete="on"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="steps">
            <Form.Label>Method</Form.Label>
            <Form.Control
              as="textarea" 
              rows={3}
              name="steps"
              // placeholder=""
              onChange={handleChange}
              value={formFields.steps}
              autoComplete="off"
              required
            />
          </Form.Group>
          <Button type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer className='justify-content-start'>
        {error && error.length > 0 && Array.isArray(error) ? 
          error.map(message => {
            return (
              <small className='text-danger d-block' key={uuid()}>{message}</small>
            )
          })
          :
          <small className='text-danger'>{error}</small>
        }
      </Modal.Footer>
    </Modal>
  )
}

export default AddRecipe