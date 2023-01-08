export const getPieData = (data) => {
   const cuisToRegion = {
      "American": "United States",
      "Seafood": "United States",
      "Barbecue": "Southern USA",
      "Soul Food": "Southern USA",
      "Mexican": "Mexico",
      "Tacos": "Mexico",
      "Salvadoran": "Central America",
      "Guatemalan": "Central America",
      "Honduran": "Central America",
      "Nicaraguan": "Central America",
      "Panamanian": "Central America",
      "Venezuelan": "Venezuela",
      "Colombian": "Colombia",
      "Bolivian": "Bolivia",
      "Chilean": "Chile",
      "Brazilian": "Brazil",
      "Churrasco": "Brazil",
      "Argentinian": "Argentina",
      "Haitian": "Hispaniola",
      "Dominican": "Hispaniola",
      "Cuban": "Cuba",
      "Jamaican": "Jamaica",
      "Ethiopian": "Eastern Africa",
      "Sudanese": "Eastern Africa",
      "Kenyan": "Eastern Africa",
      "Nigerian": "Western Africa",
      "Moroccan": "Northern Africa",
      "Tunisian": "Northern Africa",
      "Egyptian": "Northern Africa",
      "Iranian": "Iran",
      "Persian": "Iran",
      "Scottish": "United Kingdom",
      "British": "United Kingdom",
      "Irish": "United Kingdom",
      "Portuguese": "Portugal",
      "Spanish": "Spain",
      "Tapas": "Spain",
      "Italian": "Italy",
      "Pizza": "Italy",
      "Greek": "Greece",
      "Mediterranean": "Greece",
      "Turkish": "Turkiye",
      "Russian": "Russia",
      "Ukrainian": "Ukraine",
      "Polish": "Poland",
      "German": "Germany",
      "French": "France",
      "Dutch": "Denmark",
      "Swedish": "Sweden",
      "Australian": "Australia",
      "Japanese": "Japan",
      "Ramen": "Japan",
      "Sushi": "Japan",
      "Korean": "South Korea",
      "KBBQ": "South Korea",
      "Peking Duck": "",
      "Jiangsu": "",
      "Dim Sum": "Southern China",
      "Chinese": "Southern China",
      "Hot Pot": "Western China",
      "Sichuan": "Western China",
      "Hawaiian": "Hawaii",
      "Indian": "India",
      "Thai": "Thailand",
      "Cambodian": "Cambodia",
      "Vietnamese": "Vietnam",
      "Filipino": "Philippines",
      "Farm to Table": "United States"
   }   
   let name = null
   let spotsVisited = 0
   let scoreSum = 0
   let topSpot = null
   const graphData = new Array(10).fill(0)
   let topSubCuisine = [null, 0]
   for (let i = 0; i < data.length; i += 1) {
      const cur = data[i]
      const lclavg = (cur.scoreSum/cur.spotsVisited).toFixed(2) 
      if (lclavg >= topSubCuisine[1]) {
         topSubCuisine = [cur.cuisine, lclavg]
      }
      name = cuisToRegion[cur.cuisine]
      spotsVisited += cur.spotsVisited
      scoreSum += cur.scoreSum 
      if (!topSpot || cur.topSpotScore > topSpot.topSpotScore) {
         topSpot = cur
      }
      for (const key in cur.allScores) {
         graphData[key-1] += cur.allScores[key]
      }
   }
   return { name, spotsVisited, scoreSum, topSpot, graphData, topSubCuisine }
}