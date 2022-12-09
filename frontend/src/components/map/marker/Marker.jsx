import './marker.css'
import { useState } from 'react'

const Marker = ({ position, name, onClick }) => {
  const [pop, setPop] = useState(false)

  return (
    <div className="markerWrap" style={position} onClick={() => {onClick(); setPop(!pop)}}>
      <div className="marker" alt={name}>
        <div className="circle"></div>
      </div>
   </div>
  )
}

export default Marker