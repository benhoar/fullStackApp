import './summarypost.css'
import { TbCrown } from 'react-icons/tb'

const PublicInfo = ({ data }) => {


   const getSpots = () => {

      const winners = data.blogs.slice(0, 3)
      const toReturn = []
      for (let i = 0; i < winners.length; i++) {
         toReturn.push(<div className="publicTopSpot" key={i}>
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