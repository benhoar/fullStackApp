import './countrypop.css'
import { FaTimes } from 'react-icons/fa'
import { useState, useEffect } from 'react'
const axios = require('axios').default

const CountryPop = ({ onClick, name, score }) => {

  const [country, setCountry] = useState("")
  const [curscore, setScore] = useState(0)

  useEffect(() => {
    const getCountryInfo = async () => {
      try {
        const res = await axios.get("/api/countries/")
        let countryData = null
        res.data.forEach((entry) => {
          if (entry.country === name)
            countryData = entry
        })
        if (countryData) {
          setScore(countryData.rating)
        }
        else {
          setScore(0)
        }
      } catch (err) {
        console.log(err)
      }
    }
    getCountryInfo()
    setCountry(name)
  }, [name])

  return (
    <div className="countryInfo">
      <img className="plates" src={curscore > 0 ?`images/${curscore}plateChunky.png` : ""} alt="" />
      <FaTimes className="closePop" onClick={onClick}/>
      <div className="countryName">{country}</div>
      <div className="topRestaurant">Top Spot: <em>Teji's</em></div>
   </div>
  )
}

export default CountryPop
