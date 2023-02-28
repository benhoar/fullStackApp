import { useEffect, useState } from 'react'

export default function useWindowWidth() {
   const [innerWidth, setInnerWidth] = useState(window.innerWidth)

   useEffect(() => {
      const handleResize = () => {
         setInnerWidth(window.innerWidth)
      }
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
   }, [innerWidth])

   return { innerWidth }
}