import './summarypost.css'
import React from 'react'
import Pie from '../../components/graph/Pie'
import { TbCrown } from 'react-icons/tb'
import { FaTimes } from 'react-icons/fa'
import axios from 'axios'
import { useState, useEffect } from 'react'
import useOutsideClick from '../../hooks/useOutsideClick'

const SummaryPost = ({ data, setVisible, visible }) => {

   const [topSpotInfo, setTopSpotInfo] = useState({})
   const { ref } = useOutsideClick(setVisible);

   const cuisToRegion = {
      "American": "United States",
      "Seafood": "United States",
      "Barbecue": "Southern USA",
      "Soul Food": "Southern USA",
      "Mexican": "Mexico",
      "Tacos": "Mexico",
      "Salvadoran": "Central America",
      "Guatemalan": "Central America",
      "Honduran": "Central America",
      "Nicaraguan": "Central America",
      "Panamanian": "Central America",
      "Venezuelan": "Venezuela",
      "Colombian": "Colombia",
      "Bolivian": "Bolivia",
      "Chilean": "Chile",
      "Brazilian": "Brazil",
      "Churrasco": "Brazil",
      "Argentinian": "Argentina",
      "Haitian": "Hispaniola",
      "Dominican": "Hispaniola",
      "Cuban": "Cuba",
      "Jamaican": "Jamaica",
      "Ethiopian": "Eastern Africa",
      "Sudanese": "Eastern Africa",
      "Kenyan": "Eastern Africa",
      "Nigerian": "Western Africa",
      "Moroccan": "Northern Africa",
      "Tunisian": "Northern Africa",
      "Egyptian": "Northern Africa",
      "Iranian": "Iran",
      "Persian": "Iran",
      "Scottish": "United Kingdom",
      "British": "United Kingdom",
      "Irish": "United Kingdom",
      "Portuguese": "Portugal",
      "Spanish": "Spain",
      "Tapas": "Spain",
      "Italian": "Italy",
      "Pizza": "Italy",
      "Greek": "Greece",
      "Mediterranean": "Greece",
      "Turkish": "Turkiye",
      "Russian": "Russia",
      "Ukrainian": "Ukraine",
      "Polish": "Poland",
      "German": "Germany",
      "French": "France",
      "Dutch": "Denmark",
      "Swedish": "Sweden",
      "Australian": "Australia",
      "Japanese": "Japan",
      "Ramen": "Japan",
      "Sushi": "Japan",
      "Korean": "South Korea",
      "KBBQ": "South Korea",
      "Peking Duck": "",
      "Jiangsu": "",
      "Dim Sum": "Southern China",
      "Chinese": "Southern China",
      "Hot Pot": "Western China",
      "Sichuan": "Western China",
      "Hawaiian": "Hawaii",
      "Indian": "India",
      "Thai": "Thailand",
      "Cambodian": "Cambodia",
      "Vietnamese": "Vietnam",
      "Filipino": "Philippines",
   }

   let name = cuisToRegion[data[0].cuisine]
   let spotsVisited = 0
   let scoreSum = 0
   let topSpot = null
   const graphData = new Array(10).fill(0)
   for (let i = 0; i < data.length; i += 1) {
      const cur = data[i]
      spotsVisited += cur.spotsVisited
      scoreSum += cur.scoreSum 
      if (!topSpot || cur.topSpotScore > topSpot.topSpotScore) {
         topSpot = cur
      }
      for (const key in cur.allScores) {
         graphData[key-1] += cur.allScores[key]
      }
   }

   useEffect(() => {
      const getTopSpotInfo = async () => {
         await axios.get(`/api/cuisines/blog/${topSpot.cuisine}/${topSpot.topSpot}`)
            .then((res) => {
               setTopSpotInfo(res.data)
            })
            .catch((err) => {
               console.log(`Error: ${err}`)
            })
      }
      getTopSpotInfo(topSpot)
   }, [topSpot])

   const averageScore = (scoreSum / spotsVisited).toFixed(2)
  
  return (
   <div ref={ref}>
      {visible && <div className="summaryPost">
         <div className="exit" onClick={() => setVisible(false)}>
            <FaTimes />
         </div>
         <div className="cuisineDetails">
            <h1>{name}</h1>
            <div><b>Spots Visited:</b> {spotsVisited}</div>
            <div><b>Average Score:</b> {averageScore}</div>
         </div>
         <div className="postGraph">
            <Pie data={graphData} title={"Test"}/>
         </div>
         <div className="postContent">
            <div className="winnerName">
               <h2>Top Spot</h2>
               <TbCrown size={30}/>
            </div>
            <div><b>Restaurant:</b> {topSpotInfo.restaurant}</div>
            <div><b>Location:</b> {topSpotInfo.location}</div>
            {"highlight" in topSpotInfo && topSpotInfo.highlight.length !== 0 &&
               <div><b>Highlight:</b> {topSpotInfo.highlight}
            </div>}
            <div><b>Rating:</b> {topSpotInfo.rating}</div>
         </div>
      </div>}
   </div>
  )
}

export default SummaryPost