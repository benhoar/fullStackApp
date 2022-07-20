import TopBar from '../../components/navbar/TopBar'
import SideBar from '../../components/sidebar/SideBar'
import Map from '../../components/map/Map'
import Footer from '../../components/footer/Footer'
import './homepage.css'
import HomeBlog from '../../components/homeblog/HomeBlog'
import { useState } from 'react'

const HomePage = () => {

  const [showForm, setShowForm] = useState(false)

  return (
    <div>
      <TopBar />
      <div className="hero">
        {showForm && <HomeBlog onClick={() => setShowForm(false)}/>}
        <SideBar noteClick={() => {setShowForm(true)}}/>
        <Map />
      </div>
      <Footer />
    </div>
  )
}

export default HomePage