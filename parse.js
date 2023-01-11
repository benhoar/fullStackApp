const str = `<Marker name={"USA1"} position={{top:"223px", left:"273px"}} onClick={() => onClick("USA 1", 2)}/>
<Marker name={"USA2"} position={{top:"256px", left:"335px"}} onClick={() => onClick("USA 2", 1)}/>
<Marker name={"Mexico"} position={{top:"281px", left:"240px"}} onClick={() => onClick("Mexico", 3)}/>
<Marker name={"CAm"} position={{top:"331px", left:"277px"}} onClick={() => onClick("Cent. Amer.", 0)}/>
<Marker name={"Venezuela"} position={{top:"286px", left:"88px"}} onClick={() => onClick("Venezuela", 2)}/>
<Marker name={"Colombia"} position={{top:"301px", left:"55px"}} onClick={() => onClick("Colombia", 3)}/>
<Marker name={"Bolivia"} position={{top:"380px", left:"88px"}} onClick={() => onClick("Bolivia", 1)}/>
<Marker name={"Chile"} position={{top:"461px", left:"35px"}} onClick={() => onClick("Chile", 2)}/>
<Marker name={"Brazil"} position={{top:"351px", left:"120px"}} onClick={() => onClick("Brazil", 3)}/>
<Marker name={"Argentina"} position={{top:"501px", left:"112px"}} onClick={() => onClick("Argentina", 0)}/>
<Marker name={"Hispaniola"} position={{top:"465px", left:"392px"}} onClick={() => onClick("Hispaniola", 1)}/>
<Marker name={"Cuba"} position={{top:"436px", left:"319px"}} onClick={() => onClick("Cuba", 1)}/>
<Marker name={"Jamaica"} position={{top:"536px", left:"305px"}} onClick={() => onClick("Jamaica", 3)}/>
<Marker name={"SAf"} position={{top:"481px", left:"502px"}} onClick={() => onClick("S. Africa", 3)}/>
<Marker name={"CAf"} position={{top:"411px", left:"490px"}} onClick={() => onClick("C. Africa", 3)}/>
<Marker name={"EAf"} position={{top:"376px", left:"575px"}} onClick={() => onClick("E. Africa", 2)}/>
<Marker name={"WAf"} position={{top:"371px", left:"415px"}} onClick={() => onClick("W. Africa", 2)}/>
<Marker name={"NAf"} position={{top:"301px", left:"455px"}} onClick={() => onClick("N. Africa", 1)}/>
<Marker name={"Iran"} position={{top:"451px", left:"742px"}} onClick={() => onClick("Iran", 3)}/>
<Marker name={"UK"} position={{top:"426px", left:"855px"}} onClick={() => onClick("United Kingdom", 3)}/>
<Marker name={"Portugal"} position={{top:"516px", left:"860px"}} onClick={() => onClick("Portugal", 1)}/>
<Marker name={"Spain"} position={{top:"532px", left:"905px"}} onClick={() => onClick("Spain", 2)}/>
<Marker name={"Italy"} position={{top:"551px", left:"966px"}} onClick={() => onClick("Italy", 3)}/>
<Marker name={"Greece"} position={{top:"556px", left:"1021px"}} onClick={() => onClick("Greece", 0)}/>
<Marker name={"Turkey"} position={{top:"531px", left:"1135px"}} onClick={() => onClick("Turkey", 2)}/>
<Marker name={"Russia"} position={{top:"431px", left:"1118px"}} onClick={() => onClick("Russia", 2)}/>
<Marker name={"Ukraine"} position={{top:"461px", left:"1082px"}} onClick={() => onClick("Ukraine", 3)}/>
<Marker name={"Poland"} position={{top:"446px", left:"1022px"}} onClick={() => onClick("Poland", 1)}/>
<Marker name={"Germany"} position={{top:"458px", left:"972px"}} onClick={() => onClick("Germany", 2)}/>
<Marker name={"France"} position={{top:"478px", left:"925px"}} onClick={() => onClick("France", 2)}/>
<Marker name={"Denmark"} position={{top:"408px", left:"948px"}} onClick={() => onClick("Denmark", 1)}/>
<Marker name={"Sweden"} position={{top:"346px", left:"999px"}} onClick={() => onClick("Sweden", 0)}/>
<Marker name={"Australia"} position={{top:"101px", left:"1100px"}} onClick={() => onClick("Australia", 2)}/>
<Marker name={"Japan"} position={{top:"146px", left:"1015px"}} onClick={() => onClick("Japan", 2)}/>
<Marker name={"South Korea"} position={{top:"136px", left:"940px"}} onClick={() => onClick("South Korea", 3)}/>
<Marker name={"EChina"} position={{top:"146px", left:"845px"}} onClick={() => onClick("E. China", 1)}/>
<Marker name={"SChina"} position={{top:"231px", left:"823px"}} onClick={() => onClick("S. China", 0)}/>
<Marker name={"WChina"} position={{top:"181px", left:"713px"}} onClick={() => onClick("W. China", 1)}/>
<Marker name={"Hawaii"} position={{top:"119px", left:"565px"}} onClick={() => onClick("Hawaii", 2)}/>
<Marker name={"India"} position={{top:"229px", left:"630px"}} onClick={() => onClick("India", 2)}/>
<Marker name={"Thailand"} position={{top:"284px", left:"774px"}} onClick={() => onClick("Thailand", 1)}/>
<Marker name={"Cambodia"} position={{top:"304px", left:"790px"}} onClick={() => onClick("Cambodia", 0)}/>
<Marker name={"Vietnam"} position={{top:"291px", left:"827px"}} onClick={() => onClick("Vietnam", 2)}/>
<Marker name={"Philippines"} position={{top:"344px", left:"857px"}} onClick={() => onClick("Philippines", 2)}/>`

const markers = str.split("Marker")
const newObj = {}
for (let i = 1; i < markers.length; i += 1) {
   const cur = markers[i]
   let strs = []
   let prev = -1
   for (let j = 0; j < cur.length; j += 1) {
      if (cur.charAt(j) === '\"' && prev !== -1) {
         strs.push(cur.substring(prev+1, j))
         prev = -1
      }
      else if (cur.charAt(j) === '\"') {
         prev = j
      }
   }
   newObj[strs.shift()] = {
      mapPos: [strs.shift(), strs.shift()] 
   }
}

Object.entries(newObj).map(([k, v]) => {
   console.log(`\"${k}\": {\n\tmapPos: ["${v["mapPos"][0]}", "${v["mapPos"][1]}"],\n\tprimary: "",\n\tcuisines: []\n},`)
})

const countries = {
  "USA1": {
    mapPos: ["223px", "273px"],
    primary: "United States",
    cuisines: ["American", "Seafood", "Burgers", "Farm to Table"]
  },
  "USA2": {
    mapPos: ["256px", "335px"],
    primary: "Southern USA",
    cuisines: ["Barbecue", "Soul Food"]
  },
  "Mexico": {
    mapPos: ["281px", "240px"],
    primary: "Mexico",
    cuisines: ["Mexican", "Tacos"],
  },
  "CAm": {
    mapPos: ["331px", "277px"],
    primary: "Central America",
    cuisines: ["Salvadoran", "Guatemalan", "Honduran", "Nicaraguan", "Panamanian"]
  },
  "Venezuela": {
    mapPos: ["286px", "88px"],
    primary: "Venezuela",
    cuisines: ["Venezuelan"]
  },
  "Colombia": {
    mapPos: ["301px", "55px"],
    primary: "Colombia",
    cuisines: ["Colombian"]
  },
  "Bolivia": {
    mapPos: ["380px", "88px"],
    primary: "Bolivia",
    cuisines: ["Bolivian"]
  },
  "Chile": {
    mapPos: ["461px", "35px"],
    primary: "Chile",
    cuisines: ["Chilean"]
  },
  "Brazil": {
    mapPos: ["351px", "120px"],
    primary: "Brazil",
    cuisines: ["Brazilian", "Churrasco"]
  },
  "Argentina": {
    mapPos: ["501px", "112px"],
    primary: "Argentina",
    cuisines: ["Argentinian"]
  },
  "Hispaniola": {
    mapPos: ["465px", "392px"],
    primary: "Hispaniola",
    cuisines: ["Haitian", "Dominican"]
  },
  "Cuba": {
    mapPos: ["436px", "319px"],
    primary: "Cuba",
    cuisines: ["Cuban"]
  },
  "Jamaica": {
    mapPos: ["536px", "305px"],
    primary: "Jamaica",
    cuisines: ["Jamaican"]
  },
  "SAf": {
    mapPos: ["481px", "502px"],
    primary: "Southern Africa",
    cuisines: [] //fill
  },
  "CAf": {
    mapPos: ["411px", "490px"],
    primary: "Central Africa",
    cuisines: [] //fill
  },
  "EAf": {
    mapPos: ["376px", "575px"],
    primary: "Eastern Africa",
    cuisines: ["Ethiopian", "Sudanese", "Kenyan"]
  },
  "WAf": {
    mapPos: ["371px", "415px"],
    primary: "Western Africa",
    cuisines: ["Nigerian"]
  },
  "NAf": {
    mapPos: ["301px", "455px"],
    primary: "Northern Africa",
    cuisines: ["Moroccan", "Tunisian", "Egyptian"]
  },
  "Iran": {
    mapPos: ["451px", "742px"],
    primary: "Iran",
    cuisines: ["Iranian", "Persian"]
  },
  "UK": {
    mapPos: ["426px", "855px"],
    primary: "United Kingdom",
    cuisines: ["Scottish", "British", "Irish"]
  },
  "Portugal": {
    mapPos: ["516px", "860px"],
    primary: "Portugal",
    cuisines: ["Portuguese"]
  },
  "Spain": {
    mapPos: ["532px", "905px"],
    primary: "Spain",
    cuisines: ["Spanish", "Tapas"]
  },
  "Italy": {
    mapPos: ["551px", "966px"],
    primary: "Italy",
    cuisines: ["Italian", "Pizza"]
  },
  "Greece": {
    mapPos: ["556px", "1021px"],
    primary: "Greece",
    cuisines: ["Greek", "Mediterranean"]
  },
  "Turkiye": {
    mapPos: ["531px", "1135px"],
    primary: "Turkiye",
    cuisines: ["Turkish"]
  },
  "Russia": {
    mapPos: ["431px", "1118px"],
    primary: "Russia",
    cuisines: ["Russian"]
  },
  "Ukraine": {
    mapPos: ["461px", "1082px"],
    primary: "Ukraine",
    cuisines: ["Ukrainian"]
  },
  "Poland": {
    mapPos: ["446px", "1022px"],
    primary: "Poland",
    cuisines: ["Polish"]
  },
  "Germany": {
    mapPos: ["458px", "972px"],
    primary: "Germany",
    cuisines: ["German"]
  },
  "France": {
    mapPos: ["478px", "925px"],
    primary: "France",
    cuisines: ["French"]
  },
  "Denmark": {
    mapPos: ["408px", "948px"],
    primary: "Denmark",
    cuisines: ["Dutch"]
  },
  "Sweden": {
    mapPos: ["346px", "999px"],
    primary: "Sweden",
    cuisines: ["Swedish"]
  },
  "Australia": {
    mapPos: ["101px", "1100px"],
    primary: "Australia",
    cuisines: ["Australian"]
  },
  "Japan": {
    mapPos: ["146px", "1015px"],
    primary: "Japan",
    cuisines: ["Japanese", "Ramen", "Sushi"]
  },
  "South Korea": {
    mapPos: ["136px", "940px"],
    primary: "South Korea",
    cuisines: ["Korean", "KBBQ"]
  },
  "EChina": {
    mapPos: ["146px", "845px"],
    primary: "Eastern China",
    cuisines: ["Peking Duck", "Jiangsu"]
  },
  "SChina": {
    mapPos: ["231px", "823px"],
    primary: "Southern China",
    cuisines: ["Dim Sum", "Chinese"]
  },
  "WChina": {
    mapPos: ["181px", "713px"],
    primary: "Western China",
    cuisines: ["Hot Pot", "Sichuan"]
  },
  "Hawaii": {
    mapPos: ["119px", "565px"],
    primary: "Hawaii",
    cuisines: ["Hawaiian"]
  },
  "India": {
    mapPos: ["229px", "630px"],
    primary: "India",
    cuisines: ["Indian"]
  },
  "Thailand": {
    mapPos: ["284px", "774px"],
    primary: "Thailand",
    cuisines: ["Thai"]
  },
  "Cambodia": {
    mapPos: ["304px", "790px"],
    primary: "Cambodia",
    cuisines: ["Cambodian"]
  },
  "Vietnam": {
    mapPos: ["291px", "827px"],
    primary: "Vietnam",
    cuisines: ["Vietnamese"]
  },
  "Philippines": {
    mapPos: ["344px", "857px"],
    primary: "Philippines",
    cuisines: ["Filipino"]
  },
}


 console.log("{")
 Object.entries(countries).map(([k, v]) => {
   console.log(`\t"${v.primary}": {`)
   let cuisString = ""
   v.cuisines.forEach((c) => cuisString += (`"${c}"` + ','))
   console.log(`\t\tmapPos: ["${v.mapPos[0]}", "${v.mapPos[1]}"],`)
   console.log(`\t\tcuisines: [${cuisString}],`)
   console.log(`\t\tvisible: false,`)
   console.log("\t},")
})
 console.log("}")

//  console.log("{")
//  Object.entries(countries).map(([k, v]) => {
//     console.log(`\t"${v.primary}":"${k}",`)
//  })
//  console.log("}")

  // const meaningLessReducer = (state, action) => {
  //   switch (action.type) {
  //     case 'NAME CHANGE':
  //      return { ...state, name: action.payload }
  //     case 'AGE CHANGE':
  //      return { ...state, age: state.age + action.payload }
  //     case 'LIST ADD':
  //      let updatedState = {
  //       ...state,
  //       myList: [...state.myList, action.payload]
  //      }
  //      return updatedState
  //     case 'CHANGE OBJ TYPE':
  //       return { ...state, obj: { ...state.obj, type: action.payload}}
  //     default:
  //       return state
  //   }
  // }

  // const [meaningless, meaninglessDispatch] = useReducer(meaningLessReducer, {
  //   name: '',
  //   age: 10,
  //   myList: new Array(0),
  //   obj: {
  //     type: "ben"
  //   }
  // })

  // useEffect(() => {
  //   meaninglessDispatch({type: 'NAME CHANGE', payload: 'HOAR'})
  //   meaninglessDispatch({type: 'LIST ADD', payload: "one"})
  //   meaninglessDispatch({type: 'LIST ADD', payload: 'two'})
  //   meaninglessDispatch({type: 'AGE CHANGE', payload: -3})
  //   meaninglessDispatch({type: 'CHANGE OBJ TYPE', payload: 'NEW TYPE'})
  // }, [])

  // console.log(meaningless)

  const test = {
    "hey": {yo:1},
    "there": {yo:2},
  }

  Object.entries(test).map((entry) => {
    console.log(entry[0])
  })