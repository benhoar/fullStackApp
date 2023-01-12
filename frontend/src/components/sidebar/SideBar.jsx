import './sidebar.css'
import Button from './Button'
import Rater from '../countrylist/CountryList'
import SideBlog from '../sideblog/SideBlog'
import { useState, useEffect } from 'react' 
import { useAuthContext } from '../../hooks/useAuthContext'
const axios = require('axios').default

const SideBar = ({ cuisineTypes, setSelected, selected, mapDispatch }) => {
  const st1 = [{paddingLeft:'9px'}, {marginLeft:'23px'}, {zIndex:'105'}];
  const st2 = [{paddingLeft:'16px'}, {marginLeft:'-16px'}];
  const st3 = [{paddingLeft:'9px'}, {marginLeft:'4px'}];
  const st4 = [{paddingLeft:'12px'}, {marginLeft:'0px'}];
  const [rater, setRater] = useState(false)
  const [sideBlog, setSideBlog] = useState(false)
  const { user } = useAuthContext()
  const [visited, setVisited] = useState(null)

  const randomDinner = () => {
    const cuisines = Object.keys(cuisineTypes)
    const winner = cuisines[Math.floor(Math.random() * cuisines.length)]
    window.open(`https://www.google.com/search?q=${winner}+food+near+me`)
  }


  useEffect(() => {
    const getVisited = async () => {
      await axios.get("/api/cuisines",
        {
        headers: { 'Authorization': `Bearer ${user.token}` }
        }
      ).then((res) => {
          const beenTo = new Set()
          for (let i = 0; i < res.data.length; i++) {
            const cur = res.data[i]
            if (cuisineTypes[cur.cuisine]) {
              beenTo.add(cuisineTypes[cur.cuisine])
            }
            else {
              console.log(cur)
            }
          }
          setVisited(beenTo)
        }
      ).catch((e) => console.log(e))
    }
    if (user) {
      getVisited()
    }
  }, [user, cuisineTypes])
  
  const setGold = () => {
    if (visited) {
      const beenTo = Array.from(visited)
      for (let i = 0; i < beenTo.length; i++) {
        mapDispatch({type: "SET VISIBILITY", country: beenTo[i], visible: true})
      }
      setTimeout(() => {
        for (let i = 0; i < beenTo.length; i++) {
          mapDispatch({type: "SET VISIBILITY", country: beenTo[i], visible: false})
        }
      }, 3000)
    }
  }

  return (
      <div className="buttonWrapper">
        {(!rater && !sideBlog) && <div className="buttons">
          <Button image={"images/globe2.png"} text={"Highlight Visits!"} style={st1} onClick={() => setGold()}/>
          <Button 
                  image={"images/revs2.png"} 
                  text={"Add a Note!"} 
                  style={st2}
                  onClick={() => setSideBlog(true)}
            />
          <Button image={"images/1plate2.png"} text={"Find a Score!"} style={st3} onClick={() => setRater(true)}/>
          <Button 
                  image={"images/diner3.png"} 
                  text={"Find a Meal!"} 
                  style={st4}
                  onClick={() => randomDinner()}
            />
        </div>}
        {rater && <Rater cuisineTypes={cuisineTypes} setRater={setRater} setSelected={setSelected} selected={selected} mapDispatch={mapDispatch}/>}
        {sideBlog && <SideBlog onClick={() => {setSideBlog(false)}}/>}
      </div>
  )
}

export default SideBar