class Blogs {
   constructor(data) {
      this.data = data
      this.blogs = this.#extractBlogs()
   }

   #extractBlogs() {
      const blogs = []
      this.data.forEach(cuisine => {
         const curBlogs = cuisine.blogs
         curBlogs.forEach(blog => {
            blog.cuisine = cuisine.cuisine
            blog.user_id = cuisine.user
            blog.cuisine_id = cuisine._id
            blogs.push(blog)
         })
      })
      blogs.sort((a, b) =>  b.date.replaceAll(/\D/g, '') - a.date.replaceAll(/\D/g, ''))
      return blogs
   }

   sort(sortKey) {
      switch (sortKey) {
        case "Name A-Z":
          this.blogs.sort((a, b) =>  (a.restaurant > b.restaurant) ? 1 : ((b.restaurant > a.restaurant) ? -1 : 0))
          return
        case "Name Z-A":
          this.blogs.sort((a, b) =>  (b.restaurant > a.restaurant) ? 1 : ((a.restaurant > b.restaurant) ? -1 : 0))
          return
        case "Cuisine A-Z":
          this.blogs.sort((a, b) =>  (a.cuisine > b.cuisine) ? 1 : ((b.cuisine > a.cuisine) ? -1 : 0))
          return
        case "Cuisine Z-A":
          this.blogs.sort((a, b) =>  (b.cuisine > a.cuisine) ? 1 : ((a.cuisine > b.cuisine) ? -1 : 0))
          return
        case "Oldest":
          this.blogs.sort((a, b) =>  a.date.replaceAll(/\D/g, '') - b.date.replaceAll(/\D/g, ''))
          return
        case "Weakest":
          this.blogs.sort((a, b) =>  a.rating - b.rating)
          return
        case "Strongest":
          this.blogs.sort((a, b) =>  b.rating - a.rating)
          return
        default:
          this.blogs.sort((a, b) =>  b.date.replaceAll(/\D/g, '') - a.date.replaceAll(/\D/g, ''))
          return
      }
   }
}

export default Blogs

// data = [{
//    "_id": {
//      "$oid": "63a3a4823b3a394cb32cbf48"
//    },
//    "cuisine": "Filipino",
//    "spotsVisited": 1,
//    "scoreSum": 8,
//    "allScores": {
//      "8": 1
//    },
//    "topSpotScore": 8,
//    "topSpot": "Lasita",
//    "blogs": [
//      {
//        "_id": "Lasita",
//        "restaurant": "Lasita",
//        "rating": 8,
//        "location": "Chinatown",
//        "highlight": "Chicken Inasal",
//        "date": {
//          "$date": {
//            "$numberLong": "1671494440000"
//          }
//        },
//        "blog": "Filipino food, based on this place, is pretty different from other foods from the region that I have had. It was much more garlic-y and straightforward than a lot of other Asian dishes. However, it was very good! The chicken inasal (rotisserie chicken) was super good – I could have eaten much more. Further, the crispy rice starter was refreshing with lots of big chunks of beets, persimmon and daikon(?). I would like to go back and try some other things."
//      },
//      {
//       "_id": "Lasita",
//       "restaurant": "Boom",
//       "rating": 7,
//       "location": "Chinatown",
//       "highlight": "Chicken Inasal",
//       "date": {
//         "$date": {
//           "$numberLong": "1671494400000"
//         }
//       },
//       "blog": "Filipino food, based on this place, is pretty different from other foods from the region that I have had. It was much more garlic-y and straightforward than a lot of other Asian dishes. However, it was very good! The chicken inasal (rotisserie chicken) was super good – I could have eaten much more. Further, the crispy rice starter was refreshing with lots of big chunks of beets, persimmon and daikon(?). I would like to go back and try some other things."
//     }
//    ],
//    "__v": 0,
//    "user": {
//      "$oid": "63beffdda7fe8265dba1df59"
//    }
//  }]

// const myBlogs = new Blogs(data)
// console.log(myBlogs.blogs)

