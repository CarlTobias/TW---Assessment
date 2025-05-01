import { Routes, Route } from 'react-router-dom'

import LandingPage from './pages/LandingPage/LandingPage'
import AuthPage from './pages/AuthPage/AuthPage'
import HomePage from './pages/HomePage/HomePage'

function App() {

  return (
    <>
    <Routes>
      <Route path='/wooflesLanding' element={<LandingPage />} />
      <Route path='/wooflesAuth' element={<AuthPage />} />
      <Route path='/wooflesHome' element={<HomePage />} />
    </Routes>
    </>
  )
}

export default App
