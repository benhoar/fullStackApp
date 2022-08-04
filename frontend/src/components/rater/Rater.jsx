import './rater.css'
import { useState } from 'react'

const Rater = ({ onClick }) => {
   const [selected, setSelected] = useState("")
   const [rating, setRating] = useState(0)

   const regionSorter = (regions) => {
      return Object.keys(regions).sort().reduce(function(res, key) {res[key]=regions[key]; return res}, {})
    }

   const ratings = [1,2,3]
  
   let regions = {
                  "Eastern USA":"USA1", "Southern USA":"USA2", "Mexico":"Mexico", "Central America":"CAm",
                  "Venezuela":"Venezuela", "Colombia":"Colombia", "Bolivia":"Bolivia", "Chile":"Chile",
                  "Brazil":"Brazil", "Argentina":"Argentina", "Hispaniola":"Hispaniola", "Cuba":"Cuba",
                  "Jamaica":"Jamaica", "Southern Africa":"SAf", "Central Africa":"CAf", "Eastern Africa": "EAf",
                  "Western Africa":"WAf", "Northern Africa":"NAf", "Iran":"Iran", "United Kingdom":"UK",
                  "Portugal":"Portugal", "Spain":"Spain", "Italy":"Italy", "Greece":"Greece", "Turkey":"Turkey",
                  "Russia":"Russia", "Ukraine":"Ukraine", "Poland":"Poland", "Germany":"Germany", "France":"France",
                  "Denmark":"Denmark", "Sweden":"Sweden", "Australia":"Australia", "Japan":"Japan",
                  "South Korea":"South Korea", "Eastern China":"EChina", "Southern China":"SChine", "Western China":"WChina",
                  "Hawaii":"Hawaii", "India":"India", "Thailand":"Thailand", "Vietnam":"Vietnam", "Cambodia":"Cambodia",
                  "Philippines":"Philippines"
                  }
   regions = regionSorter(regions)
   return (
      <form className="formWrapper">
         <div className="selectHeader"  onClick={() => onClick()}>
            <h3 className="ratingHeaders">Select a Region</h3>
         </div>
         <ul className="countriesList">
            {Object.entries(regions).map(([key, value]) => {
               return <li className={selected === key ? "selectedCountry" : "countryItem"}
                           key={value} 
                           onClick={() => setSelected(key)}>
                           {key}
                        </li>
            })}
         </ul>
         <div className="ratingsWrapper">
            <h3 className="ratingHeaders">Rating</h3>
            <div className="ratingOptions">
               {ratings.map((val) => {
                  return <span key={val}
                          className={rating === val ? `rating-${val} selectedRating`: `rating-${val}`}
                          onClick={() => setRating(val)}>
                        {val}
                        </span>
               })}
            </div>
         </div>
         <div className="submitRatings">
            <h3 className="ratingHeaders">Submit</h3>
         </div>
      </form>
   )
}

export default Rater
