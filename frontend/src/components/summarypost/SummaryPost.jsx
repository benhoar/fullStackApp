import './summarypost.css'
import React from 'react'
import Pie from '../../components/graph/Pie'
import { FaTimes } from 'react-icons/fa'
import useOutsideClick from '../../hooks/useOutsideClick'
import countries from '../../staticdata/countries'
import PrivateInfo from './PrivateInfo'
import PublicInfo from './PublicInfo'
import { useVisibility } from '../../context/VisibilityContext'
import { useSelectedContext } from '../../context/SelectedContext'

const SummaryPost = ({ data, isSummary, hide  }) => {
   const { publicView } = useVisibility()
   const { selected } = useSelectedContext()
   const { ref } = useOutsideClick(hide)
   const { spotsVisited, averageScore, blogs, allScores } = data
   const topSpot = blogs[0]
   //console.log(topSpot)
   const graphData = new Array(10).fill(0)
   for (let i = 0; i < 10; i++) {
      graphData[i] = allScores[i+1]
   }

   const getSubCuisines = () => {
      let cuisines = ""
      for (let i = 0; i < data.subcuisines.length; i++) {
         const cuis = data.subcuisines[i]
         cuisines += cuis
         if (i !== data.subcuisines.length - 1) {
            cuisines += ", "
         }
      }
      return (
         <div className="subcuisinesWrapper">
            <div className="ropes"></div>
            <div className="subcuisines">
               {cuisines}
            </div>
         </div>
      )
   }
  
  return (
   <div ref={ref}>
      <div className="summaryPost" style={!isSummary ? {border:"2px solid #351E1B"} : {}}>
         {!isSummary &&
            <div className="exit" onClick={() => hide()}>
               <FaTimes />
            </div>
         }
         <div className="cuisineDetails">
            {(isSummary) && <h5 style={{alignSelf:"flex-start"}}>Top Cuisine...</h5>}
            {isSummary ? <h1>{data.winner}</h1> : <h1>{selected}</h1>}
            <div><b>{isSummary && "Total "}Spots Visited:</b> {spotsVisited}</div>
            <div><b>{isSummary && "Global "}Average Score:</b> {averageScore}</div>
         </div>
         <div className="postGraph">
            <Pie data={graphData} title={isSummary ? "Scores" : ""}/>
         </div>
         {!publicView && <PrivateInfo data={topSpot} isSummary={isSummary}/>}
         {publicView && <PublicInfo data={data}/>}
      </div>
      {!isSummary && selected in countries && 
         getSubCuisines()
      }
   </div>
  )
}

SummaryPost.defaultProps = {
   isSummary: false,
   publicView: false, 
   hide: () => {}
}

export default SummaryPost