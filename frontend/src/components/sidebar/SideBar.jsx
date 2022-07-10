import './sidebar.css'
import Button from './Button'

const SideBar = () => {
  const st1 = [{paddingLeft:'0px'}, {marginLeft:'8px'}];
  const st2 = [{paddingLeft:'8px'}, {marginLeft:'13px'}];
  const st3 = [{paddingLeft:'2px'}, {marginLeft:'6px'}];
  const st4 = [{paddingLeft:'5px'}, {marginLeft:'10px'}];

  return (
      <div className="buttons">
         <Button image={"images/1plate.png"} text={"Show Scores!"} style={st1}/>
         <Button image={"images/revs.png"} text={"Add a Note!"} style={st2}/>
         <Button image={"images/globe.png"} text={"Pick a Region!"} style={st3}/>
         <Button image={"images/diner.png"} text={"Find a Meal!"} style={st4}/>
      </div>
  )
}

export default SideBar