import TopBar from '../../components/navbar/TopBar'
import SideBar from '../../components/sidebar/SideBar'
import Map from '../../components/map/Map'
import Footer from '../../components/footer/Footer'
import './homepage.css'

const HomePage = () => {
  return (
    <div>
      <TopBar />
      <div className="hero">
        <SideBar />
        <Map />
      </div>
      <Footer />
    </div>
  )
}

export default HomePage