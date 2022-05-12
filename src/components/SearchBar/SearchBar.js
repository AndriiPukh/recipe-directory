import React, { useState } from 'react'
import './SearchBar.css'
import { useHistory } from 'react-router-dom'

function SearchBar() {
  const [term, setTerm] = useState('')
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    history.push(`/search?q=${term}`)
  }

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">
          Search:
          <input
            type="text"
            id="search"
            onChange={(e) => setTerm(e.target.value)}
            required
          />
        </label>
      </form>
    </div>
  )
}

export default SearchBar
