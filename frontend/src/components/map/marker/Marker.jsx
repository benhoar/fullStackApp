import './marker.css'
import SummaryPost from '../../summarypost/SummaryPost'
import { useState } from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'

const axios = require('axios').default

const Marker = ({ details }) => {

  const [popData, setPopData] = useState([])
  const [pop, setPop] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const { user } = useAuthContext()

  const getCuisines = async () => {
    const cuisData = []
    for (const cuisine of details.cuisines) {
      await axios.get(`/api/cuisines/cuisine/${cuisine}`,
        {
          headers: { 'Authorization': `Bearer ${user.token}` }
        }
      ).then((res) => {
          cuisData.push(res.data)
        }
      ).catch(() => {
          console.log(cuisine, " not found")
        }
      )
    }
    if (cuisData.length === 0) {
      return null
    }
    else {
      return cuisData
    }
  }

  return (
    <div className="">
      <div className="markerWrap" 
          style={{top:details.mapPos[0], left:details.mapPos[1]}} 
      >
        <div className="marker" 
            alt={details.name}
            onClick={async () => {
              const data = await getCuisines(); 
              if (data) {
                setPopData(data)
                setPop(true)
              }
              else {
                setNotFound(true)
                setTimeout(() => {setNotFound(false)}, 2000)
              }
            }}>
          <div className="circle"></div>
        </div>
    </div>
    <div className="summaryPop">
        {pop && <SummaryPost data={popData} visible={pop} setVisible={setPop}/>}
    </div>
    {notFound && 
      <div className="notFound">
        No Data Yet!
      </div>
    }
   </div>
  )
}

export default Marker