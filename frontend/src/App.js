import HomePage from './pages/homepage/HomePage'
import BlogPage from './pages/blogpage/BlogPage'
import About from './pages/aboutpage/About'
import Profile from './pages/profile/Profile'
import EditPage from './pages/editPage/EditPage'

import { 
        BrowserRouter as Router,
        Routes, 
        Route, 
} from 'react-router-dom'

// App.js is where we have access to the state

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/blogs' element={<BlogPage />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/blogs/edit/:id' element={<EditPage />}/>
      </Routes>
    </Router>
  );
}

export default App;