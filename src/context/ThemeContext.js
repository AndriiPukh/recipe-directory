import { createContext, useMemo, useReducer } from 'react'

const ThemeContext = createContext()

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_COLOR':
      return {
        ...state,
        color: action.payload,
      }
    case 'CHANGE_MODE':
      return {
        ...state,
        mode: action.payload,
      }
    default:
      return state
  }
}

export function ThemeProvider({ children }) {
  // custom logic

  const [state, dispatch] = useReducer(themeReducer, {
    color: '#58249c',
    mode: 'dark',
  })

  const changeColor = (color) => {
    dispatch({
      type: 'CHANGE_COLOR',
      payload: color,
    })
  }

  const changeMode = (mode) => {
    dispatch({
      type: 'CHANGE_MODE',
      payload: mode,
    })
  }

  const context = useMemo(
    () => ({
      ...state,
      changeColor,
      changeMode,
    }),
    [state]
  )

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  )
}

export default ThemeContext
