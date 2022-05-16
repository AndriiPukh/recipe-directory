import { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'

// eslint-disable-next-line import/prefer-default-export
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme() must be used inside a Theme.Provider')
  }
  return context
}
