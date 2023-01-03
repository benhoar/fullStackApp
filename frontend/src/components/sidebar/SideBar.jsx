import './sidebar.css'
import Button from './Button'
import Rater from '../countrylist/CountryList'
import SideBlog from '../sideblog/SideBlog'
import { useState } from 'react' 

const SideBar = () => {
  const st1 = [{paddingLeft:'9px'}, {marginLeft:'13px'}];
  const st2 = [{paddingLeft:'16px'}, {marginLeft:'-4px'}];
  const st3 = [{paddingLeft:'9px'}, {marginLeft:'18px'}];
  const st4 = [{paddingLeft:'12px'}, {marginLeft:'0px'}];
  const [rater, setRater] = useState(false)
  const [sideBlog, setSideBlog] = useState(false)

  const randomDinner = () => {
    const cuisines = [
                      "American", "BBQ", "Mexican", "Honduran", "Guatamalan", "Brazilian",
                      "Colombian", "Venezuelan", "Bolivian", "Chilean", "Argentinean", "Jamaican",
                      "Haitian", "Cuban", "Ethiopian", "Moroccan", "Sudanese", "Indian", "Hawaiian",
                      "Australian", "Japanese", "Sushi", "Indian", "Chinese", "Cambodian", "Thai",
                      "Vietnamese", "Persian", "Philippino", "British", "Portuguese", "Spanish", "French",
                      "Italian", "Greek", "Turkish", "Russian", "Ukrainian", "Swedish", "Dutch", "German",
                      "Polish", "Pizza", "Ramen"
                    ]
    const winner = cuisines[Math.floor(Math.random() * cuisines.length)]
    window.open(`https://www.google.com/search?q=${winner}+food+near+me`)
  }

  return (
      <div className="buttonWrapper">
        {(!rater && !sideBlog) && <div className="buttons">
          <Button image={"images/1plate2.png"} text={"Show Scores!"} style={st1}/>
          <Button 
                  image={"images/revs2.png"} 
                  text={"Add a Note!"} 
                  style={st2}
                  onClick={() => setSideBlog(true)}
            />
          <Button image={"images/globe2.png"} text={"Find a Score!"} style={st3} onClick={() => setRater(true)}/>
          <Button 
                  image={"images/diner3.png"} 
                  text={"Find a Meal!"} 
                  style={st4}
                  onClick={() => randomDinner()}
            />
        </div>}
        {rater && <Rater onClick={() => {setRater(false)}} />}
        {sideBlog && <SideBlog onClick={() => {setSideBlog(false)}}/>}
      </div>
  )
}

export default SideBar