import { countries } from '../staticdata/countries'

const axios = require('axios').default

const getCuisines = async (cuisine, user) => {

  let cuisines = [cuisine]

  if (cuisine in countries) {
    cuisines = countries[cuisine].cuisines
  }

  const cuisData = []
  for (let i = 0; i < cuisines.length; i++) {
      const cuisine = cuisines[i]
      await axios.get(`/api/cuisines/cuisine/${cuisine}`,
        {
          headers: { 'Authorization': `Bearer ${user.token}` }
        }
      ).then((res) => {
        cuisData.push(res.data)
      }
      ).catch(() => {
        console.log(cuisine, " not found")
      }
    )
  }
  if (cuisData.length !== 0) {
    return cuisData
  } else {
    return null
  }
}

export { getCuisines }