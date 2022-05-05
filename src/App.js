import React from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import RecipeDetails from './components/Recipe/RecipeDetails'
import Home from './pages/home/Home'
import Create from './pages/create/Create'
import Search from './pages/search/Search'
import Recipe from './pages/recipe/Recipe'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route exact path="/recipe">
          <Recipe />
        </Route>
        <Route path="/recipe/:id">
          <RecipeDetails />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

export default App
