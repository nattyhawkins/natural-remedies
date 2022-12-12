import React from 'react'
import Spinner from '../components/Spinner'

const NotFound = () => {
  return (
    <main className='text-center'>
      <Spinner />
      <h1>Not Found</h1>
    </main>
  )
}

export default NotFound