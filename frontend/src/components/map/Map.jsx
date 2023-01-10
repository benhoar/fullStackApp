import './map.css'
import Marker from './marker/Marker'

const Map = ({ markers, setSelected, selected }) => {

  return (
    <div className="wrapper">
      <img src="images/bg3.png" className="map" alt=""/>
      {Object.entries(markers).map(([k, val]) => {
        return <Marker key={k} details={val} setSelected={setSelected} selected={selected} />
      })}
    </div>
  )
}

export default Map