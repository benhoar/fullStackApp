import './summarypage.css'
import Graph from '../../components/graph/Graph'
import { useState, useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
const axios = require('axios').default

const SummaryPage = () => {
  const [cuisines, setCuisines] = useState([])
  const [allScores, setAllScores] = useState([])
  const [numSpots, setNumSpots] = useState(0)
  const [fullScoreSum, setFullScoreSum] = useState(0)
  const { user } = useAuthContext()

  useEffect(() => {
    const getBlogData = async () => {
      try {
        const res = await axios.get("/api/cuisines",
          {
            headers: { 'Authorization': `Bearer ${user.token}` }
          }
        )
        const scores = new Array(10).fill(0)
        let totalSpots = 0
        const allCuisines = []
        let scoreSum = 0
        res.data.forEach((cuisine) => {
           allCuisines.push(cuisine)
           totalSpots += cuisine.spotsVisited
           scoreSum += cuisine.scoreSum
           Object.entries(cuisine.allScores).map(([rating, count]) => scores[rating-1] += count)
        })
        setNumSpots(totalSpots)
        setAllScores(scores)
        setCuisines(allCuisines)
        setFullScoreSum(scoreSum)
      } catch (e) {
        console.log(e)
      }
    }
    getBlogData()
  }, [user])

  const getFirstRow = () => {
    const avg = (fullScoreSum/numSpots).toFixed(2)
    return (
      <tr className="tableRow">
        <td>All Cuisines</td>
        <td>Still Looking...</td>
        <td className="scores">{numSpots}</td>
        <td className="scores">{avg}</td>
        <td>
          <div className="graphWrapper">
            <Graph data={allScores}/>
          </div>
        </td>
      </tr>
    )
  }

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
    for (let i = 0; i < cuisines.length; i++) {
      const cuisine = cuisines[i]
      rows.push(getTableRow(cuisine))
    }
    return rows
  }

  return (
    <div className="summaryWrapper">
        <div className="tableWrapper">
        <h1>Cuisine Breakdown</h1>
        <p className="description" style={{fontSize:"24px", paddingBottom:"20px", textAlign:"justify"}}>
          Here you can find a summary of your experiences with each of the various cuisines of the worlds, plus a few
          special categories like "pizza" and "fine dining." Select a table row to see details about your experiences
          with that cuisine.
        </p>
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
              {getFirstRow()}
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