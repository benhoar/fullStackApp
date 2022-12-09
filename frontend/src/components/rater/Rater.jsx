import './rater.css'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

const axios = require('axios').default

const Rater = ({ onClick }) => {
   const [country, setCountry] = useState('')
   const [rating, setRating] = useState(0)

   const regionSorter = (regions) => {
      return Object.keys(regions).sort().reduce(function(res, key) {res[key]=regions[key]; return res}, {})
    }

   const ratings = [1,2,3]

   const onSubmit = async (e) => {
      try {
         await axios.post("/api/countries/", {
            country,
            rating
         })
         setCountry('')
         setRating(0)
         onClick()
      } catch (err) {
         console.log(err)
      }
   }
  
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
         <div className="selectHeader">
            <div className="headerCancel">
               <h3 className="ratingHeaders">Select a Region</h3>
               <FaTimes className="cancelBlog" onClick={() => onClick()}/>
            </div>
         </div>
         <ul className="countriesList">
            {Object.entries(regions).map(([key, value]) => {
               return <li className={country === key ? "selectedCountry" : "countryItem"}
                           key={value} 
                           onClick={() => setCountry(key)}>
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
                          onClick={() => setRating(val)} >
                        {val}
                        </span>
               })}
            </div>
         </div>
         <div className="submitRatings" onClick={() => onSubmit()}>
            <h3 className="ratingHeaders">Submit</h3>
         </div>
      </form>
   )
}

export default Rater
