import './map.css'
import Marker from './marker/Marker'
import CountryPop from '../countrypop/CountryPop'
import { CSSTransition } from 'react-transition-group'
import { useState, useEffect } from 'react'
import extractData from '../../scripts/homeData'
const axios = require('axios').default

const Map = () => {

  const [active, setActive] = useState(false)
  const [country, setCountry] = useState('')
  const [score, setScore] = useState(0)
  const [blogs, setBlogs] = useState([])

  // Get Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/blogs/")
        setBlogs(res.data)
        extractData(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchBlogs()
  }, [blogs.length]) // note this dependency is pretty irrelevant

  const onClick = (name, curScore) => {
    setActive(true)
    setCountry(name)
    setScore(curScore)
  }

  return (
    <div className="wrapper">
      <CSSTransition 
        in={active}
        timeout={200}
        classNames="compWrapper"
        unmountOnExit
      >
        <div className="compWrapper">
          <CountryPop onClick={() => setActive(false)} name={country} score={score}/>
        </div>
      </CSSTransition>
      <img src="images/bg3.png" className="map" alt="" onClick={() => setActive(false)}/>
      <Marker name={"USA1"} position={{top:"223px", left:"273px"}} onClick={() => onClick("USA 1", 2)}/>
      <Marker name={"USA2"} position={{top:"256px", left:"335px"}} onClick={() => onClick("USA 2", 1)}/>
      <Marker name={"Mexico"} position={{top:"281px", left:"240px"}} onClick={() => onClick("Mexico", 3)}/>
      <Marker name={"CAm"} position={{top:"331px", left:"277px"}} onClick={() => onClick("Cent. Amer.", 0)}/>
      <Marker name={"Venezuela"} position={{top:"286px", left:"88px"}} onClick={() => onClick("Venezuela", 2)}/>
      <Marker name={"Colombia"} position={{top:"301px", left:"55px"}} onClick={() => onClick("Colombia", 3)}/>
      <Marker name={"Bolivia"} position={{top:"380px", left:"88px"}} onClick={() => onClick("Bolivia", 1)}/>
      <Marker name={"Chile"} position={{top:"461px", left:"35px"}} onClick={() => onClick("Chile", 2)}/>
      <Marker name={"Brazil"} position={{top:"351px", left:"120px"}} onClick={() => onClick("Brazil", 3)}/>
      <Marker name={"Argentina"} position={{top:"501px", left:"112px"}} onClick={() => onClick("Argentina", 0)}/>
      <Marker name={"Hispaniola"} position={{top:"465px", left:"392px"}} onClick={() => onClick("Hispaniola", 1)}/>
      <Marker name={"Cuba"} position={{top:"436px", left:"319px"}} onClick={() => onClick("Cuba", 1)}/>
      <Marker name={"Jamaica"} position={{top:"536px", left:"305px"}} onClick={() => onClick("Jamaica", 3)}/>
      <Marker name={"SAf"} position={{top:"481px", left:"502px"}} onClick={() => onClick("S. Africa", 3)}/>
      <Marker name={"CAf"} position={{top:"411px", left:"490px"}} onClick={() => onClick("C. Africa", 3)}/>
      <Marker name={"EAf"} position={{top:"376px", left:"575px"}} onClick={() => onClick("E. Africa", 2)}/>
      <Marker name={"WAf"} position={{top:"371px", left:"415px"}} onClick={() => onClick("W. Africa", 2)}/>
      <Marker name={"NAf"} position={{top:"301px", left:"455px"}} onClick={() => onClick("N. Africa", 1)}/>
      <Marker name={"Iran"} position={{top:"451px", left:"742px"}} onClick={() => onClick("Iran", 3)}/>
      <Marker name={"UK"} position={{top:"426px", left:"855px"}} onClick={() => onClick("United Kingdom", 3)}/>
      <Marker name={"Portugal"} position={{top:"516px", left:"860px"}} onClick={() => onClick("Portugal", 1)}/>
      <Marker name={"Spain"} position={{top:"532px", left:"905px"}} onClick={() => onClick("Spain", 2)}/>
      <Marker name={"Italy"} position={{top:"551px", left:"966px"}} onClick={() => onClick("Italy", 3)}/>
      <Marker name={"Greece"} position={{top:"556px", left:"1021px"}} onClick={() => onClick("Greece", 0)}/>
      <Marker name={"Turkey"} position={{top:"531px", left:"1135px"}} onClick={() => onClick("Turkey", 2)}/>
      <Marker name={"Russia"} position={{top:"431px", left:"1118px"}} onClick={() => onClick("Russia", 2)}/>
      <Marker name={"Ukraine"} position={{top:"461px", left:"1082px"}} onClick={() => onClick("Ukraine", 3)}/>
      <Marker name={"Poland"} position={{top:"446px", left:"1022px"}} onClick={() => onClick("Poland", 1)}/>
      <Marker name={"Germany"} position={{top:"458px", left:"972px"}} onClick={() => onClick("Germany", 2)}/>
      <Marker name={"France"} position={{top:"478px", left:"925px"}} onClick={() => onClick("France", 2)}/>
      <Marker name={"Denmark"} position={{top:"408px", left:"948px"}} onClick={() => onClick("Denmark", 1)}/>
      <Marker name={"Sweden"} position={{top:"346px", left:"999px"}} onClick={() => onClick("Sweden", 0)}/>
      <Marker name={"Australia"} position={{top:"101px", left:"1100px"}} onClick={() => onClick("Australia", 2)}/>
      <Marker name={"Japan"} position={{top:"146px", left:"1015px"}} onClick={() => onClick("Japan", 2)}/>
      <Marker name={"South Korea"} position={{top:"136px", left:"940px"}} onClick={() => onClick("South Korea", 3)}/>
      <Marker name={"EChina"} position={{top:"146px", left:"845px"}} onClick={() => onClick("E. China", 1)}/>
      <Marker name={"SChina"} position={{top:"231px", left:"823px"}} onClick={() => onClick("S. China", 0)}/>
      <Marker name={"WChina"} position={{top:"181px", left:"713px"}} onClick={() => onClick("W. China", 1)}/>
      <Marker name={"Hawaii"} position={{top:"119px", left:"565px"}} onClick={() => onClick("Hawaii", 2)}/>
      <Marker name={"India"} position={{top:"229px", left:"630px"}} onClick={() => onClick("India", 2)}/>
      <Marker name={"Thailand"} position={{top:"284px", left:"774px"}} onClick={() => onClick("Thailand", 1)}/>
      <Marker name={"Cambodia"} position={{top:"304px", left:"790px"}} onClick={() => onClick("Cambodia", 0)}/>
      <Marker name={"Vietnam"} position={{top:"291px", left:"827px"}} onClick={() => onClick("Vietnam", 2)}/>
      <Marker name={"Philippines"} position={{top:"344px", left:"857px"}} onClick={() => onClick("Philippines", 2)}/>
    </div>
  )
}

export default Map