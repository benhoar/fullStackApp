import './countrylist.css'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import SummaryPost from '../summarypost/SummaryPost'
import { getCuisines } from '../../scripts/getCuisines'
import { useAuthContext } from '../../hooks/useAuthContext'

const CountryList = ({ onClick, setSelected, cuisineTypes }) => {
   const [activeCuisine, setActiveCuisine] = useState('')
   const [pop, setPop] = useState(false)
   const [notFound, setNotFound] = useState(false)
   const [popData, setPopData] = useState([])
   const { user } = useAuthContext()
   
   const primaries = new Set()

   const regionSorter = (regions) => {
      return Object.keys(regions).sort().reduce(function(res, key) {
        const cuisine = regions[key]
        cuisine.cuisines.forEach((c) => res[c] = cuisine.primary)
        primaries.add(cuisine.primary)
        return res
      }, {})
    }

   const getData = async(value) => {
      let cuisines = null
      if (value in primaries) {
        cuisines = cuisineTypes[value]
      } else {
        cuisines = [value]
      }
      const res = await getCuisines(cuisines, user)
      return res
   }

   const cuisineToOrigin = regionSorter(cuisineTypes)

   return (
      <form className="formWrapper">
        <div className="headerCancel">
            <FaTimes className="cancelBlog" style={{color:"#1B3A20"}} onClick={() => {onClick(); setSelected("")}}/>
        </div>
        <ul className="countriesList">
          {Object.entries(cuisineToOrigin).map(([cuisine, origin]) => {
              return <li className={activeCuisine === cuisine ? "selectedCountry" : "countryItem"}
                          key={cuisine} 
                          onClick={ async () => {
                            setActiveCuisine(cuisine)
                            await getData(cuisine)
                              .then((data) => {
                                if (data) {
                                  setPopData(data)
                                  setPop(true)
                                }
                                else {
                                  setNotFound(true)
                                  setTimeout(() => {setNotFound(false)}, 2000)
                                }
                                setSelected(origin)
                            })
                          }}
                      >
                          {cuisine}
                      </li>
          })}
        </ul>
        {pop && 
          <div className="summaryPop" style={{left:"310%", top:"-8%"}}>
              <SummaryPost data={popData} name={activeCuisine} visible={pop} setVisible={setPop}/>  
          </div>
        }
        {notFound &&
          <div id="sideNotFound">No {activeCuisine} Ratings</div>
        }
      </form>
   )
}

export default CountryList
