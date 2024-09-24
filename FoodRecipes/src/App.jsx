import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Details } from "./pages/details";
import { Recipes } from "./pages/recipes";
import { Navbar } from "./components/Navbar";
import { Favourites } from "./pages/favourites";

export default function App(){
  return(
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/recipe-item/:id" element={<Details/>}></Route>
        <Route path="/recipes" element={<Recipes/>}></Route>
        <Route path="/favourites" element={<Favourites/>}></Route>
      </Routes>
    </div>
  )
}