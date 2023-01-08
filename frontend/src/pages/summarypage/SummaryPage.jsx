import './summarypage.css'
import Graph from '../../components/graph/Graph'
import { useGetBlogs } from '../../hooks/useGetBlogs'
import SummaryPost from '../../components/summarypost/SummaryPost'
import Profile from '../../components/profile/Profile'

const SummaryPage = () => {

  const { data } = useGetBlogs()

  const getTableRow = (cuisine) => {
    let topSpot = ["nowhere", 0, "nowhere"]
    const graphScores = new Array(10).fill(0)
    cuisine.blogs.forEach((b) => {
      graphScores[b.rating-1] += 1
      if (b.rating > topSpot[1]) {
        topSpot = [b.restaurant, b.rating, b.location]
      }
    })
    let av = (cuisine.scoreSum / cuisine.blogs.length).toFixed(2)
    return (
      <tr key={cuisine.cuisine} className="tableRow">
        <td>{cuisine.cuisine}</td>
        <td>
          <span>{topSpot[0]}</span>
          <span style={{fontSize:"18px"}}>{" – "}{topSpot[2]}</span> 
        </td>
        <td className="scores">{cuisine.blogs.length}</td>
        <td className="scores">{av}</td>
        <td>
          <div className="graphWrapper">
            <Graph data={graphScores}/>
          </div>
        </td>
      </tr>
    )
  }

  const getTableBody = () => {
    const rows = []
    for (let i = 0; i < data.cuisines.length; i++) {
      const cuisine = data.cuisines[i]
      rows.push(getTableRow(cuisine))
    }
    return rows
  }

  return (
    <div className="summaryWrapper">
        <div className="tableWrapper">
        <div className="preTable">
          <Profile />
          <SummaryPost data={data.cuisines} isSummary={true}/>
        </div>
        <div className="tableAndGraph">
          <table className="summaryTable">
            <thead>
              <tr className="headerRow">
                <th className='tableHeader'>Cuisine</th>
                <th className='tableHeader'>Top Restaurant</th>
                <th className='tableHeader'>Spots Visited</th>
                <th className='tableHeader'>Avg. Score</th>
                <th className='tableHeader'>Score Distribution</th>
              </tr>
            </thead>
            <tbody className="summaryBody">
              {getTableBody()}
            </tbody>
          </table>
          <div className="tableCap"></div>
        </div>
      </div>
    </div>
  )
}

export default SummaryPage