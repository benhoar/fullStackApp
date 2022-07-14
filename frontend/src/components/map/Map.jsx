import './map.css'
import Marker from './marker/Marker'

const Map = () => {
  return (
    <div className="wrapper">
      <img src="images/bg3.png" className="map" alt="" />
      <Marker name={"USA1"} position={{top:"223px", left:"273px"}}/>
      <Marker name={"USA2"} position={{top:"256px", left:"335px"}}/>
      <Marker name={"Mexico"} position={{top:"281px", left:"240px"}}/>
      <Marker name={"CAm"} position={{top:"331px", left:"277px"}}/>
      <Marker name={"Venezuela"} position={{top:"286px", left:"88px"}}/>
      <Marker name={"Colombia"} position={{top:"301px", left:"55px"}}/>
      <Marker name={"Bolivia"} position={{top:"380px", left:"88px"}}/>
      <Marker name={"Chile"} position={{top:"461px", left:"35px"}}/>
      <Marker name={"Brazil"} position={{top:"351px", left:"120px"}}/>
      <Marker name={"Argentina"} position={{top:"501px", left:"112px"}}/>
      <Marker name={"Hispaniola"} position={{top:"465px", left:"392px"}}/>
      <Marker name={"Cuba"} position={{top:"436px", left:"319px"}}/>
      <Marker name={"Jamaica"} position={{top:"536px", left:"305px"}}/>
      <Marker name={"SAf"} position={{top:"481px", left:"502px"}}/>
      <Marker name={"CAf"} position={{top:"411px", left:"490px"}}/>
      <Marker name={"EAf"} position={{top:"376px", left:"575px"}}/>
      <Marker name={"WAf"} position={{top:"371px", left:"415px"}}/>
      <Marker name={"NAf"} position={{top:"301px", left:"455px"}}/>
      <Marker name={"Iran"} position={{top:"451px", left:"742px"}}/>
      <Marker name={"UK"} position={{top:"426px", left:"855px"}}/>
      <Marker name={"Portugal"} position={{top:"516px", left:"860px"}}/>
      <Marker name={"Spain"} position={{top:"532px", left:"905px"}}/>
      <Marker name={"Italy"} position={{top:"551px", left:"966px"}}/>
      <Marker name={"Greece"} position={{top:"556px", left:"1021px"}}/>
      <Marker name={"Turkey"} position={{top:"531px", left:"1135px"}}/>
      <Marker name={"Russia"} position={{top:"431px", left:"1118px"}}/>
      <Marker name={"Ukraine"} position={{top:"461px", left:"1082px"}}/>
      <Marker name={"Poland"} position={{top:"446px", left:"1022px"}}/>
      <Marker name={"Germany"} position={{top:"458px", left:"972px"}}/>
      <Marker name={"France"} position={{top:"478px", left:"925px"}}/>
      <Marker name={"Denmark"} position={{top:"408px", left:"948px"}}/>
      <Marker name={"Sweden"} position={{top:"346px", left:"999px"}}/>
      <Marker name={"Australia"} position={{top:"101px", left:"1100px"}}/>
      <Marker name={"Japan"} position={{top:"146px", left:"1015px"}}/>
      <Marker name={"South Korea"} position={{top:"136px", left:"940px"}}/>
      <Marker name={"EChina"} position={{top:"146px", left:"845px"}}/>
      <Marker name={"SChina"} position={{top:"231px", left:"823px"}}/>
      <Marker name={"WChina"} position={{top:"181px", left:"713px"}}/>
      <Marker name={"Hawaii"} position={{top:"119px", left:"565px"}}/>
      <Marker name={"India"} position={{top:"229px", left:"630px"}}/>
      <Marker name={"Thailand"} position={{top:"284px", left:"774px"}}/>
      <Marker name={"Cambodia"} position={{top:"304px", left:"790px"}}/>
      <Marker name={"Vietnam"} position={{top:"291px", left:"827px"}}/>
      <Marker name={"Philippines"} position={{top:"344px", left:"857px"}}/>
    </div>
  )
}

export default Map