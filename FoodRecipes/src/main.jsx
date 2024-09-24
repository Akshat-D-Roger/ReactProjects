import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter, createBrowserRouter, RouterProvider} from 'react-router-dom'
import FoodRecipe from './components/FoodRecipe.jsx'
import App from './App.jsx'


// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <FoodRecipe/>,
//     children: [
//       {
//         index:true,
//         element:<Default/> 
//       }, {
//         path:'/favourites',
//         element:<Favourite/>
//       }, {
//         path:'/recipie/:id',
//         element:<Details/>
//       }
//     ]
//   }
// ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
)
