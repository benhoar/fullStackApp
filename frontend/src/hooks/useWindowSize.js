import { useEffect, useState } from 'react'

export default function useWindowSize() {
   const [innerWidth, setInnerWidth] = useState(window.innerWidth)
   const [innerHeight, setInnerHeight] = useState(window.innerHeight)

   useEffect(() => {
      const handleResize = () => {
         setInnerWidth(window.innerWidth)
      }
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
   }, [innerWidth])

   useEffect(() => {
      const handleResize = () => {
         setInnerHeight(window.innerHeight)
      }
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
   }, [innerHeight])

   return { innerWidth, innerHeight }
}