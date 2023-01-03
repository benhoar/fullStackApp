import SideBar from '../../components/sidebar/SideBar'
import Map from '../../components/map/Map'
import './homepage.css'

const HomePage = () => {

  return (
    <div className="hero">
      <SideBar />
      <Map />
    </div>
  )
}

export default HomePage