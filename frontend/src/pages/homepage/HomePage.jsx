import SideBar from '../../components/sidebar/SideBar'
import Map from '../../components/map/Map'
import './homepage.css'
import { useReducer } from 'react'
import { useState } from 'react'
import { getCuisines } from '../../scripts/getCuisines'
import { useAuthContext } from '../../hooks/useAuthContext'
import SummaryPost from '../../components/summarypost/SummaryPost'
import { useEffect } from 'react'
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
  const [notFound, setNotFound] = useState(false)
  const [popData, setPopData] = useState([])
  const [hidepop, setHidepop] = useState(true)

  useEffect(() => {

    const getPopup = async () => {
      let cuisines = []
      if (selected in mapState) {
        cuisines = mapState[selected].cuisines
      } else {
        cuisines = [selected]
      }
      const res = await getCuisines(cuisines, user)
      if (res) {
        setPopData(res)
        setHidepop(false)
      } else {
        setNotFound(true)
      }
    }
    if (user && selected.length !== 0) {
      getPopup()
    }
  }, [user, selected, mapState])

  const hide = () => {
    setHidepop(true)
    setSelected("")
    let toSilence = selected
    if (!(selected in countries)) {
      toSilence = cuisineToCountry[selected]
    }
    mapDispatch({ type: "SET VISIBILITY", country: toSilence, visible: false })
  }

  const hideError = () => {
    setTimeout(() => {setNotFound(false); hide()}, 2000)
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
            setSelected={setSelected}/>
      </div>
      {!hidepop &&
      <div className="containSummary">
        <div className="summaryPop">
          <SummaryPost data={popData} country={selected} hide={hide}/>
        </div>
      </div>
      }
      {notFound && 
        <div className="notFound">
          No {selected} Data Yet!
          {hideError()}
        </div>
      }
    </div>
  )
}

export default HomePage