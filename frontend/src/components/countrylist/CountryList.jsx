import './countrylist.css'
import { FaTimes } from 'react-icons/fa'

const CountryList = ({ setRater, setSelected, cuisineTypes, selected, mapDispatch }) => {

   const getList = () => {
    const items = []
    const sortedTypes = Object.keys(cuisineTypes).sort()
    for (let i = 0; i < sortedTypes.length; i++) {
        const cuisine = sortedTypes[i]
        items.push(<li key={cuisine}
                       onClick={() => {setSelected(cuisine); mapDispatch({ type: "SET VISIBILITY", country: cuisineTypes[cuisine], visible: true})}}
                       className={selected === cuisine ? "selectedItem" : "countryItem"}
                   >{cuisine}</li>)
    }
    return items
   }

   return (
      <div className="formWrapper">
        <ul className="countriesList">
          <div className="headerCancel">
              <FaTimes className="cancelBlog" style={{color:"#1B3A20"}} onClick={() => {setRater(false); setSelected("")}}/>
          </div>
          {getList()}
        </ul>
      </div>
   )
}

export default CountryList
