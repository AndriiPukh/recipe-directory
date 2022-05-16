import React from 'react'
import './App.css'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/home/Home'
import Create from './pages/create/Create'
import Search from './pages/search/Search'
import Recipe from './pages/recipe/Recipe'
import ThemeSelector from './components/ThemeSelector/ThemeSelector'
import { useTheme } from './hooks/useTheme'

function App() {
  const { mode } = useTheme()

  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Switch>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route exact path="/recipe/:id">
            <Recipe />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
