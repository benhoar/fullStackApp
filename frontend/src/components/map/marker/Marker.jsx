import './marker.css'
import SummaryPost from '../../summarypost/SummaryPost'
import { useState } from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { getCuisines } from '../../../scripts/getCuisines'

const Marker = ({ details, setSelected, selected }) => {

  const [popData, setPopData] = useState([])
  const [pop, setPop] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const { user } = useAuthContext()

  return (
    <div className="">
      <div className="markerWrap" 
          style={{top:details.mapPos[0], left:details.mapPos[1]}} 
      >
        <div className="marker" 
            alt={details.primary}
            style={pop || selected === details.primary ? {backgroundColor:"gold"} : {backgroundColor:"red"}}
            onClick={async () => {
              const data = await getCuisines(details.cuisines, user); 
              if (data) {
                setPopData(data)
                setSelected(details.primary)
                setPop(true)
              }
              else {
                setNotFound(true)
                setSelected(details.primary)
                setTimeout(() => {setNotFound(false); setSelected("")}, 2000)
              }
            }}>
          <div className="circle"></div>
        </div>
    </div>
    <div className="summaryPop">
        {pop && <SummaryPost data={popData} name={details.primary} visible={pop} setVisible={setPop} setSelected={setSelected}/>}
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