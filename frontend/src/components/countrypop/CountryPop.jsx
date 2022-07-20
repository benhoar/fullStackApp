import './countrypop.css'
import { FaTimes } from 'react-icons/fa'
import { useState, useEffect } from 'react'

export const CountryPop = ({ onClick, name, score }) => {

  const [country, setCountry] = useState('')
  const [curscore, setScore] = useState(0)

  useEffect(() => {
    setCountry(name)
    setScore(score)
  }, [name, score])

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
