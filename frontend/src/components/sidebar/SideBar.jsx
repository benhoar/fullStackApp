import './sidebar.css'
import Button from './Button'

const SideBar = () => {
  const st1 = [{paddingLeft:'9px'}, {marginLeft:'13px'}];
  const st2 = [{paddingLeft:'16px'}, {marginLeft:'0px'}];
  const st3 = [{paddingLeft:'9px'}, {marginLeft:'18px'}];
  const st4 = [{paddingLeft:'12px'}, {marginLeft:'0px'}];

  return (
      <div className="buttons">
         <Button image={"images/1plate2.png"} text={"Show Scores!"} style={st1}/>
         <Button image={"images/revs2.png"} text={"Add a Note!"} style={st2}/>
         <Button image={"images/globe2.png"} text={"Pick a Region!"} style={st3}/>
         <Button image={"images/diner3.png"} text={"Find a Meal!"} style={st4}/>
      </div>
  )
}

export default SideBar