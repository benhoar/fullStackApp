const extractData = (data) => {
   // const cuisines = {
   //                   "American":{region:"United Staes", cuisines:Set(["American"])}, 
   //                   "Barbecue":{region:"Southern USA", cuisines:Set(["Barbecue"])}, 
   //                   "Mexican":{region:"Mexico", cuisines:Set(["Mexican"])},
   //                   "Central American":{region:"Central America", cuisines:Set(["Honduran", "Guatemalan", "Salvadoran", "Nicaraguan"])},
   //                   "Venezuelan":{region:"Venezula", cuisines:Set(["Venezuelan"])}, 
   //                   "Colombian":{region:"Colombia", cuisines:Set(["Colombian"])}, 
   //                   "Bolivian":{region:"Bolivia", cuisines:Set(["Bolivian"])}, 
   //                   "Chilean":{region:"Chile", cuisines:Set(["Chilean"])},
   //                   "Brazilian":{region:"Venezula", cuisines:Set(["Venezuelan"])},  
   //                   "Argentinian":{region:"Argentina", cuisines:Set(["Argentinian"])},  
   //                   "Hispaniolan":{region:"Hispaniola", cuisines:Set(["Haitian", "Dominican"])},   
   //                   "Cuban":{region:"Cuba", cuisines:Set(["Cuban"])},  
   //                   "Jamaican":{region:"Jamaica", cuisines:Set(["Jamaican"])},  
   //                   "Southern African":{region:"Southern Africa", cuisines:Set(["South African"])},  
   //                   "Central African":{region:"Central Africa", cuisines:Set(["Central African"])},  
   //                   "Eastern African":{region:"Eastern Africa", cuisines:Set(["Sudanese", "Ethiopian"])},  
   //                   "Western African":{region:"Western Africa", cuisines:Set(["Nigerian"])},  
   //                   "Northern African":{region:"Northern Africa", cuisines:Set(["Moroccan", "Egyptian", "Eritrean"])},  
   //                   "Middle Eastern":{region:"Middle East", cuisines:Set(["Iranian", "Israeli", "Palestinian"])},  
   //                   "British":{region:"England", cuisines:Set(["British"])},  
   //                   "Portuguese":{region:"Portugal", cuisines:Set(["Portuguese"])},  
   //                   "Spanish":{region:"Spain", cuisines:Set(["Spanish"])},
   //                   "Italian":{region:"Italy", cuisines:Set(["Italian"])}, 
   //                   "Pizza":{region:"Pizza", cuisines:Set(["Pizza"])},
   //                   "Greek":{region:"Greece", cuisines:Set(["Greek"])}, 
   //                   "Turkish":{region:"Turkey", cuisines:Set(["Turkish"])},
   //                   "Russian":{region:"Russia", cuisines:Set(["Russian"])}, 
   //                   "Ukrainian":{region:"Ukraine", cuisines:Set(["Ukrainian"])},
   //                   "Polish":{region:"Poland", cuisines:Set(["Polish"])}, 
   //                   "German":{region:"Germany", cuisines:Set(["German"])},
   //                   "French":{region:"France", cuisines:Set(["French"])},
   //                   "Danish":{region:"Denmark", cuisines:Set(["Danish"])},
   //                   "Swedish":{region:"Sweden", cuisines:Set(["Swedish"])},
   //                   "Australian":{region:"Australia", cuisines:Set(["Australian"])},
   //                   "Japanese":{region:"Japan", cuisines:Set(["Japanese"])},
   //                   "Korean":{region:"South Korea", cuisines:Set(["Korean"])},
   //                   "Chinese":{region:"Eastern China", cuisines:Set(["Chinese"])},
   //                   "Dim Sum":{region:"Southern China", cuisines:Set(["Dim Sum"])},
   //                   "Hot Pot":{region:"Western China", cuisines:Set(["Hot Pot"])},
   //                   "Hawaiian":{region:"Hawaii", cuisines:Set(["Hawaiian"])},
   //                   "Indian":{region:"India", cuisines:Set(["Indian"])},
   //                   "Thai":{region:"Thailand", cuisines:Set(["Thai"])},
   //                   "Vietnamese":{region:"Vietnam", cuisines:Set(["Vietnamese"])},
   //                   "Cambodian":{region:"Camboida", cuisines:Set(["Cambodian"])},
   //                   "Philippino":{region:"Philippines", cuisines:Set(["Philippino"])},
   // }
   const winners = {}
   data.forEach((item) => {
      console.log(item.cuisine)
      const cuisine = item.cuisine
      const cur = {'restaurant': item.restaurant, 'rating': item.rating}
      if (cuisine in winners) {
         winners[cuisine] = item.rating > winners[cuisine].rating ? cur : winners[cuisine]
      } else {
         winners[cuisine] = cur
      }
      console.log(winners)
   })
   return winners
}

export default extractData