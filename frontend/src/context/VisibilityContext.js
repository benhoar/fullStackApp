import { useContext, useState, createContext, useEffect } from 'react'
import { useAuthContext } from '../hooks/authHooks/useAuthContext'

// The names of the contexts
const VisibilityContext = createContext()

// hook into the context
// the useVisibility hook simply hooks into the visibility context
// which itself simply hooks into the publicView state
export function useVisibility() {
   return useContext(VisibilityContext)
}

// defines behavior of the context and who can have access to it (children)
export function VisibilityProvider({ children }) {
   const { user } = useAuthContext()
   const [publicView, setPublicView] = useState(true)

   function togglePublicView() {
      if (!user) {
         setPublicView(true)
      } else {
         setPublicView(prevPublicView => !prevPublicView)
      }
   }

   useEffect(() => {
      setPublicView(user === null)
   }, [user])

   return (
      <VisibilityContext.Provider value={{ publicView, togglePublicView}}>
            {children}
      </VisibilityContext.Provider>
   )

}