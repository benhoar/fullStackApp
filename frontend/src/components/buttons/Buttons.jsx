import './buttons.css'
import SlideButton from '../slidebutton/SlideButton'
import CountryList from '../countrylist/CountryList'
import { useVisibility } from '../../context/VisibilityContext'
import { useData } from '../../context/DataContext'
import { useState } from 'react'
import { useSelectedContext } from '../../context/SelectedContext'
import useWindowWidth from '../../hooks/useWindowSize'
import ViewSlider from '../viewslider/ViewSlider'
import { useAuthContext } from '../../hooks/authHooks/useAuthContext'

export const Buttons = ({ cuisineTypes, mapDispatch, errorMessage, setSideBlog, setErrorMessage }) => {
   const [rater, setRater] = useState(false)
   const { selected, setSelected } = useSelectedContext()
   const { publicView, togglePublicView } = useVisibility()
   const { innerWidth } = useWindowWidth()
   const { user } = useAuthContext()
   const { privateData, publicData } = useData()

   const setBlue = () => {
      const source = publicView ? publicData : privateData
      let beenTo = Object.keys(source).map(cuisine => cuisineTypes[cuisine])
      for (let i = 0; i < beenTo.length; i++) {
         mapDispatch({type: "SET VISIBILITY", country: beenTo[i], visible: true})
      }
      setTimeout(() => {
         for (let i = 0; i < beenTo.length; i++) {
         mapDispatch({type: "SET VISIBILITY", country: beenTo[i], visible: false})
         }
      }, 3000)
   }
  
   const buttons = {
      0: {
         image: innerWidth <= 960 ? 'images/miniGlobe.png' : 'images/globe2.png',
         text: 'Highlight Visits',
         alt: "globe",
         onClick: () => setBlue(),
      },
      1: {
         image: innerWidth <= 960 ? 'images/miniNotes.png' : 'images/revs2.png',
         text: 'Write a Blog',
         alt: "notes",
         onClick: () => setSideBlog(prevState => !prevState),
      },
      2: {
         image: innerWidth <= 960 ? 'images/miniPlate.png' : 'images/1plate2.png',
         text: 'Find a Cuisine',
         alt: "plate",
         onClick: () => setRater(prevState => !prevState),
      },
      3: {
         image: innerWidth <= 960 ? 'images/miniDiner.png' : 'images/diner3.png',
         text: 'Let\'s Go Out!',
         alt: "diner",
         onClick: () => {
            const cuisines = Object.keys(cuisineTypes)
            const winner = cuisines[Math.floor(Math.random() * cuisines.length)]
            window.open(`https://www.google.com/search?q=${winner}+food+near+me`)
         }
      },
      4: {
         image: null,
         text: publicView ? "Public View" : "User View",
         alt: "view options",
         onClick: () => togglePublicView()
      }
   }

   const sliderClick = () => {
      if (!user) {
        setErrorMessage("No user data!")
        return
      }
      togglePublicView()
    }
   
   return (
   <div className="sidebar-buttons-container">
      {<div className="sidebar-buttons" style={rater && innerWidth > 960 ? {display:'none'} : {}}>
         {Object.entries(buttons).map(([key, val]) => {
            if (key !== "4") {
               return <SlideButton key={key} details={val}/>}
            else {
               return innerWidth <= 960 ? <SlideButton key={key} details={val}/> : null
            }
         })}
         {innerWidth > 960 &&
            <div className='slider-holder'>
               <ViewSlider sliderClick={sliderClick}/>
            </div>
         }
      </div>}
      {rater && <CountryList cuisineTypes={cuisineTypes} setRater={setRater} setSelected={setSelected} selected={selected} mapDispatch={mapDispatch} errorMessage={errorMessage}/>}
   </div>
   )
}
