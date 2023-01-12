import { useEffect, useRef } from 'react'

export default function useOutsideClick(hide) {
   const ref = useRef(null);

   const handleClickOutside = (event) => {
       if (ref.current && !ref.current.contains(event.target)) {
            console.log(ref.current)
            hide()
       }
   };

   useEffect(() => {
       document.addEventListener('click', handleClickOutside, true);
       return () => {
           document.removeEventListener('click', handleClickOutside, true);
       };
   });

   return { ref };
}