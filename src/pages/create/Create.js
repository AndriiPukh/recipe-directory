import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Create.css'
import { projectFirestore } from '../../firebase/config'

function Create() {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const ingredientInput = useRef(null)
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const doc = {
      title,
      method,
      cookingTime: `${cookingTime} minutes`,
      ingredients,
    }

    try {
      await projectFirestore.collection('recipes').add(doc)
      history.push('/')
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err.message)
    }
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const ing = newIngredient.trim()
    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing])
    }
    setNewIngredient('')
    ingredientInput.current.focus()
  }

  return (
    <div className="create">
      <h2 className="page-title"> Add new Recipe </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="rec-title">
          <span>Recipe title:</span>
          <input
            id="rec-title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label htmlFor="rec-ing">
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              id="rec-ing"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button type="button" className="btn" onClick={handleAdd}>
              Add
            </button>
          </div>
        </label>
        <p>
          Current ingredients:
          {ingredients.map((i) => (
            <em key={i}> {i}</em>
          ))}
        </p>
        <label htmlFor="rec-method">
          <span>Recipe title:</span>
          <textarea
            id="rec-method"
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label htmlFor="rec-time">
          <span>Cooking time:</span>
          <input
            id="rec-time"
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Create
