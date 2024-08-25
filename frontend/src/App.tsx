import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Posts from './pages/Posts'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Post from './pages/Post'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/'  element={<ProtectedRoute> <Posts /> </ProtectedRoute>} />
        <Route path='/post/:id'  element={<ProtectedRoute> <Post /> </ProtectedRoute>} />
        <Route path='/create-post'  element={<ProtectedRoute> <CreatePost /> </ProtectedRoute>} />
        <Route path='/update-post'  element={<ProtectedRoute> <UpdatePost /> </ProtectedRoute>} />
        <Route path='/signup'  element={<Signup />} />
        <Route path='/signin'  element={<Signin />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
