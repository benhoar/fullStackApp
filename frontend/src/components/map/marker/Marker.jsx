import './marker.css'

const Marker = ({ position, name, onClick }) => {

  return (
    <div className="markerWrap" style={position} onClick={onClick}>
      <div className="marker" alt={name}>
        <div className="circle"></div>
      </div>
   </div>
  )
}

export default Marker