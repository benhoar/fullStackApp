import Map from '../../components/map/Map'
import './homepage.css'
import { useReducer, useState, useEffect, useMemo } from 'react'
import { useAuthContext } from '../../hooks/authHooks/useAuthContext'
import SummaryPost from '../../components/summarypost/SummaryPost'
import staticCountries from '../../staticdata/countries'
import ViewSlider from '../../components/viewslider/ViewSlider'
import { useSelectedContext } from '../../context/SelectedContext'
import { useVisibility } from '../../context/VisibilityContext'
import { useData } from '../../context/DataContext'
import { Buttons } from '../../components/buttons/Buttons'
import useCuisineTranslator from '../../hooks/useCuisineTranslator'
import useWindowWidth from '../../hooks/useWindowWidth'
import BlogForm from '../../components/blog/BlogForm'
import { FaTimes } from 'react-icons/fa'

const HomePage = () => {

  const { selected, setSelected } = useSelectedContext()
  const { publicView, togglePublicView } = useVisibility()
  const { privateData, publicData } = useData()
  const { user } = useAuthContext()
  const [errorMessage, setErrorMessage] = useState("")
  const [popData, setPopData] = useState([])
  const [hidepop, setHidepop] = useState(true)
  const [sideBlog, setSideBlog] = useState(false)
  const { cuisineToCountry } = useCuisineTranslator()
  const { innerWidth } = useWindowWidth()

  const countries = useMemo(() => { return staticCountries }, [])

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

  const [mapState, mapDispatch] = useReducer(mapReducer, staticCountries)
  
  useEffect(() => {
    function getPopData(source) {
      if (selected.length !== 0) {
        let cuisines = [selected]
        if (selected in countries) {
          cuisines = countries[selected].cuisines
        }
        const dataObject = {
          spotsVisited: 0,
          allScores: {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0}
        }
        const blogs = []
        let scoreSum = 0
        cuisines.forEach(cuisine => {
          if (cuisine in source) {
            const cuisineData = source[cuisine]
            dataObject.spotsVisited += cuisineData.spotsVisited
            for (const score in cuisineData.allScores) {
              dataObject.allScores[score] += cuisineData.allScores[score]
              scoreSum += cuisineData.allScores[score]*score
            }
            blogs.push(...cuisineData.blogs)
          }
        })
        if (blogs.length === 0) {
          setErrorMessage(`No ${selected} Data Found!`)
        } else {
          blogs.sort((a, b) => b.rating - a.rating)
          dataObject.averageScore = (scoreSum / dataObject.spotsVisited).toFixed(2)
          dataObject.blogs = blogs
          dataObject.subcuisines = cuisines
          setPopData(dataObject)
          setHidepop(false)
        }
      }
    }

    const source = publicView ? publicData : privateData
    getPopData(source)

  }, [selected, countries, privateData, publicData, publicView, innerWidth])

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
    togglePublicView()
  }

  return (
      <div className="hero">
        <div className="smallWindowButtonsContainer">
          <div className="smallWindowButtons">
            <Buttons cuisineTypes={cuisineToCountry} 
                    mapDispatch={mapDispatch}
                    errorMessage={errorMessage}
                    setSideBlog={setSideBlog}
            />
          </div>
        </div>
        <div className="homeButtons">
          <Buttons cuisineTypes={cuisineToCountry} 
                  mapDispatch={mapDispatch}
                  errorMessage={errorMessage}
                  setSideBlog={setSideBlog}
          />
          <div className='sliderHolder'>
            <ViewSlider sliderClick={sliderClick}/>
          </div>
        </div>
        <div className="homeMap">
          <Map mapState={mapState} 
              mapDispatch={mapDispatch} 
              hide={hide}/>
        </div>
        {!hidepop &&
          <div className="containSummary">
            <div className="summaryPop">
              <SummaryPost data={popData} hide={hide}/>
            </div>
          </div>
        }
        {sideBlog &&
          <div className="home-blog-positioner">
            <div className="home-blog">
                <div className="close-blog" onClick={() => {setSideBlog(prevState => !prevState)}}>
                  <FaTimes />
                </div>
                <BlogForm 
                  setShowAddBlog={setSideBlog}
                />
            </div>
          </div>
        }
        {errorMessage && 
          <div className={innerWidth <= 960 ? "containError" : "containSummary"}>
            <div className="notFound">
              {errorMessage}
            </div>
          </div>
        }
      </div>
  )
}

export default HomePage