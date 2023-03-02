import './cuisinecard.css'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import getFlag from '../../scripts/getFlag'
import { TbCrown, TbStar } from 'react-icons/tb'
import { BsHouseDoor } from 'react-icons/bs'

const CuisineCard = ({ data }) => {
   const topSpot = data.blogs[0]
   const av = (data.scoreSum / data.spotsVisited).toFixed(1)

  return (
   <div className="countryCardWrapper">
      <div className="cardCuisine"><em>{data.cuisine}</em></div>
      <div className="countryCard">
         <div className="cardHalf leftCard">
            <div>Score</div>
            <div className="cardScore">{av}</div>
         </div>
         <div className="cardHalf rightCard">
            <div className="cardItem">
               <TbCrown style={{flexShrink:"0", color:"#7AC252"}}/>
               <div className="fieldWrap">
               <span style={{fontWeight:"bold"}}><span className="fieldLabel">Favorite</span>  Spot:</span>  {topSpot.restaurant}
               </div>
            </div>
            {topSpot.highlight && topSpot.highlight.length !== 0 &&
            <div className="cardItem">
               <TbStar style={{flexShrink:"0", color:"#7AC252"}}/>
               <div className="fieldWrap">
                  <span style={{fontWeight:"bold"}}><span className="fieldLabel">Best</span>  Meal:</span> {topSpot.highlight}
               </div>
            </div>
            }
            <div className="cardItem">
               <BsHouseDoor style={{flexShrink:"0", color:"#7AC252"}}/>
               <div className="fieldWrap">
                 <span style={{fontWeight:"bold"}}><span className="fieldLabel">Places</span>  Visited:</span> {data.spotsVisited}
               </div>
            </div>
         </div>
         <div className="flag">
            <div className={`${getFlag(data.cuisine)}`} />
         </div>
      </div>
   </div>
  )
}

export default CuisineCard