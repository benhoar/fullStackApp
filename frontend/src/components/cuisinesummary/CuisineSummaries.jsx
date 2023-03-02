import { useEffect, useState } from 'react'
import { useData } from '../../context/DataContext'
import { useVisibility } from '../../context/VisibilityContext'
import './cuisinesummaries.css'


const CuisineSummaries = ({ posts, sortKey }) => {

   const { privateData, publicData } = useData()
   const { publicView } = useVisibility()
   const [curPosts, setCurPosts] = useState(posts)
   useEffect(() => {
      if (posts) {
         const source = publicView ? publicData : privateData
         let to_set = []
         switch (sortKey) {
            case "Cuisine A-Z":
               to_set = [...posts].sort((a, b) => (source[a.key].cuisine > source[b.key].cuisine) ? 1 : ((source[b.key].cuisine > source[a.key].cuisine) ? -1 : 0))
               break
            case "Cuisine Z-A":
               to_set = [...posts].sort((a, b) => (source[b.key].cuisine > source[a.key].cuisine) ? 1 : ((source[a.key].cuisine > source[b.key].cuisine) ? -1 : 0))
               break
            case "Weakest":
               to_set = [...posts].sort((a, b) => (source[a.key].scoreSum / source[a.key].spotsVisited)-(source[b.key].scoreSum / source[b.key].spotsVisited))
               break
            default:
               to_set = [...posts].sort((a, b) => (source[b.key].scoreSum / source[b.key].spotsVisited)-(source[a.key].scoreSum / source[a.key].spotsVisited))
         } 
         setCurPosts(to_set)
      }
   }, [sortKey, posts, privateData, publicData, publicView])

   return (
      <div className="cardWrapper">
         {curPosts}
      </div>
   )
}

export default CuisineSummaries