import './summarypost.css'
import React from 'react'
import Pie from '../../components/graph/Pie'
import { TbCrown } from 'react-icons/tb'
import { FaTimes } from 'react-icons/fa'
import useOutsideClick from '../../hooks/useOutsideClick'
import { useAuthContext } from '../../hooks/useAuthContext'
import { getPieData } from '../../scripts/getPieData'
import { useGetTopSpot } from '../../hooks/useGetTopSpot'

const SummaryPost = ({ data, setVisible, visible, isSummary }) => {

   const { ref } = useOutsideClick(setVisible);
   const { name, spotsVisited, scoreSum, topSpot, graphData, topSubCuisine } = getPieData(data)
   const { user } = useAuthContext()
   const { topSpotInfo } = useGetTopSpot(topSpot, user)

   const averageScore = (scoreSum / spotsVisited).toFixed(2)
  
  return (
   <div ref={ref}>
      {visible && <div className="summaryPost">
         {!isSummary &&
            <div className="exit" onClick={() => setVisible(false)}>
               <FaTimes />
            </div>
         }
         <div className="cuisineDetails">
            {isSummary && <h5 style={{alignSelf:"flex-start"}}>Top Cuisine...</h5>}
            {isSummary ? <h1>{topSubCuisine[0]}</h1> : <h1>{name}</h1>}   
            <div><b>{isSummary && "Total "}Spots Visited:</b> {spotsVisited}</div>
            <div><b>{isSummary && "Gloabl "}Average Score:</b> {averageScore}</div>
         </div>
         <div className="postGraph">
            <Pie data={graphData} title={isSummary ? "Scores" : ""}/>
         </div>
         <div className="postContent">
            <div className="winnerName">
               <h2>Top Spot</h2>
               <TbCrown size={30}/>
            </div>
            <div><b>Restaurant:</b> {topSpotInfo.restaurant}</div>
            <div><b>Location:</b> {topSpotInfo.location}</div>
            {"highlight" in topSpotInfo && topSpotInfo.highlight.length !== 0 &&
               <div><b>Highlight:</b> {topSpotInfo.highlight}
            </div>}
            <div><b>Rating:</b> {topSpotInfo.rating}</div>
         </div>
      </div>}
   </div>
  )
}

SummaryPost.defaultProps = {
   isSummary: false,
   visible: true,
   setVisible: () => {},
}

export default SummaryPost