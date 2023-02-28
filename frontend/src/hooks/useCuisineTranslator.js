import { useMemo } from "react";
import staticCountries from '../staticdata/countries'

export default function useCuisineTranslator() {
   const cuisineToCountry = useMemo(() => {
      const cuisineTranslator = {}
      for (const country in staticCountries) {
      const cur = staticCountries[country]
         for (let i = 0; i < cur.cuisines.length; i++) {
            cuisineTranslator[cur.cuisines[i]] = country
         }
      }
      return cuisineTranslator 
   }, [])

   return { cuisineToCountry }
}
