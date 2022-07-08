import Header from './components/blog/Header'
import Blogs from './components/blog/Blogs'
import AddBlog from './components/blog/AddBlog'
import TopBar from './components/navbar/TopBar'
// this is a hook called useState
import { useState } from 'react'
// import { Switch, Route, Link } from 'react-router-dom'

// App.js is where we have access to the state

function App() {
  // state is blogs and setBlogs is used to update state
  const [showAddBlog, setShowAddBlog] = useState(false)
  const [blogs, setBlogs] = useState([
    {
        id: 1,
        date: "Feb. 12, 2020",
        restaurant: "Kazu Nori",
        cuisine: "Japanese",
        rating: 10,
        text: "Kazu Nori is a handroll bar, the one I visited was in westwood. It pretty much exclusively has hand rolls. The rice is SO good, I think that's what makes it so good."
    },
    {
        id: 2,
        date: "Mar. 01, 2021",
        restaurant: "In n Out",
        cuisine: "American",
        rating: 3,
        text: "In n Out is the most overrated garbage I have ever had. It would be good if people hadn't been selling the myth that it would taste like god's pussy."
    },
    {
      id: 3,
      date: "Jun. 07, 1996",
      restaurant: "McDonald's",
      cuisine: "American",
      rating: 8,
      text: "McDonald's is exactly what it needs to be. Fast, delicious, inexpensive, ubiquitous. I usually go with the double cheeseburger, a mcchicken, and some fries. You also can't go wrong with a fountain soda – I personally recommend the sprite and the coke."
    }
  ])

// Delete Blog
const deleteBlog = (id) => {
  setBlogs(blogs.filter((blog) => blog.id !== id))
}

// Add a Blog
const addBlog = (blog) => {
  const id = Math.floor(Math.random()*1000)+1
  const newBlog = { id, ...blog }
  setBlogs([...blogs, newBlog])
}

  return (
    <div>
      <TopBar />
      <Header 
        onAdd={() => setShowAddBlog(!showAddBlog)}
        text={showAddBlog ? 'Close' : 'Add'}
      />
      {showAddBlog && <AddBlog onAdd={addBlog}/>}
      <Blogs blogs={blogs} onDelete={deleteBlog}/>
    </div>
  );
}

export default App;