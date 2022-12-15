import './summarypost.css'
import React from 'react'
import Pie from '../../components/graph/Pie'
import { TbCrown } from 'react-icons/tb'

const SummaryPost = () => {
  return (
   <div className="summaryPost">
      <div className="cuisineDetails">
         <h1>America</h1>
         <div><b>Spots Visited:</b> 10</div>
         <div><b>Average Score:</b> 4</div>
      </div>
      <div className="postGraph">
         <Pie data={[1,4,3,3,2,0,0,1,2,5]} title={"Test"}/>
      </div>
      <div className="postContent">
         <div className="winnerName">
            <h4>Top Spot</h4>
            <TbCrown size={30}/>
         </div>
         <div><b>Restaurant:</b> Bavel</div>
         <div><b>Location:</b> Waterbuy, VT</div>
         <div><b>Highlight:</b> Prawns</div>
         <div><b>Rating:</b> 9</div>
      </div>
   </div>
  )
}

export default SummaryPost