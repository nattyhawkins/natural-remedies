import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TheNavbar from './components/TheNavbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import SinglePage from './pages/SinglePage'
import IndexPage from './pages/IndexPage'
import { useState } from 'react'
import AuthModal from './components/AuthModal'
import AddRecipe from './components/AddRecipe'
import axios from 'axios'
import { getToken } from './helpers/auth'

const App = () => {
  const [ show, setShow ] = useState(false)
  const [ tab, setTab ] = useState('login')
  const [ isHome, setIsHome ] = useState(false)
  const [ benefitFilter, setBenefitFilter ] = useState('&benefit=')
  const [ showAddRecipe, setShowAddRecipe ] = useState(false)
  const [ formFields, setFormFields ] = useState({
    name: '',
    image: '',
    description: '',
    active_ingredients: [],
    inventory: '',
    steps: '',
    mediums: [],
  })
  const [ error, setError ] = useState([])



  const handleRecipeSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(formFields)
      if (formFields.image === '') throw new Error('Please upload an image')
      if (formFields.active_ingredients.length === 0) throw new Error('Please add at least 1 featured ingredient')
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
    } catch (err) {
      console.log(err)
      setError(err.message ? err.message : err.response.statusText)

    }
  }

  return (
    <div className="pageWrapper">
      <BrowserRouter>
        <div className="contentWrapper">
          {!isHome &&
            <TheNavbar setShow={setShow} isHome={isHome} setTab={setTab} />
          }
          <AuthModal show={show} setShow={setShow} tab={tab} setTab={setTab}/>
          <AddRecipe showAddRecipe={showAddRecipe} setShowAddRecipe={setShowAddRecipe} error={error} formFields={formFields} setFormFields={setFormFields} setError={setError} handleRecipeSubmit={handleRecipeSubmit} />
          <Routes>
            <Route path='/' element={<Home setIsHome={setIsHome} setShow={setShow} setTab={setTab} isHome={isHome} setBenefitFilter={setBenefitFilter}/>} />
            <Route path='/profile' element={<Profile setIsHome={setIsHome} setShow={setShow} setShowAddRecipe={setShowAddRecipe} />} />
            <Route path='/:model' element={<IndexPage setIsHome={setIsHome} setShow={setShow} benefitFilter={benefitFilter} setBenefitFilter={setBenefitFilter} setShowAddRecipe={setShowAddRecipe} />} />
            <Route path='/:model/:itemId' element={<SinglePage setIsHome={setIsHome} setShow={setShow} setShowAddRecipe={setShowAddRecipe} />} />
            <Route path='*' element={<NotFound setIsHome={setIsHome} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
