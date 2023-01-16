import SideBar from '../../components/sidebar/SideBar'
import Map from '../../components/map/Map'
import './homepage.css'
import { useReducer, useState, useEffect } from 'react'
import { getCuisines } from '../../scripts/getCuisines'
import { useAuthContext } from '../../hooks/authHooks/useAuthContext'
import SummaryPost from '../../components/summarypost/SummaryPost'
import { countries } from '../../staticdata/countries'
const HomePage = () => {

  const { user } = useAuthContext()

  const cuisineToCountry = {}
  for (const country in countries) {
    const cur = countries[country]
    for (let i = 0; i < cur.cuisines.length; i++) {
      cuisineToCountry[cur.cuisines[i]] = country
    }
  }

  const mapReducer = (state, directions) => {
    switch (directions.type) {
      case 'SET VISIBILITY':
        const country = directions.country
        return { 
          ...state, 
          [country]: { ...state[country], visible: directions.visible}
        }
      default:
        return state
    }
  }
  
  const [mapState, mapDispatch] = useReducer(mapReducer, countries)

  const [selected, setSelected] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [popData, setPopData] = useState([])
  const [hidepop, setHidepop] = useState(true)

  useEffect(() => {

    const getPopup = async () => {
      const res = await getCuisines(selected, user)
      if (res) {
        setPopData(res)
        setHidepop(false)
      } else {
        const t = selected
        setErrorMessage(`No ${t} Data Found!`)
      }
    }
    if (user && selected.length !== 0) {
      getPopup()
    }
  }, [user, selected, mapState])

  const hide = () => {
    setHidepop(true)
    setErrorMessage("")
    setSelected("")
    let toSilence = selected
    if (!(selected in countries)) {
      toSilence = cuisineToCountry[selected]
    }
    mapDispatch({ type: "SET VISIBILITY", country: toSilence, visible: false })
  }

  return (
    <div className="hero">
      <div style={{zIndex:'98'}}>
        <SideBar setSelected={setSelected} 
                cuisineTypes={cuisineToCountry} 
                selected={selected} mapDispatch={mapDispatch}
        />
      </div>
      <div style={{zIndex:'99'}}>
        <Map mapState={mapState} 
            mapDispatch={mapDispatch} 
            setSelected={setSelected}
            hide={hide}/>
      </div>
      {!hidepop &&
        <div className="containSummary">
          <div className="summaryPop">
            <SummaryPost data={popData} country={selected} hide={hide}/>
          </div>
        </div>
      }
      {errorMessage && 
        <div className="notFound">
          {errorMessage}
        </div>
      }
    </div>
  )
}

export default HomePage