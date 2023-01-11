import './marker.css'

const Marker = ({ country, mapState, mapDispatch, setSelected }) => {

  return (
    <div className="">
      <div className="markerWrap" 
          style={{top: country[1].mapPos[0], left: country[1].mapPos[1]}} 
      >
        <div className="marker" 
            alt={country[0]}
            style={mapState[country[0]].visible ? {backgroundColor:"blue", transform:"scale(2) rotate(45deg)"} : {backgroundColor:"red"}}
            onClick={() => {
                mapDispatch({ type: "SET VISIBILITY", country: country[0], visible: true })
                setSelected(country[0])

            }}>
          <div className="circle"></div>
        </div>
    </div>
   </div>
  )
}

export default Marker