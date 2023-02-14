import './summarypost.css'
import React from 'react'
import Pie from '../../components/graph/Pie'
import { FaTimes } from 'react-icons/fa'
import useOutsideClick from '../../hooks/useOutsideClick'
import { useAuthContext } from '../../hooks/authHooks/useAuthContext'
import { getPieData } from '../../scripts/getPieData'
import { useGetTopSpot } from '../../hooks/useGetTopSpot'
import { countries } from '../../staticdata/countries'
import PrivateInfo from './PrivateInfo'
import PublicInfo from './PublicInfo'

const SummaryPost = ({ data, subcuisine, country, isSummary, hide, publicView  }) => {

   const { ref } = useOutsideClick(hide);
   const { spotsVisited, scoreSum, topSpot, graphData, topSubCuisine } = getPieData(data)
   const { user } = useAuthContext()
   const { topSpotInfo } = useGetTopSpot(topSpot, user, publicView)

   const averageScore = (scoreSum / spotsVisited).toFixed(2)

   const getSubCuisines = () => {
      let cuisines = ""
      if (country in countries) {
         if (countries[country].cuisines.length === 1) {
            return
         }
         for (let i = 0; i < countries[country].cuisines.length; i++) {
            const cuis = countries[country].cuisines[i]
            cuisines += cuis
            if (i !== countries[country].cuisines.length - 1) {
               cuisines += ", "
            }
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
            {isSummary ? <h1>{topSubCuisine[0]}</h1> : <h1>{subcuisine ? subcuisine : country}</h1>}   
            <div><b>{isSummary && "Total "}Spots Visited:</b> {spotsVisited}</div>
            <div><b>{isSummary && "Global "}Average Score:</b> {averageScore}</div>
         </div>
         <div className="postGraph">
            <Pie data={graphData} title={isSummary ? "Scores" : ""}/>
         </div>
         {!publicView && <PrivateInfo data={topSpotInfo} isSummary={isSummary}/>}
         {publicView && <PublicInfo data={data}/>}
      </div>
      {!isSummary && country in countries && 
         getSubCuisines()
      }
   </div>
  )
}

SummaryPost.defaultProps = {
   isSummary: false,
   publicView: false, 
   subcuisine: null,
   hide: () => {}
}

export default SummaryPost