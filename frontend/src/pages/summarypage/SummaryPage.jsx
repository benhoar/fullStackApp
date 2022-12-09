import './summarypage.css'
import { useState, useEffect } from 'react'
const axios = require('axios').default

const SummaryPage = () => {
  const [blogs, setBlogs] = useState([])
  const [cuisines, setCuisines] = useState({})
  useEffect(() => {
    const getBlogData = async () => {
      const foods = {}
      try {
        const res = await axios.get("/api/blogs")
        const allBlogs = res.data
        allBlogs.forEach((blog) => {
          if (blog.cuisine in foods) {
            foods[blog.cuisine].push({"rating":blog.rating, "restaurant":blog.restaurant})
          }
          else {
            foods[blog.cuisine] = [{"rating":blog.rating, "restaurant":blog.restaurant}]
          }
        })
        setCuisines(foods)
        setBlogs(allBlogs)
      } catch {
        console.log("error")
      }
    }
    getBlogData()
  }, [])
  return (
    <div className="summaryWrapper">
      <table className="summaryTable">
        <thead>
          <tr className="tableRow">
            <th className='tableHeader'>Cuisine</th>
            <th className='tableHeader'>Top Restaurant</th>
            <th className='tableHeader'>Avg. Score</th>
          </tr>
        </thead>
        <tbody className="summaryBody">
          {Object.entries(cuisines).map(([cuisine, data]) => {
            let topSpot = ["nowhere", 0]
            let sumOfScores = 0
            Object.entries(data).forEach((d) => {
              d = d[1]
              sumOfScores += d.rating
              if (d.rating > topSpot[1]) {
                topSpot = [d.restaurant, d.rating]
              }
            })
            const av = sumOfScores / data.length
            return (
              <tr key={cuisine} className="tableRow">
                <td>{cuisine}</td>
                <td>{topSpot[0]}</td>
                <td className="scores">{av}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default SummaryPage