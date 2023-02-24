import React, { useEffect } from 'react'
import Spinner from '../components/Spinner'

const NotFound = () => {

  return (
    <main className='text-center'>
      <Spinner />
      <h1>Oops! Page does not exist</h1>
    </main>
  )
}

export default NotFound