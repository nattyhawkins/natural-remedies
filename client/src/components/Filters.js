import { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'

const Filters = ({ model, setSearch }) => {

  const [searchInput, setSearchInput] = useState('')

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value)
  }

  useEffect(() => {
    setSearch(`&search=${searchInput}`)
  }, [searchInput])

  return (
    <Row className='filters'>
      <div className='search-function text-center'>
        <input className='px-2 mb-3 search-input' onChange={handleSearchInput}
          type='search'
          placeholder={`Search ${model.replace('active_', '')}`}
          name='search'
          value={searchInput} />
      </div>
    </Row>
  )
}

export default Filters