import HomePage from './pages/homepage/HomePage'
import BlogPage from './pages/blogpage/BlogPage'
import About from './pages/aboutpage/About'
import Profile from './pages/profilepage/Profile'
import SummaryPage from './pages/summarypage/SummaryPage'
import EditPage from './pages/editpage/EditPage'
import LoginPage from './pages/landingpages/LoginPage'
import RegisterPage from './pages/landingpages/RegisterPage'
import TopBar from './components/navbar/TopBar'
import Footer from './components/footer/Footer'
import { useAuthContext } from './hooks/useAuthContext'
import { useEffect, useState } from 'react'

import { 
        BrowserRouter as Router,
        Routes, 
        Route, 
} from 'react-router-dom'

function App() {
  const [isLanding, setIsLanding] = useState(true)
  const { user } = useAuthContext()

  useEffect(() => {
    const path = window.location.href
    const chunks = path.split('/')
    const n = chunks.length-1
    const landing = chunks[n] === 'register' || chunks[n] === 'login'
    setIsLanding(!landing)
  }, [user])

  return (
    <div>
      {isLanding && <TopBar />}
      <div className="mainWrapper">
        <Router>
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/home' element={<HomePage />}/>
              <Route path='/about' element={<About />}/>
              {user && <Route path='/blogs' element={<BlogPage />}/>}
              {user && <Route path='/profile' element={<Profile />}/>}
              {user && <Route path='/blogs/edit/' element={<EditPage />}/>}
              {user && <Route path='/summary' element={<SummaryPage />}/>}
            </Routes>
          </Router>
      </div>
      {isLanding && <Footer />}
    </div>
  );
}

export default App;