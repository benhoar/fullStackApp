import HomePage from './pages/homepage/HomePage'
import BlogPage from './pages/blogpage/BlogPage'
import About from './pages/aboutpage/About'
import Profile from './pages/profile/Profile'
import EditPage from './pages/editPage/EditPage'
import TopBar from './components/navbar/TopBar'
import Footer from './components/footer/Footer'

import { 
        BrowserRouter as Router,
        Routes, 
        Route, 
} from 'react-router-dom'

// App.js is where we have access to the state

function App() {
  return (
    <div>
      <TopBar />
      <div className="mainWrapper">
        <Router>
          <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/blogs' element={<BlogPage />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/blogs/edit/:id' element={<EditPage />}/>
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;