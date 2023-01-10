import HomePage from './pages/homepage/HomePage'
import BlogPage from './pages/blogpage/BlogPage'
import About from './pages/aboutpage/About'
import SummaryPage from './pages/summarypage/SummaryPage'
import EditPage from './pages/editpage/EditPage'
import LoginPage from './pages/landingpages/LoginPage'
import RegisterPage from './pages/landingpages/RegisterPage'
import EditProfile from './pages/landingpages/EditProfile'
import { useAuthContext } from './hooks/useAuthContext'
import { HeadAndFoot } from './layout/HeadAndFoot'

import { 
        BrowserRouter as Router,
        Routes, 
        Route, 
} from 'react-router-dom'

function App() {
  const { user } = useAuthContext()

  return (
    <div>
        <Router>
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              {user && <Route path='/profile' element={<EditProfile />}/>}
              <Route element={<HeadAndFoot/>}>
                <Route path='/' element={<HomePage />}/>
                <Route path='/about' element={<About />}/>
                {user && <Route path='/blogs' element={<BlogPage />}/>}
                {user && <Route path='/blogs/edit/' element={<EditPage />}/>}
                {user && <Route path='/summary' element={<SummaryPage />}/>}
              </Route>
            </Routes>
          </Router>
        </div>
  );
}

export default App;