import './map.css'
import Marker from './marker/Marker'

const Map = () => {

  const markers = {
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

  return (
    <div className="wrapper">
      <img src="images/bg3.png" className="map" alt=""/>
      {Object.entries(markers).map(([k, val]) => {
        return <Marker key={k} details={val}/>
      })}
    </div>
  )
}

export default Map