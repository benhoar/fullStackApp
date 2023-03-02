import './summarypage.css'
import { useData } from '../../context/DataContext'
import { useState, useEffect } from 'react'
import { useVisibility } from '../../context/VisibilityContext'
import { useAuthContext } from '../../hooks/authHooks/useAuthContext'
import ViewSlider from '../../components/viewslider/ViewSlider'
import SummaryPost from '../../components/summarypost/SummaryPost'
import Profile from '../../components/profile/Profile'
import CuisineCard from '../../components/cuisineCard/CuisineCard'
import CuisineSummaries from '../../components/cuisinesummary/CuisineSummaries'

const SummaryPage = () => {

  const { privateData, publicData } = useData()
  const { publicView, togglePublicView } = useVisibility()
  const { user } = useAuthContext()
  const [privatePosts, setPrivatePosts] = useState([])
  const [publicPosts, setPublicPosts] = useState([])
  const [publicSummary, setPublicSummary] = useState(<></>)
  const [privateSummary, setPrivateSummary] = useState(<></>)
  const [sortKey, setSortKey] = useState("Strongest")

  useEffect(() => {
    const generateData = (source, type) => {
      const summaryData = {
        spotsVisited: 0,
        allScores: {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0},
        blogs: []
      }
      let globalScoreSum = 0
      const posts = []
      let winner = ["Add Some Data!", 0]
      for (const cuisine in source) {
        const cur = source[cuisine]
        globalScoreSum += cur.scoreSum
        summaryData.spotsVisited += cur.spotsVisited
        summaryData.blogs.push(...cur.blogs)
        for (const score in cur.allScores) {
          summaryData.allScores[score] += cur.allScores[score]
        }
        source[cuisine].cuisine = cuisine
        posts.push(<CuisineCard key={cuisine} data={source[cuisine]}/>)
        const curav = cur.scoreSum / cur.spotsVisited
        if (curav > winner[1]) {
          winner = [cuisine, curav]
        } 
      }
      summaryData.winner = winner[0]
      summaryData.blogs.sort((a, b) => b.rating - a.rating)
      summaryData.averageScore = (globalScoreSum / summaryData.spotsVisited).toFixed(2)
      posts.sort((a, b) => (source[b.key].scoreSum / source[b.key].spotsVisited)-(source[a.key].scoreSum / source[a.key].spotsVisited))
      if (type === "public") {
        setPublicPosts(posts)
        setPublicSummary(<SummaryPost key={type} data={summaryData} isSummary={true}/>)
      } else {
        setPrivatePosts(posts)
        setPrivateSummary(<SummaryPost key={type} data={summaryData} isSummary={true}/>)
      }
    }
    if (user && Object.keys(privateData).length !== 0) {
      generateData(privateData, 'private')
    }
    if (Object.keys(publicData).length !== 0) {
      generateData(publicData, 'public')
    }
  }, [publicData, privateData, user])

  const getSortKeys = () => {
    const keys = ["Cuisine A-Z", "Cuisine Z-A", "Weakest", "Strongest"]
    const options = []
    for (let i = 0; i < keys.length; i++) {
      options.push(<option key={keys[i]}>
                    {keys[i]}
                   </option>)
    }
    return options
  }

  return (
    <div className="summaryWrapper">
        <div className="tableWrapper">
          <div className="preTable">
            {publicView ? publicSummary : (Object.keys(privateData).length !== 0 ? privateSummary : <h2>No Data Yet!</h2>)}
          </div>
          <div className="preList">
            <ViewSlider sliderClick={togglePublicView}/>
            <div>
              <label htmlFor="sortKeys" style={{marginRight:"5px", fontWeight:"bold"}}>Sort Summaries</label>
              <select name="sortKeys"
                    className="sortKeySelector"
                    autoComplete="off"
                    defaultValue="Strongest"
                    onChange={(e) => setSortKey(e.target.value)}
              >
                {getSortKeys()}
              </select>
            </div>
          </div>
          <CuisineSummaries posts={publicView ? publicPosts : privatePosts} sortKey={sortKey}/>
          {user &&
            <div className="preTable" style={{marginTop:"20px", marginBottom:"0px"}}>
              <Profile />
            </div>
          }
      </div>
    </div>
  )
}

export default SummaryPage