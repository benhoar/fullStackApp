import SideBar from '../../components/sidebar/SideBar'
import Map from '../../components/map/Map'
import './homepage.css'
import { useReducer, useState, useEffect } from 'react'
import { useAuthContext } from '../../hooks/authHooks/useAuthContext'
import SummaryPost from '../../components/summarypost/SummaryPost'
import { countries } from '../../staticdata/countries'
const axios = require('axios').default

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
  const [popSource, setPopSource] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const populateData = async () => {
      if (user) {
        try {
          const res = await axios.get("/api/cuisines/", {
            headers: { 'Authorization': `Bearer ${user.token}` }
          })
          let blogsFromCuisine = {}
          res.data.forEach((datum) => {
            blogsFromCuisine[datum.cuisine] = datum
          })
          setPopSource(blogsFromCuisine)
        } catch {
          console.log("something went wrong")
        }
      }
    }
    populateData()
  }, [user])

  useEffect(() => {
    const getPopup = async () => {
      setIsLoading(true)
      let cuisines = [selected]

      if (selected in countries) {
        cuisines = countries[selected].cuisines
      }

      const data = []
      for (let i = 0; i < cuisines.length; i++) {
        const cur = cuisines[i]
        if (cur in popSource) {
          data.push(popSource[cur])
        }
      }

      if (data.length !== 0) {
        setPopData(data)
        setHidepop(false)
      } else {
        const t = selected
        setErrorMessage(`No ${t} Data Found!`)
      }
    }
    if (user && selected.length !== 0 && popSource) {
      getPopup()
      setIsLoading(false)
    }
    if (!user && selected.length !== 0) {
      setErrorMessage(`No ${selected} Data Found!`)
    }
  }, [user, selected, mapState, popSource])

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
      <div style={{zIndex:'98'}} className="homeButtons">
        <SideBar setSelected={setSelected} 
                cuisineTypes={cuisineToCountry} 
                selected={selected} mapDispatch={mapDispatch}
        />
      </div>
      <div style={{zIndex:'99'}} className="homeMap">
        <Map mapState={mapState} 
            mapDispatch={mapDispatch} 
            setSelected={setSelected}
            hide={hide}/>
      </div>
      {!hidepop && !isLoading &&
        <div className="containSummary">
          <div className="summaryPop">
            <SummaryPost data={popData} country={selected} hide={hide}/>
          </div>
        </div>
      }
      {errorMessage && 
        <div className="containSummary">
          <div className="notFound">
            {errorMessage}
          </div>
        </div>
      }
    </div>
  )
}

export default HomePage