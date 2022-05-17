import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Recipe.css'
import { useTheme } from '../../hooks/useTheme'
import { projectFirestore } from '../../firebase/config'

function Recipe() {
  const { id } = useParams()
  const { mode } = useTheme()
  const [recipe, setRecipe] = useState(null)
  const [isPending, setIsPending] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsPending(true)
    const unsub = projectFirestore
      .collection('recipes')
      .doc(id)
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            setRecipe(doc.data())
            setIsPending(false)
          } else {
            setError('Could not find that recipe')
            setIsPending(false)
          }
        },
        (err) => {
          setError(err.message)
          setIsPending(false)
        }
      )

    return () => unsub()
  }, [id])

  const handleUpdate = () => {
    projectFirestore.collection('recipes').doc(id).update({
      title: 'Something updated',
    })
  }

  return (
    <div className={`recipe ${mode}`}>
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
          <button type="button" onClick={() => handleUpdate()}>
            Update me
          </button>
        </>
      )}
    </div>
  )
}

export default Recipe
