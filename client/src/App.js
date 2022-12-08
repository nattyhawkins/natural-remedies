import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import TheNavbar from './components/TheNavbar'
import Home from './pages/Home'
import IngredientIndex from './pages/IngredientIndex'
import SingleIngredient from './pages/SingleIngredient'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

const App = () => {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/products/') // * <-- replace with your endpoint
      console.log(data)
    }
    getData()
  })

  return (
    <div className="pageWrapper">
      <BrowserRouter>
        <div className="contentWrapper">
          <TheNavbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/ingredientIndex' element={<IngredientIndex />} />
            <Route path='/ingredientIndex/:ingredientId' element={<SingleIngredient />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
