import './marker.css'
import useOutsideClick from '../../../hooks/useOutsideClick'

const Marker = ({ country, mapState, mapDispatch, setSelected, hide }) => {
  const { ref } = useOutsideClick(hide);
  return (
    <div ref={ref} className="markerWrap" style={{position:"absolute", top: country[1].mapPos[0], left: country[1].mapPos[1]}} >
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
  )
}

export default Marker