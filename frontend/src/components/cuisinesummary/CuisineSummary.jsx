import { TbCrown, TbStar } from 'react-icons/tb'
import './cuisinesummary.css'

const CuisineSummary = ({ cuisine }) => {
  

   const getTopSpot = () => {
      let topSpot = null
      cuisine.blogs.forEach((b) => {
        if (!topSpot || b.rating > topSpot.rating) {
          topSpot = b
        }
      })
      let av = (cuisine.scoreSum / cuisine.blogs.length).toFixed(2)
      return { topSpot, av }
   }

   const { topSpot, av } = getTopSpot()

   return (
   <div style={{marginTop:"20px"}} className="cuisineSummary">
      <div className="cuisineGeneral">
         <div className="cuisineName">{cuisine.cuisine}</div>
         <p>Spots Visited: {cuisine.spotsVisited}</p>
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