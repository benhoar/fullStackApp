import './marker.css'
import SummaryPost from '../../summarypost/SummaryPost'
import { useState } from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'

const axios = require('axios').default

const Marker = ({ details }) => {

  const [popData, setPopData] = useState([])
  const [pop, setPop] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const { user } = useAuthContext()
  // const cuisineCountryMap = {
  //   "American": "USA1",
  //   "Seafood": "USA1",
  //   "Barbecue": "USA2",
  //   "Soul Food": "USA2",
  //   "Mexican": "Mexico",
  //   "Tacos": "Mexico",
  //   "Salvadoran": "CAm",
  //   "Guatemalan": "CAm",
  //   "Honduran": "CAm",
  //   "Nicaraguan": "CAm",
  //   "Panamanian": "CAm",
  //   "Venezuelan": "Venezuela",
  //   "Colombian": "Colombia",
  //   "Bolivian": "Bolivia",
  //   "Chilean": "Chile",
  //   "Brazilian": "Brazil",
  //   "Churrasco": "Brazil",
  //   "Argentinian": "Argentina",
  //   "Haitian": "Hispaniola",
  //   "Dominican": "Hispaniola",
  //   "Cuban": "Cuba",
  //   "Jamaican": "Jamaica",
  //   "Ethiopian": "EAf",
  //   "Sudanese": "EAf",
  //   "Kenyan": "EAf",
  //   "Nigerian": "WAf",
  //   "Moroccan": "NAf",
  //   "Tunisian": "NAf",
  //   "Egyptian": "NAf",
  //   "Iranian": "Iran",
  //   "Persian": "Iran",
  //   "Scottish": "UK",
  //   "British": "UK",
  //   "Irish": "UK",
  //   "Portuguese": "Portugal",
  //   "Spanish": "Spain",
  //   "Tapas": "Spain",
  //   "Italian": "Italy",
  //   "Pizza": "Italy",
  //   "Greek": "Greece",
  //   "Mediterranean": "Greece",
  //   "Turkish": "Turkiye",
  //   "Russian": "Russia",
  //   "Ukrainian": "Ukraine",
  //   "Polish": "Poland",
  //   "German": "Germany",
  //   "French": "France",
  //   "Dutch": "Denmark",
  //   "Swedish": "Sweden",
  //   "Australian": "Australia",
  //   "Japanese": "Japan",
  //   "Ramen": "Japan",
  //   "Sushi": "Japan",
  //   "Korean": "South Korea",
  //   "KBBQ": "South Korea",
  //   "Peking Duck": "EChina",
  //   "Jiangsu": "EChina",
  //   "Dim Sum": "SChina",
  //   "Chinese": "SChina",
  //   "Hot Pot": "WChina",
  //   "Sichuan": "WChina",
  //   "Hawaiian": "Hawaii",
  //   "Indian": "India",
  //   "Thai": "Thailand",
  //   "Cambodian": "Cambodia",
  //   "Vietnamese": "Vietnam",
  //   "Filipino": "Philippines",
  // }

  const getCuisines = async () => {
    const cuisData = []
    for (const cuisine of details.cuisines) {
      await axios.get(`/api/cuisines/cuisine/${cuisine}`,
        {
          headers: { 'Authorization': `Bearer ${user.token}` }
        }
      ).then((res) => {
          cuisData.push(res.data)
        }
      ).catch(() => {
          console.log(cuisine, " not found")
        }
      )
    }
    if (cuisData.length === 0) {
      return null
    }
    else {
      return cuisData
    }
  }

  return (
    <div className="">
      <div className="markerWrap" 
          style={{top:details.mapPos[0], left:details.mapPos[1]}} 
      >
        <div className="marker" 
            alt={details.name}
            onClick={async () => {
              const data = await getCuisines(); 
              if (data) {
                setPopData(data)
                setPop(true)
              }
              else {
                setNotFound(true)
                setTimeout(() => {setNotFound(false)}, 2000)
              }
            }}>
          <div className="circle"></div>
        </div>
    </div>
    <div className="summaryPop">
        {pop && <SummaryPost data={popData} visible={pop} setVisible={setPop}/>}
    </div>
    {notFound && 
      <div className="notFound">
        No Data Yet!
      </div>
    }
   </div>
  )
}

export default Marker