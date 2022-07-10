import './marker.css'

const Marker = ({ position, name }) => {
  return (
   <div className="marker" style={position} alt={name}>
      <div className="circle"></div>
   </div>
  )
}

export default Marker