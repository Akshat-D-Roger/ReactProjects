import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Cart from './pages/Cart'
import Collections from './pages/Collections'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Product from './pages/Product'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='h-full px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about-us' element={<AboutUs/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/collections' element={<Collections/>}/>
        <Route path='/contact-us' element={<Contact/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/place-order' element={<PlaceOrder/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App