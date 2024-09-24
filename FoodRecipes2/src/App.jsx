import { Routes, Route } from "react-router-dom";
import {Navbar} from './components/Navbar'
import {Home} from './pages/Home'
import {RecipeList} from './pages/RecipeList'
import {Favourites} from './pages/Favourites'
import {Recipe} from './pages/Recipe'
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import dataAtom from "./store/atoms/data";
import axios from "axios";

export default function App(){
    const setData = useSetRecoilState(dataAtom);

    const fetchData = 
        async ()=>{
            let req = await axios.get('https://dummyjson.com/recipes?limit=0');
            setData(req.data.recipes);
        }

    useEffect(()=>{fetchData()}, []);

    return(
        <div className="flex flex-col flex-nowrap w-full h-full">
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/list" element={<RecipeList/>}/>
                <Route path="/favourites" element={<Favourites/>}/>
                <Route path="/recipe" element={<Recipe id={1}/>}/>
            </Routes>
        </div>
    )
}