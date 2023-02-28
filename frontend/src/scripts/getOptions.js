import countries from '../staticdata/countries' 

const cuisines = new Set()
for (const country in countries) {
   for (let i = 0; i < countries[country].cuisines.length; i++) {
      cuisines.add(countries[country].cuisines[i])
   }
}

const getOptions = () => {

   const options =  Array.from(cuisines)
   options.sort()
   const tags = []
   for (let i = 0; i < options.length; i++) {
      tags.push(<option key={options[i]} value={options[i]} />)
   }
   return tags
}

export { getOptions, cuisines }