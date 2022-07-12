import TopBar from '../../components/navbar/TopBar'
import SideBar from '../../components/sidebar/SideBar'
import Map from './Map'
import Footer from '../../components/footer/Footer'
import Marker from '../../components/marker/Marker'
import './homepage.css'

const HomePage = () => {
  return (
    <div>
      <TopBar className="topBar"/>
      <div className="hero">
        <SideBar className="sideBar"/>
        <div className="mapWrapper">
          <Map className="theMap" />
          <Marker name={"USA1"} position={{top:"227px", left:"273px"}}/>
          <Marker name={"USA2"} position={{top:"260px", left:"335px"}}/>
          <Marker name={"Mexico"} position={{top:"285px", left:"240px"}}/>
          <Marker name={"CAm"} position={{top:"335px", left:"277px"}}/>
          <Marker name={"Venezuela"} position={{top:"290px", left:"88px"}}/>
          <Marker name={"Colombia"} position={{top:"305px", left:"55px"}}/>
          <Marker name={"Bolivia"} position={{top:"384px", left:"88px"}}/>
          <Marker name={"Chile"} position={{top:"465px", left:"35px"}}/>
          <Marker name={"Brazil"} position={{top:"355px", left:"120px"}}/>
          <Marker name={"Argentina"} position={{top:"505px", left:"112px"}}/>
          <Marker name={"Hispaniola"} position={{top:"469px", left:"392px"}}/>
          <Marker name={"Cuba"} position={{top:"440px", left:"319px"}}/>
          <Marker name={"Jamaica"} position={{top:"540px", left:"305px"}}/>
          <Marker name={"SAf"} position={{top:"485px", left:"502px"}}/>
          <Marker name={"CAf"} position={{top:"415px", left:"490px"}}/>
          <Marker name={"EAf"} position={{top:"380px", left:"575px"}}/>
          <Marker name={"WAf"} position={{top:"375px", left:"415px"}}/>
          <Marker name={"NAf"} position={{top:"305px", left:"455px"}}/>
          <Marker name={"Iran"} position={{top:"455px", left:"742px"}}/>
          <Marker name={"UK"} position={{top:"430px", left:"855px"}}/>
          <Marker name={"Portugal"} position={{top:"520px", left:"860px"}}/>
          <Marker name={"Spain"} position={{top:"533px", left:"905px"}}/>
          <Marker name={"Italy"} position={{top:"555px", left:"966px"}}/>
          <Marker name={"Greece"} position={{top:"560px", left:"1021px"}}/>
          <Marker name={"Turkey"} position={{top:"535px", left:"1135px"}}/>
          <Marker name={"Russia"} position={{top:"435px", left:"1118px"}}/>
          <Marker name={"Ukraine"} position={{top:"465px", left:"1082px"}}/>
          <Marker name={"Poland"} position={{top:"450px", left:"1022px"}}/>
          <Marker name={"Germany"} position={{top:"462px", left:"972px"}}/>
          <Marker name={"France"} position={{top:"482px", left:"925px"}}/>
          <Marker name={"Denmark"} position={{top:"412px", left:"948px"}}/>
          <Marker name={"Sweden"} position={{top:"350px", left:"999px"}}/>
          <Marker name={"Australia"} position={{top:"105px", left:"1100px"}}/>
          <Marker name={"Japan"} position={{top:"150px", left:"1015px"}}/>
          <Marker name={"South Korea"} position={{top:"140px", left:"940px"}}/>
          <Marker name={"EChina"} position={{top:"150px", left:"845px"}}/>
          <Marker name={"SChina"} position={{top:"235px", left:"823px"}}/>
          <Marker name={"WChina"} position={{top:"185px", left:"713px"}}/>
          <Marker name={"Hawaii"} position={{top:"123px", left:"565px"}}/>
          <Marker name={"India"} position={{top:"233px", left:"630px"}}/>
          <Marker name={"Thailand"} position={{top:"288px", left:"774px"}}/>
          <Marker name={"Cambodia"} position={{top:"308px", left:"790px"}}/>
          <Marker name={"Vietnam"} position={{top:"295px", left:"827px"}}/>
          <Marker name={"Philippines"} position={{top:"348px", left:"857px"}}/>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HomePage