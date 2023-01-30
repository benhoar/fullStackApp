import SideBar from '../../components/sidebar/SideBar'
import Map from '../../components/map/Map'
import './homepage.css'
import { useReducer, useState, useEffect } from 'react'
import { useAuthContext } from '../../hooks/authHooks/useAuthContext'
import SummaryPost from '../../components/summarypost/SummaryPost'
import { countries } from '../../staticdata/countries'
import ViewSlider from '../../components/viewslider/ViewSlider'
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
  const [publicDataSource, setPublicDataSource] = useState({})
  const [userDataSource, setUserDataSource] = useState({})
  const [popSource, setPopSource] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [publicView, setPublicView] = useState(true)

  useEffect(() => {

    const merge = (hostEntry, newEntry) => {
      hostEntry.topSpotScore = newEntry.topSpotScore > hostEntry.topSpotScore ? newEntry.topSpotScore : hostEntry.topSpotScore
      hostEntry.topSpot = newEntry.topSpotScore > hostEntry.topSpotScore ? newEntry.topSpot : hostEntry.topSpot
      if (newEntry.topSpotScore > hostEntry.topSpotScore) {
        let location = ""
        for (let i = 0; i < newEntry.blogs; i++) {
          if (newEntry.blogs[i].restaurant === newEntry.topSpot) {
            location = newEntry.blogs[i].location
          }
        }
        hostEntry.location = location
      }
      hostEntry.spotsVisited += newEntry.spotsVisited
      hostEntry.scoreSum += newEntry.scoreSum
      for (const score in newEntry.allScores) {
        if (!(score in hostEntry.allScores)) {
          hostEntry.allScores[score] = 0
        }
        hostEntry.allScores[score] += newEntry.allScores[score]
      }
      hostEntry.blogs.push(...newEntry.blogs)
    }

    const populateData = async () => {
      try {
        const res = await axios.get("/api/cuisines/public/")
        let blogsFromCuisine = {}
        res.data.forEach((datum) => {
          if (!(datum.cuisine in blogsFromCuisine)) {
            blogsFromCuisine[datum.cuisine] = datum
            let location = ""
            for (let i = 0; i < datum.blogs; i++) {
              if (datum.blogs[i].restaurant === datum.topSpot) {
                location = datum.blogs[i].location
              }
            }
            blogsFromCuisine["location"] = location
          } else {
            merge(blogsFromCuisine[datum.cuisine], datum)
          }
        })
        setPopSource(blogsFromCuisine)
        setPublicDataSource(blogsFromCuisine)
      } catch {
        console.log("something went wrong getting public data")
      }
      if (user) {
        setPublicView(false)
        try {
          const res = await axios.get("/api/cuisines/", {
            headers: { 'Authorization': `Bearer ${user.token}` }
          })
          let blogsFromCuisine = {}
          res.data.forEach((datum) => {
            blogsFromCuisine[datum.cuisine] = datum
          })
          setPopSource(blogsFromCuisine)
          setUserDataSource(blogsFromCuisine)
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
    // if (!user && selected.length !== 0) {
    //   setErrorMessage(`No ${selected} Data Found!`)
    // }
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

  const sliderClick = () => {
    if (!user) {
      setErrorMessage("No user data!")
      return
    }
    if (publicView) {
      setPublicView(false)
      setPopSource(userDataSource)
    } else {
      setPublicView(true)
      setPopSource(publicDataSource)
    }
  }

  return (
    <div className="hero">
      <div style={{zIndex:'98'}} className="homeButtons">
        <SideBar setSelected={setSelected} 
                 cuisineTypes={cuisineToCountry} 
                 selected={selected}
                 mapDispatch={mapDispatch}
                 sliderClick={sliderClick}
                 publicView={publicView}
        />
        <div className='sliderHolder'>
          <ViewSlider sliderClick={sliderClick} publicView={publicView}/>
        </div>
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
            <SummaryPost data={popData} country={selected} hide={hide} publicView={publicView}/>
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