import React from 'react'
import './RecipeDetails.css'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'

function RecipeDetails() {
  const { id } = useParams()
  const {
    data: recipe,
    isPending,
    error,
  } = useFetch(`http://localhost:3000/recipes/${id}`)

  return (
    <div className="recipe">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>
            Takes: {recipe.cookingTime}
            to cook
          </p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  )
}

export default RecipeDetails
