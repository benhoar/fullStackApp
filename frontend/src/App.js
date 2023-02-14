import HomePage from './pages/homepage/HomePage'
import BlogPage from './pages/blogpage/BlogPage'
import About from './pages/aboutpage/About'
import SummaryPage from './pages/summarypage/SummaryPage'
import LoginPage from './pages/landingpages/LoginPage'
import RegisterPage from './pages/landingpages/RegisterPage'
import EditProfile from './pages/landingpages/EditProfile'
import NotFound from './pages/errorpages/NotFound'
import { HeadAndFoot } from './layout/HeadAndFoot'
import { ProtectedRoute } from './scripts/routprotecter'

import { 
        BrowserRouter as Router,
        Routes, 
        Route,
        Navigate,
} from 'react-router-dom'

function App() {

  return (
    <div>
        <Router>
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/profile' element={<ProtectedRoute><EditProfile /></ProtectedRoute>}/>
              <Route element={<HeadAndFoot/>}>
                <Route path='/' element={<HomePage />}/>
                <Route path='/about' element={<About />}/>
                <Route path='/blogs' element={<BlogPage />}/>
                <Route path='/summary' element={<ProtectedRoute><SummaryPage /></ProtectedRoute>}/>
                <Route path='/lostdiner' element={<NotFound />}/>
                <Route path={'*'} element={<Navigate to="/lostdiner" replace />}/>
              </Route>
            </Routes>
          </Router>
        </div>
  );
}

export default App;