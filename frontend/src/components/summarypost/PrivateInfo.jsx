import './summarypost.css'
import { TbCrown } from 'react-icons/tb'

const PrivateInfo = ({ data, isSummary }) => {
  return (
   <div className="postContent">
      <div className="winnerName">
         {isSummary && <TbCrown size={30}/>}
         <h2>Top Spot</h2>
         <TbCrown size={30}/>
      </div>
      <div><b>Restaurant:</b> {data.restaurant}</div>
      <div><b>Location:</b> {data.location}</div>
      {"highlight" in data && data.highlight.length !== 0 &&
         <div><b>Highlight:</b> {data.highlight}
      </div>}
      <div><b>Rating:</b> {data.rating}</div>
   </div>   
  )
}

export default PrivateInfo