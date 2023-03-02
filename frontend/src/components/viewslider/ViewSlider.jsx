import { useVisibility } from '../../context/VisibilityContext'
import './viewslider.css'

const ViewSlider = ({sliderClick}) => {
  const { publicView } = useVisibility()
  return (
   <div className="viewSlider" onClick={() => {sliderClick()}}>
      <div className="viewOption" style={publicView ? {transform:'scale(1.03)', backgroundColor:"#f2f2f2", color:"#1B3A20"} : {}}>
         Public
      </div>
      <div className="viewOption" style={!publicView ? {transform:'scale(1.03)', backgroundColor:"#f2f2f2", color:"#1B3A20"} : {}}>
         User
      </div>
   </div>
  )
}

export default ViewSlider