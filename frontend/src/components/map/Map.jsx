import './map.css'
import Marker from './marker/Marker'
import countries from '../../staticdata/countries'
import useWindowSize from '../../hooks/useWindowSize'

const Map = ({ mapState, mapDispatch, hide }) => {

  const { innerHeight } = useWindowSize()

  return (
    <div className="wrapper">
      <img src="images/waterlessworld2x.png" className="map" alt="map" style={{height:`${innerHeight*1.1}px`}}/>
      {Object.entries(countries).map((country) => {
        return <Marker key={country[0]} country={country} mapState={mapState} mapDispatch={mapDispatch} hide={hide}/>
      })}
    </div>
  )
}

export default Map