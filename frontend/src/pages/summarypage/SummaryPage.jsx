import './summarypage.css'
import Graph from '../../components/graph/Graph'
import SummaryPost from '../../components/summarypost/SummaryPost'
import { useState, useEffect } from 'react'
const axios = require('axios').default

const SummaryPage = () => {
  //const [blogs, setBlogs] = useState([])
  const [cuisines, setCuisines] = useState({})

  useEffect(() => {
    const getBlogData = async () => {
      const foods = {}
      try {
        const res = await axios.get("/api/blogs")
        const allBlogs = res.data
        const allScores = new Array(10).fill(0)
        allBlogs.forEach((blog) => {
          if (blog.cuisine in foods) {
            foods[blog.cuisine].push({"rating":blog.rating, "restaurant":blog.restaurant, "location":blog.location})
          }
          else {
            foods[blog.cuisine] = [{"rating":blog.rating, "restaurant":blog.restaurant, "location":blog.location}]
          }
          allScores[blog.rating-1] += 1
        })
        setCuisines(foods)
      } catch {
        console.log("error")
      }
    }
    getBlogData()
  }, [])

  const getFirstRow = () => {
    const allScores = new Array(10).fill(0)
    let count = 0
    let length = 0
    Object.entries(cuisines).map(([cuisine, data]) => 
      Object.entries(data).forEach((d) => {
        allScores[d[1].rating-1] += 1
        count += d[1].rating
        length += 1
    }))
    let avg = (count/length).toFixed(2)
    return (
      <tr className="tableRow">
        <td>All Cuisines</td>
        <td>No Winner</td>
        <td className="scores">{length}</td>
        <td className="scores">{avg}</td>
        <td>
          <div className="graphWrapper">
            <Graph data={allScores}/>
          </div>
        </td>
      </tr>
    )
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
              {Object.entries(cuisines).map(([cuisine, data]) => {
                let topSpot = ["nowhere", 0, "nowhere"]
                let sumOfScores = 0
                const graphScores = new Array(10).fill(0)
                Object.entries(data).forEach((d) => {
                  d = d[1]
                  sumOfScores += d.rating
                  graphScores[d.rating-1] += 1
                  if (d.rating > topSpot[1]) {
                    topSpot = [d.restaurant, d.rating, d.location]
                  }
                })
                const av = sumOfScores / data.length
                return (
                  <tr key={cuisine} className="tableRow">
                    <td>{cuisine}</td>
                    <td>
                      <span>{topSpot[0]}</span>
                      <span style={{fontSize:"18px"}}>{" – "}{topSpot[2]}</span> 
                    </td>
                    <td className="scores">{data.length}</td>
                    <td className="scores">{av.toFixed(2)}</td>
                    <td>
                      <div className="graphWrapper">
                        <Graph data={graphScores}/>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="tableCap"></div>
        </div>
        <SummaryPost />
      </div>
    </div>
  )
}

export default SummaryPage