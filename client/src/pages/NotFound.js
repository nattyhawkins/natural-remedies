import React, { useEffect } from 'react'
import Spinner from '../components/Spinner'

const NotFound = ({ setIsHome }) => {

  useEffect(() => {
    setIsHome(false)

  }, [])

  return (
    <main className='text-center'>
      <Spinner />
      <h1>Not Found</h1>
    </main>
  )
}

export default NotFound