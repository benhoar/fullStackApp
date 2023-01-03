import './countrylist.css'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import SummaryPost from '../summarypost/SummaryPost'
const axios = require('axios').default

const CountryList = ({ onClick }) => {
   const [country, setCountry] = useState('')
   const [pop, setPop] = useState(false)
   const [notFound, setNotFound] = useState(false)
   const [popData, setPopData] = useState([])

   const regionSorter = (regions) => {
      return Object.keys(regions).sort().reduce(function(res, key) {res[key]=regions[key]; return res}, {})
    }
  
   let regions = {
      "United States":"USA1",
      "Southern USA":"USA2",
      "Mexico":"Mexico",
      "Central America":"CAm",
      "Venezuela":"Venezuela",
      "Colombia":"Colombia",
      "Bolivia":"Bolivia",
      "Chile":"Chile",
      "Brazil":"Brazil",
      "Argentina":"Argentina",
      "Hispaniola":"Hispaniola",
      "Cuba":"Cuba",
      "Jamaica":"Jamaica",
      "Southern Africa":"SAf",
      "Central Africa":"CAf",
      "Eastern Africa":"EAf",
      "Western Africa":"WAf",
      "Northern Africa":"NAf",
      "Iran":"Iran",
      "United Kingdom":"UK",
      "Portugal":"Portugal",
      "Spain":"Spain",
      "Italy":"Italy",
      "Greece":"Greece",
      "Turkiye":"Turkiye",
      "Russia":"Russia",
      "Ukraine":"Ukraine",
      "Poland":"Poland",
      "Germany":"Germany",
      "France":"France",
      "Denmark":"Denmark",
      "Sweden":"Sweden",
      "Australia":"Australia",
      "Japan":"Japan",
      "South Korea":"South Korea",
      "":"EChina",
      "Southern China":"SChina",
      "Western China":"WChina",
      "Hawaii":"Hawaii",
      "India":"India",
      "Thailand":"Thailand",
      "Cambodia":"Cambodia",
      "Vietnam":"Vietnam",
      "Philippines":"Philippines",
   }

   const regionInfo = {
      "USA1": {
        mapPos: ["223px", "273px"],
        primary: "United States",
        cuisines: ["American", "Seafood", "Burgers"]
      },
      "USA2": {
        mapPos: ["256px", "335px"],
        primary: "Southern USA",
        cuisines: ["Barbecue", "Soul Food"]
      },
      "Mexico": {
        mapPos: ["281px", "240px"],
        primary: "Mexico",
        cuisines: ["Mexican", "Tacos"],
      },
      "CAm": {
        mapPos: ["331px", "277px"],
        primary: "Central America",
        cuisines: ["Salvadoran", "Guatemalan", "Honduran", "Nicaraguan", "Panamanian"]
      },
      "Venezuela": {
        mapPos: ["286px", "88px"],
        primary: "Venezuela",
        cuisines: ["Venezuelan"]
      },
      "Colombia": {
        mapPos: ["301px", "55px"],
        primary: "Colombia",
        cuisines: ["Colombian"]
      },
      "Bolivia": {
        mapPos: ["380px", "88px"],
        primary: "Bolivia",
        cuisines: ["Bolivian"]
      },
      "Chile": {
        mapPos: ["461px", "35px"],
        primary: "Chile",
        cuisines: ["Chilean"]
      },
      "Brazil": {
        mapPos: ["351px", "120px"],
        primary: "Brazil",
        cuisines: ["Brazilian", "Churrasco"]
      },
      "Argentina": {
        mapPos: ["501px", "112px"],
        primary: "Argentina",
        cuisines: ["Argentinian"]
      },
      "Hispaniola": {
        mapPos: ["465px", "392px"],
        primary: "Hispaniola",
        cuisines: ["Haitian", "Dominican"]
      },
      "Cuba": {
        mapPos: ["436px", "319px"],
        primary: "Cuba",
        cuisines: ["Cuban"]
      },
      "Jamaica": {
        mapPos: ["536px", "305px"],
        primary: "Jamaica",
        cuisines: ["Jamaican"]
      },
      "SAf": {
        mapPos: ["481px", "502px"],
        primary: "Southern Africa",
        cuisines: [] //fill
      },
      "CAf": {
        mapPos: ["411px", "490px"],
        primary: "Central Africa",
        cuisines: [] //fill
      },
      "EAf": {
        mapPos: ["376px", "575px"],
        primary: "Eastern Africa",
        cuisines: ["Ethiopian", "Sudanese", "Kenyan"]
      },
      "WAf": {
        mapPos: ["371px", "415px"],
        primary: "Western Africa",
        cuisines: ["Nigerian"]
      },
      "NAf": {
        mapPos: ["301px", "455px"],
        primary: "Northern Africa",
        cuisines: ["Moroccan", "Tunisian", "Egyptian"]
      },
      "Iran": {
        mapPos: ["451px", "742px"],
        primary: "Iran",
        cuisines: ["Iranian", "Persian"]
      },
      "UK": {
        mapPos: ["426px", "855px"],
        primary: "United Kingdom",
        cuisines: ["Scottish", "British", "Irish"]
      },
      "Portugal": {
        mapPos: ["516px", "860px"],
        primary: "Portugal",
        cuisines: ["Portuguese"]
      },
      "Spain": {
        mapPos: ["532px", "905px"],
        primary: "Spain",
        cuisines: ["Spanish", "Tapas"]
      },
      "Italy": {
        mapPos: ["551px", "966px"],
        primary: "Italy",
        cuisines: ["Italian", "Pizza"]
      },
      "Greece": {
        mapPos: ["556px", "1021px"],
        primary: "Greece",
        cuisines: ["Greek", "Mediterranean"]
      },
      "Turkiye": {
        mapPos: ["531px", "1135px"],
        primary: "Turkiye",
        cuisines: ["Turkish"]
      },
      "Russia": {
        mapPos: ["431px", "1118px"],
        primary: "Russia",
        cuisines: ["Russian"]
      },
      "Ukraine": {
        mapPos: ["461px", "1082px"],
        primary: "Ukraine",
        cuisines: ["Ukrainian"]
      },
      "Poland": {
        mapPos: ["446px", "1022px"],
        primary: "Poland",
        cuisines: ["Polish"]
      },
      "Germany": {
        mapPos: ["458px", "972px"],
        primary: "Germany",
        cuisines: ["German"]
      },
      "France": {
        mapPos: ["478px", "925px"],
        primary: "France",
        cuisines: ["French"]
      },
      "Denmark": {
        mapPos: ["408px", "948px"],
        primary: "Denmark",
        cuisines: ["Dutch"]
      },
      "Sweden": {
        mapPos: ["346px", "999px"],
        primary: "Sweden",
        cuisines: ["Swedish"]
      },
      "Australia": {
        mapPos: ["101px", "1100px"],
        primary: "Australia",
        cuisines: ["Australian"]
      },
      "Japan": {
        mapPos: ["146px", "1015px"],
        primary: "Japan",
        cuisines: ["Japanese", "Ramen", "Sushi"]
      },
      "South Korea": {
        mapPos: ["136px", "940px"],
        primary: "South Korea",
        cuisines: ["Korean", "KBBQ"]
      },
      "EChina": {
        mapPos: ["146px", "845px"],
        primary: "",
        cuisines: ["Peking Duck", "Jiangsu"]
      },
      "SChina": {
        mapPos: ["231px", "823px"],
        primary: "Southern China",
        cuisines: ["Dim Sum", "Chinese"]
      },
      "WChina": {
        mapPos: ["181px", "713px"],
        primary: "Western China",
        cuisines: ["Hot Pot", "Sichuan"]
      },
      "Hawaii": {
        mapPos: ["119px", "565px"],
        primary: "Hawaii",
        cuisines: ["Hawaiian"]
      },
      "India": {
        mapPos: ["229px", "630px"],
        primary: "India",
        cuisines: ["Indian"]
      },
      "Thailand": {
        mapPos: ["284px", "774px"],
        primary: "Thailand",
        cuisines: ["Thai"]
      },
      "Cambodia": {
        mapPos: ["304px", "790px"],
        primary: "Cambodia",
        cuisines: ["Cambodian"]
      },
      "Vietnam": {
        mapPos: ["291px", "827px"],
        primary: "Vietnam",
        cuisines: ["Vietnamese"]
      },
      "Philippines": {
        mapPos: ["344px", "857px"],
        primary: "Philippines",
        cuisines: ["Filipino"]
      },
   }

   const getCountryData = async (val) => {
      const cuisData = []
      for (const cuisine of regionInfo[val].cuisines) {
        await axios.get(`/api/cuisines/cuisine/${cuisine}`)
          .then((res) => {
            cuisData.push(res.data)
          })
          .catch(() => {
            console.log(cuisine, " not found")
          })
      }
      if (cuisData.length === 0) {
        return null
      }
      else {
        return cuisData
      }
   } 

   regions = regionSorter(regions)
   return (
      <form className="formWrapper">
        <div className="headerCancel">
            <FaTimes className="cancelBlog" style={{color:"#1B3A20"}} onClick={() => onClick()}/>
        </div>
        <ul className="countriesList">
          {Object.entries(regions).map(([key, value]) => {
              return <li className={country === value ? "selectedCountry" : "countryItem"}
                          key={value} 
                          onClick={ async () => {
                            setCountry(value)
                            await getCountryData(value)
                              .then((data) => {
                                if (data) {
                                  setPopData(data)
                                  setPop(true)
                                }
                                else {
                                  setNotFound(true)
                                  setTimeout(() => {setNotFound(false)}, 2000)
                                }
                            })
                          }}
                      >
                          {key}
                      </li>
          })}
        </ul>
        {pop && 
          <div className="summaryPop" style={{left:"310%", top:"-8%"}}>
              <SummaryPost data={popData} visible={pop} setVisible={setPop}/>  
          </div>
        }
        {notFound &&
          <div id="sideNotFound">No Ratings</div>
        }
      </form>
   )
}

export default CountryList
