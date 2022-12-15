import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TheNavbar from './components/TheNavbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import SinglePage from './pages/SinglePage'
import IndexPage from './pages/IndexPage'
import { useEffect, useState } from 'react'
import AuthModal from './components/AuthModal'
import axios from 'axios'
import AddRecipe from './components/AddRecipe'

const App = () => {
  const [show, setShow] = useState(false)
  const [tab, setTab] = useState('login')
  const [ isHome, setIsHome ] = useState(false)
  const [ benefitFilter, setBenefitFilter ] = useState('&benefit=')
  const [ ingredients, setIngredients ] = useState([])
  const [ error, setError ] = useState(false)
  const [ showAddRecipe, setShowAddRecipe ] = useState(false)

  //get all ingredients
  useEffect(() => {
    const getItems = async () => {
      try {
        setError(false)
        const { data } = await axios.get('/api/active_ingredients?&search=&benefit=&includes=&/')
        console.log('home data', data)
        setIngredients(data)
      } catch (err) {
        console.log(err.response)
        setError(err.response.statusText ? err.response.statusText : 'Something went wrong...')
      }
    }
    getItems()
  }, [])

  return (
    <div className="pageWrapper">
      <BrowserRouter>
        <div className="contentWrapper">
          {!isHome &&
            <TheNavbar setShow={setShow} isHome={isHome} />
          }
          <AuthModal show={show} setShow={setShow} tab={tab} setTab={setTab}/>
          <AddRecipe showAddRecipe={showAddRecipe} setShowAddRecipe={setShowAddRecipe} ingredientsError={error} ingredients={ingredients} />
          <Routes>
            <Route path='/' element={<Home error={error} ingredients={ingredients} setIsHome={setIsHome} setShow={setShow} isHome={isHome} setBenefitFilter={setBenefitFilter}/>} />
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
