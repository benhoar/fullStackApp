 import { createContext, useContext, useState } from 'react'

 const SelectedContext = createContext()

 export const useSelectedContext = () => useContext(SelectedContext)
 
 export function SelectedProvider({ children }) {
   const [selected, setSelected] = useState("")

   const updateSelected = (selection) => {
      if (selection) {
         setSelected(selection)
      } else {
         setSelected("")
      }
   } 

   return (
      <SelectedContext.Provider value={{selected, setSelected: updateSelected}}>
            {children}
      </SelectedContext.Provider> 
   )
 }