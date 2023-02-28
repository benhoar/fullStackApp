import { TbCrown, TbStar } from 'react-icons/tb'
import './cuisinesummary.css'

const CuisineSummary = ({ data }) => {
   const topSpot = data.blogs[0]
   const av = (data.scoreSum / data.spotsVisited).toFixed(2)
   return (
   <div style={{marginTop:"20px"}} className="cuisineSummary">
      <div className="cuisineGeneral">
         <div className="cuisineName">{data.cuisine}</div>
         <p>Spots Visited: {data.spotsVisited}</p>
      </div>
      <div className="cuisineWinner">
         <div>
            <span>
               <TbCrown size={20}/>
               <span><b> Top Spot:</b> {topSpot.restaurant} –</span>
               <span style={{fontSize:"16px"}}> {topSpot.location}</span>
            </span>
         </div>
      {topSpot.highlight && topSpot.highlight.length !== 0 && 
         <div>
            <span>
               <TbStar size={20}/>
               <span><b> Highlight: </b></span>
               <span>{topSpot.highlight}</span>
            </span>
         </div>
      }
      </div>
      <div className="cuisineScore">{av}</div>
   </div>
  )
}

export default CuisineSummary