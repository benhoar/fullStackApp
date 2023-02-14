import Heap from 'heap-js'
import './summarypost.css'
import { TbCrown } from 'react-icons/tb'

const PublicInfo = ({ data }) => {


   const getSpots = () => {

      const fullScores = {}
      const restaurantComparator = (a, b) => b.rating - a.rating
      const topRestaurants = new Heap(restaurantComparator)

      for (const cuisine in data) {
         const curScores = data[cuisine].allScores
         for (const score in curScores) {
            if (!(score in fullScores)) {
               fullScores[score] = 0
            }
            fullScores[score] += curScores[score]
         }
         for (let i = 0; i < data[cuisine].blogs.length; i++) {
            if (typeof data[cuisine].blogs[i] === 'object') {
               Heap.heappush(topRestaurants, data[cuisine].blogs[i])
            }
         }
      }
      
      // heap was giving me undefined values, for first pop, works as expected with this workaround
      const winners = topRestaurants.top(3).sort((a, b) => (b.rating > a.rating) ? 1 : -1)
      const toReturn = []
      for (let i = 0; i < winners.length; i++) {
         toReturn.push(<div className="publicTopSpot" key={winners[i].restaurant}>
                           <div>
                              {`${winners[i].restaurant} `}
                              <span className="publicTopSpotLocation">
                                 <em>{`${winners[i].location}`}</em>
                              </span>
                              {` – ${winners[i].rating}`}
                           </div>
                        </div>)
      }

      return toReturn
   }
   return (
      <div className="postContent">
         <div className="winnerName">
            <TbCrown size={30}/>
            <h2>Top Spots</h2>
         </div>
         <div className="topSpots">
               {getSpots()}
         </div>
      </div>
   )
}

export default PublicInfo