const countries = {
  "United States": {
    mapPos: ["223px", "273px"],
    cuisines: ["American","Seafood","Burgers","Farm to Table", "Sandwich",],
    visible: false,
  },
  "Southern USA": {
    mapPos: ["256px", "335px"],
    cuisines: ["Barbecue","Soul Food", "Cajun"],
    visible: false,
  },
  "Mexico": {
    mapPos: ["281px", "240px"],
    cuisines: ["Mexican","Tacos",],
    visible: false,
  },
  "Central America": {
    mapPos: ["331px", "277px"],
    cuisines: ["Salvadoran","Guatemalan","Honduran","Nicaraguan","Panamanian",],
    visible: false,
  },
  "Venezuela": {
    mapPos: ["286px", "88px"],
    cuisines: ["Venezuelan",],
    visible: false,
  },
  "Colombia": {
    mapPos: ["301px", "55px"],
    cuisines: ["Colombian",],
    visible: false,
  },
  "Bolivia": {
    mapPos: ["380px", "88px"],
    cuisines: ["Bolivian",],
    visible: false,
  },
  "Chile": {
    mapPos: ["461px", "35px"],
    cuisines: ["Chilean",],
    visible: false,
  },
  "Brazil": {
    mapPos: ["351px", "120px"],
    cuisines: ["Brazilian","Churrasco",],
    visible: false,
  },
  "Argentina": {
    mapPos: ["501px", "112px"],
    cuisines: ["Argentinian",],
    visible: false,
  },
  "Hispaniola": {
    mapPos: ["465px", "392px"],
    cuisines: ["Haitian","Dominican",],
    visible: false,
  },
  "Cuba": {
    mapPos: ["436px", "319px"],
    cuisines: ["Cuban",],
    visible: false,
  },
  "Jamaica": {
    mapPos: ["536px", "305px"],
    cuisines: ["Jamaican",],
    visible: false,
  },
  "Southern Africa": {
    mapPos: ["481px", "502px"],
    cuisines: [],
    visible: false,
  },
  "Central Africa": {
    mapPos: ["411px", "490px"],
    cuisines: [],
    visible: false,
  },
  "Eastern Africa": {
    mapPos: ["376px", "575px"],
    cuisines: ["Ethiopian","Sudanese","Kenyan",],
    visible: false,
  },
  "Western Africa": {
    mapPos: ["371px", "415px"],
    cuisines: ["Nigerian",],
    visible: false,
  },
  "Northern Africa": {
    mapPos: ["301px", "455px"],
    cuisines: ["Moroccan","Tunisian","Egyptian",],
    visible: false,
  },
  "Iran": {
    mapPos: ["451px", "742px"],
    cuisines: ["Iranian","Persian", "Middle Eastern"],
    visible: false,
  },
  "United Kingdom": {
    mapPos: ["426px", "855px"],
    cuisines: ["Scottish","British","Irish",],
    visible: false,
  },
  "Portugal": {
    mapPos: ["516px", "860px"],
    cuisines: ["Portuguese",],
    visible: false,
  },
  "Spain": {
    mapPos: ["532px", "905px"],
    cuisines: ["Spanish","Tapas",],
    visible: false,
  },
  "Italy": {
    mapPos: ["551px", "966px"],
    cuisines: ["Italian","Pizza",],
    visible: false,
  },
  "Greece": {
    mapPos: ["556px", "1021px"],
    cuisines: ["Greek","Mediterranean",],
    visible: false,
  },
  "Turkiye": {
    mapPos: ["531px", "1135px"],
    cuisines: ["Turkish",],
    visible: false,
  },
  "Russia": {
    mapPos: ["431px", "1118px"],
    cuisines: ["Russian",],
    visible: false,
  },
  "Ukraine": {
    mapPos: ["461px", "1082px"],
    cuisines: ["Ukrainian",],
    visible: false,
  },
  "Poland": {
    mapPos: ["446px", "1022px"],
    cuisines: ["Polish",],
    visible: false,
  },
  "Germany": {
    mapPos: ["458px", "972px"],
    cuisines: ["German",],
    visible: false,
  },
  "France": {
    mapPos: ["478px", "925px"],
    cuisines: ["French",],
    visible: false,
  },
  "Denmark": {
    mapPos: ["408px", "948px"],
    cuisines: ["Dutch",],
    visible: false,
  },
  "Sweden": {
    mapPos: ["346px", "999px"],
    cuisines: ["Swedish",],
    visible: false,
  },
  "Australia": {
    mapPos: ["101px", "1100px"],
    cuisines: ["Australian",],
    visible: false,
  },
  "Japan": {
    mapPos: ["146px", "1015px"],
    cuisines: ["Japanese","Ramen","Sushi",],
    visible: false,
  },
  "South Korea": {
    mapPos: ["136px", "940px"],
    cuisines: ["Korean","KBBQ",],
    visible: false,
  },
  "Eastern China": {
    mapPos: ["146px", "845px"],
    cuisines: ["Peking Duck","Jiangsu",],
    visible: false,
  },
  "Southern China": {
    mapPos: ["231px", "823px"],
    cuisines: ["Dim Sum","Chinese",],
    visible: false,
  },
  "Western China": {
    mapPos: ["181px", "713px"],
    cuisines: ["Hot Pot","Sichuan",],
    visible: false,
  },
  "Hawaii": {
    mapPos: ["119px", "565px"],
    cuisines: ["Hawaiian",],
    visible: false,
  },
  "India": {
    mapPos: ["229px", "630px"],
    cuisines: ["Indian",],
    visible: false,
  },
  "Thailand": {
    mapPos: ["284px", "774px"],
    cuisines: ["Thai",],
    visible: false,
  },
  "Cambodia": {
    mapPos: ["304px", "790px"],
    cuisines: ["Cambodian",],
    visible: false,
  },
  "Vietnam": {
    mapPos: ["291px", "827px"],
    cuisines: ["Vietnamese",],
    visible: false,
  },
  "Philippines": {
    mapPos: ["344px", "857px"],
    cuisines: ["Filipino",],
    visible: false,
  },
}

const w = 1216.15
const h = 609
console.log("{")
Object.entries(countries).map(([key, val]) => {
  console.log(`\t"${key}": {`)
  let mapPos = `["${(100*val.mapPos[0].match(/\d+/)[0]/h).toFixed(1)}%", "${(100*val.mapPos[1].match(/\d+/)[0]/w).toFixed(1)}%"]`
  console.log(`\t\tmapPos: ${mapPos},`)
  console.log(`\t\tvisible: false,`)
  let cuisines = "["
  val.cuisines.forEach(cuisine => cuisines += `"${cuisine}",`)
  cuisines += ']'
  console.log(`\t\tcuisines: ${cuisines}`)
  console.log('\t},')
})
console.log("}")

const str = "294px".match(/\d+/)[0]
console.log(str)


const cuisineObject = {
	"United States": {
		mapPos: ["36.6%", "22.4%"],
		visible: false,
		cuisines: ["American","Seafood","Burgers","Farm to Table","Sandwich",]
	},
	"Southern USA": {
		mapPos: ["42.0%", "27.5%"],
		visible: false,
		cuisines: ["Barbecue","Soul Food","Cajun",]
	},
	"Mexico": {
		mapPos: ["46.1%", "19.7%"],
		visible: false,
		cuisines: ["Mexican","Tacos",]
	},
	"Central America": {
		mapPos: ["54.4%", "22.8%"],
		visible: false,
		cuisines: ["Salvadoran","Guatemalan","Honduran","Nicaraguan","Panamanian",]
	},
	"Venezuela": {
		mapPos: ["47.0%", "6.7%"],
		visible: false,
		cuisines: ["Venezuelan",]
	},
	"Colombia": {
		mapPos: ["49.9%", "4.5%"],
		visible: false,
		cuisines: ["Colombian",]
	},
	"Bolivia": {
		mapPos: ["62.9%", "7.2%"],
		visible: false,
		cuisines: ["Bolivian",]
	},
	"Chile": {
		mapPos: ["75.7%", "2.9%"],
		visible: false,
		cuisines: ["Chilean",]
	},
	"Brazil": {
		mapPos: ["57.6%", "9.9%"],
		visible: false,
		cuisines: ["Brazilian","Churrasco",]
	},
	"Argentina": {
		mapPos: ["82.3%", "9.2%"],
		visible: false,
		cuisines: ["Argentinian",]
	},
	"Hispaniola": {
		mapPos: ["77.4%", "32.2%"],
		visible: false,
		cuisines: ["Haitian","Dominican",]
	},
	"Cuba": {
		mapPos: ["73.1%", "26.2%"],
		visible: false,
		cuisines: ["Cuban",]
	},
	"Jamaica": {
		mapPos: ["88.8%", "25.1%"],
		visible: false,
		cuisines: ["Jamaican",]
	},
	"Southern Africa": {
		mapPos: ["82.0%", "42.3%"],
		visible: false,
		cuisines: []
	},
	"Central Africa": {
		mapPos: ["67.5%", "40.8%"],
		visible: false,
		cuisines: []
	},
	"Eastern Africa": {
		mapPos: ["62.7%", "47.3%"],
		visible: false,
		cuisines: ["Ethiopian","Sudanese","Kenyan",]
	},
	"Western Africa": {
		mapPos: ["62%", "34.1%"],
		visible: false,
		cuisines: ["Nigerian",]
	},
	"Northern Africa": {
		mapPos: ["49.4%", "37.4%"],
		visible: false,
		cuisines: ["Moroccan","Tunisian","Egyptian",]
	},
	"Iran": {
		mapPos: ["75.1%", "62.0%"],
		visible: false,
		cuisines: ["Iranian","Persian","Middle Eastern",]
	},
	"United Kingdom": {
		mapPos: ["68.0%", "72%"],
		visible: false,
		cuisines: ["Scottish","British","Irish",]
	},
	"Portugal": {
		mapPos: ["88.7%", "71.7%"],
		visible: false,
		cuisines: ["Portuguese",]
	},
	"Spain": {
		mapPos: ["88.4%", "75.1%"],
		visible: false,
		cuisines: ["Spanish","Tapas",]
	},
	"Italy": {
		mapPos: ["87.5%", "81.1%"],
		visible: false,
		cuisines: ["Italian","Pizza",]
	},
	"Greece": {
		mapPos: ["91.3%", "85.0%"],
		visible: false,
		cuisines: ["Greek","Mediterranean",]
	},
	"Turkiye": {
		mapPos: ["90.2%", "91.7%"],
		visible: false,
		cuisines: ["Turkish",]
	},
	"Russia": {
		mapPos: ["70.8%", "91.9%"],
		visible: false,
		cuisines: ["Russian",]
	},
	"Ukraine": {
		mapPos: ["76.9%", "90.0%"],
		visible: false,
		cuisines: ["Ukrainian",]
	},
	"Poland": {
		mapPos: ["73.2%", "85.0%"],
		visible: false,
		cuisines: ["Polish",]
	},
	"Germany": {
		mapPos: ["75.2%", "80.9%"],
		visible: false,
		cuisines: ["German",]
	},
	"France": {
		mapPos: ["79%", "77.1%"],
		visible: false,
		cuisines: ["French",]
	},
	"Denmark": {
		mapPos: ["67.0%", "79.0%"],
		visible: false,
		cuisines: ["Dutch",]
	},
	"Sweden": {
		mapPos: ["56.8%", "83.1%"],
		visible: false,
		cuisines: ["Swedish",]
	},
	"Australia": {
		mapPos: ["15.6%", "92.4%"],
		visible: false,
		cuisines: ["Australian",]
	},
	"Japan": {
		mapPos: ["24.0%", "83.9%"],
		visible: false,
		cuisines: ["Japanese","Ramen","Sushi",]
	},
	"South Korea": {
		mapPos: ["24.4%", "76.6%"],
		visible: false,
		cuisines: ["Korean","KBBQ",]
	},
	"Eastern China": {
		mapPos: ["24.0%", "69.5%"],
		visible: false,
		cuisines: ["Peking Duck","Jiangsu",]
	},
	"Southern China": {
		mapPos: ["37.9%", "67.7%"],
		visible: false,
		cuisines: ["Dim Sum","Chinese",]
	},
	"Western China": {
		mapPos: ["29.7%", "58.6%"],
		visible: false,
		cuisines: ["Hot Pot","Sichuan",]
	},
	"Hawaii": {
		mapPos: ["23.5%", "46%"],
		visible: false,
		cuisines: ["Hawaiian",]
	},
	"India": {
		mapPos: ["37.6%", "51.8%"],
		visible: false,
		cuisines: ["Indian",]
	},
	"Thailand": {
		mapPos: ["46.6%", "63.9%"],
		visible: false,
		cuisines: ["Thai",]
	},
	"Cambodia": {
		mapPos: ["49.9%", "65.5%"],
		visible: false,
		cuisines: ["Cambodian",]
	},
	"Vietnam": {
		mapPos: ["47.8%", "68.3%"],
		visible: false,
		cuisines: ["Vietnamese",]
	},
	"Philippines": {
		mapPos: ["54%", "72.5%"],
		visible: false,
		cuisines: ["Filipino",]
	},
}

console.log("{\n")
Object.keys(cuisineObject).forEach((country) => {
  const data = cuisineObject[country].cuisines
  data.forEach((cuisine) => {
    let mystr = `\t"${cuisine}": ,\n\t`
    console.log(mystr)
  })
})
console.log("}")