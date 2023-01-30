import React from 'react'
import './viewslider.css'

const ViewSlider = ({sliderClick, publicView}) => {
  return (
   <div className="viewSliderHolder">
      <div className="viewSlider" onClick={() => sliderClick()}>
         <div className="viewOption" style={publicView ? {backgroundColor:"white", color:"#1B3A20"} : {}}>
            Public
         </div>
         <div className="viewOption" style={!publicView ? {backgroundColor:"white", color:"#1B3A20"} : {}}>
            User
         </div>
      </div>
   </div>
  )
}

export default ViewSlider