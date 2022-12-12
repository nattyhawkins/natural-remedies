import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TheNavbar from './components/TheNavbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import SinglePage from './pages/SinglePage'
import IndexPage from './pages/IndexPage'
import { useState } from 'react'
import AuthModal from './components/AuthModal'

const App = () => {
  const [show, setShow] = useState(false)
  const [tab, setTab] = useState('login')

  return (
    <div className="pageWrapper">
      <AuthModal show={show} setShow={setShow} tab={tab} setTab={setTab}/>
      <BrowserRouter>
        <div className="contentWrapper">
          <TheNavbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/:model' element={<IndexPage setShow={setShow}/>} />
            <Route path='/:model/:itemId' element={<SinglePage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
