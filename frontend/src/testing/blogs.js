// NOTE: there is no direct interaction with cuisines, all data is sourced through blogs,
//       which are subdocuments of the the cuisine model
// Ex. I POST/PUT to "Mediterranean" via adding a review of a greek restaurant, then on run
//     of front end request, I find "Greek" cuisine reviews which may include "Mediterranean"

// ADD BLOGS

// test 1: POST to new cuisine

// test 2: PUT to existing cuisine – not a new top review

// test 3: PUT to existing cuisine – new top review

// DELETE BLOGS

// test 1: DELETE not top restaurant

// test 2: DELETE top restaurant

// test 3: DELETE last blog of existing cuisine

// PUT BLOGS

// test 1: update each field individually

// test 2: change rating to be new top spot

// test 3: change rating to make top spot NOT top spot

// test 4: change name of top spot

// test 5: change name of and rating of top spot to make NOT top spot

// test 6: change name of and rating of top spot to make top spot