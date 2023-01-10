export const getPieData = (data) => {

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
      spotsVisited += cur.spotsVisited
      scoreSum += cur.scoreSum 
      if (!topSpot || cur.topSpotScore > topSpot.topSpotScore) {
         topSpot = cur
      }
      for (const key in cur.allScores) {
         graphData[key-1] += cur.allScores[key]
      }
   }
   return { spotsVisited, scoreSum, topSpot, graphData, topSubCuisine }
}