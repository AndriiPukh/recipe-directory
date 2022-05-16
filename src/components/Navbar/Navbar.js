import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import SearchBar from '../SearchBar/SearchBar'

function Navbar() {
  const { color } = useTheme()
  return (
    <div
      className="navbar"
      style={{
        background: color,
      }}
    >
      <nav>
        <Link to="/" className="brand">
          <h1>Cooking Ninja</h1>
        </Link>
        <SearchBar />
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  )
}

export default Navbar
