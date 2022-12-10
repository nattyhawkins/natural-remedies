import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import TheNavbar from './components/TheNavbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import SinglePage from './pages/SinglePage'
import IndexPage from './pages/IndexPage'

const App = () => {
//   useEffect(() => {
//     const getData = async () => {
//       const { data } = await axios.get('/api/products/') // * <-- replace with your endpoint
//       console.log(data)
//     }
//     getData()
//   })

  return (
    <div className="pageWrapper">
      <BrowserRouter>
        <div className="contentWrapper">
          <TheNavbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/:model' element={<IndexPage />} />
            <Route path='/:model/:itemId' element={<SinglePage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
