import './map.css'
import Marker from './marker/Marker'
import countries from '../../staticdata/countries'

const Map = ({ mapState, mapDispatch, hide }) => {

  return (
    <div className="wrapper">
      <img src="images/waterlessworld2x.png" className="map" alt="map"/>
      {Object.entries(countries).map((country) => {
        return <Marker key={country[0]} country={country} mapState={mapState} mapDispatch={mapDispatch} hide={hide}/>
      })}
    </div>
  )
}

export default Map