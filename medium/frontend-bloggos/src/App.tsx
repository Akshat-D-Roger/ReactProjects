import { Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Login from './pages/Login'
import Blogs from './pages/Blogs'
import { useLogin } from './store/hooks/useLogin'
import Create from './pages/Create'

const App = () => {
  useLogin();
  return (
    <div className='h-full flex flex-col w-full'>
      <Navbar></Navbar>
      <div className='grow'>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/blogs' element={<Blogs/>}></Route>
        <Route path='/blog/:id' element={<Blog/>}></Route>
        <Route path='/create' element={<Create/>}></Route>
      </Routes>
      </div>
    </div>
  )
}

export default App