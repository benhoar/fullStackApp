import './marker.css'

const Marker = ({ country, mapState, mapDispatch, setSelected }) => {

  return (
    <div className="">
      <div className="markerWrap" 
          style={{top: mapState[country].mapPos[0], left:mapState[country].mapPos[1]}} 
      >
        <div className="marker" 
            alt={mapState[country][0]}
            style={mapState[country].visible ? {backgroundColor:"blue"} : {backgroundColor:"red"}}
            onClick={() => {
                mapDispatch({ type: "SET VISIBILITY", country: country, visible: true })
                setSelected(country)
            }}>
          <div className="circle"></div>
        </div>
    </div>
   </div>
  )
}

export default Marker