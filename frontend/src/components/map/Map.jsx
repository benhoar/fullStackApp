import './map.css'
import Marker from './marker/Marker'

const Map = ({ mapState, mapDispatch, setSelected }) => {

  return (
    <div className="wrapper">
      <img src="images/bg3.png" className="map" alt=""/>
      {Object.entries(mapState).map((country) => {
        return <Marker key={country[0]} country={country[0]} mapState={mapState} mapDispatch={mapDispatch} setSelected={setSelected}  />
      })}
    </div>
  )
}

export default Map