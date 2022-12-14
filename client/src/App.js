import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TheNavbar from './components/TheNavbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import SinglePage from './pages/SinglePage'
import IndexPage from './pages/IndexPage'
import { useEffect, useState } from 'react'
import AuthModal from './components/AuthModal'

const App = () => {
  const [show, setShow] = useState(false)
  const [tab, setTab] = useState('login')
  const [ isHome, setIsHome ] = useState(false)
  const [ benefitFilter, setBenefitFilter ] = useState('&benefit=')


  // useEffect(() => {
  //   setIsHome(false)

  // }, [])

  return (
    <div className="pageWrapper">
      <BrowserRouter>
        <div className="contentWrapper">
          {!isHome &&
            <TheNavbar setShow={setShow} isHome={isHome} />
          }
          <AuthModal show={show} setShow={setShow} tab={tab} setTab={setTab}/>
          <Routes>
            <Route path='/' element={<Home setIsHome={setIsHome} setShow={setShow} isHome={isHome} setBenefitFilter={setBenefitFilter}/>} />
            <Route path='/profile' element={<Profile setIsHome={setIsHome} setShow={setShow}/>} />
            <Route path='/:model' element={<IndexPage setIsHome={setIsHome} setShow={setShow} benefitFilter={benefitFilter} setBenefitFilter={setBenefitFilter}  />} />
            <Route path='/:model/:itemId' element={<SinglePage setIsHome={setIsHome} setShow={setShow}/>} />
            <Route path='*' element={<NotFound setIsHome={setIsHome} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
