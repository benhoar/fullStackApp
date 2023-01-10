import './summarypage.css'
import { useGetBlogs } from '../../hooks/useGetBlogs'
import SummaryPost from '../../components/summarypost/SummaryPost'
import Profile from '../../components/profile/Profile'
import CuisineSummary from '../../components/cuisinesummary/CuisineSummary'

// 960px width is where problems occur

const SummaryPage = () => {

  const { data } = useGetBlogs()

  const getCuisineSummaries = () => {
    const posts = []
    for (let i = 0; i < data.cuisines.length; i++) {
      const cuisine = data.cuisines[i]
      posts.push(<CuisineSummary key={cuisine._id} cuisine={cuisine} />)
    }
    return posts 
  }

  return (
    <div className="summaryWrapper">
        <div className="tableWrapper">
        <div className="preTable">
          <SummaryPost data={data.cuisines} isSummary={true}/>
        </div>
        {getCuisineSummaries()}
        <div className="preTable" style={{marginTop:"20px", marginBottom:"0px"}}>
        <Profile />
        </div>
      </div>
    </div>
  )
}

export default SummaryPage