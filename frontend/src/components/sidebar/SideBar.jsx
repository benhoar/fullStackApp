import './sidebar.css'
import Button from './Button'

const SideBar = () => {
  const st1 = [{paddingLeft:'0px'}, {marginLeft:'0px'}];
  const st2 = [{paddingLeft:'8px'}, {marginLeft:'7px'}];
  const st3 = [{paddingLeft:'2px'}, {marginLeft:'0px'}];
  const st4 = [{paddingLeft:'5px'}, {marginLeft:'4px'}];

  return (
      <div className="buttons">
         <Button image={"images/1plate.png"} text={"Show Scores!"} style={st1}/>
         <Button image={"images/revs.png"} text={"Add a Note!"} style={st2}/>
         <Button image={"images/globe.png"} text={"Pick a Region!"} style={st3}/>
         <Button image={"images/diner.png"} text={"Find a Meal!"} style={st4}/>
      </div>
  )
}

/* <div className="buttons">
<div id="plates" className="btn-1">
   <img src="images/1plate.png" alt="diner"/>
   <a href="/">Show Scores!</a>
</div>
<div id="revs" className="btn-2">
   <img src="images/revs.png" alt="diner"/>
   <a href="/">Add a Note!</a>
</div>
<div id="regions" className="btn-3">
   <img src="images/globe.png" alt="diner"/>
   <a href="/">Pick a Region!</a>
</div>
<div id="meal" className="btn-4">
   <img src="images/diner.png" alt="diner"/>
   <a href="/">Find a Meal!</a>
</div
</div> */

export default SideBar