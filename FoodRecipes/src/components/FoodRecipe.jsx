import { useState, useEffect } from "react";
import axios from 'axios'
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export default function FoodRecipe(){
    const [recipesList, setRecipesList] = useState([]);
    const [error, setError] = useState({isError:false, message:''});
    const [loading, setLoading] = useState(false);

    async function getRecipes(){
        setLoading(true);
        try{
            let data = await axios.get('https://dummyjson.com/recipes?select=image,name,cuisine');
            setRecipesList(data.data.recipes);
        }catch(err){
            setError({isError:true, message: "Server Error"});
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        getRecipes();
    }, [])

    function onKeyHandler(){

    }

    return(
        <div className="w-full h-full min-h-screen">
            <Navbar onKeyHandler={onKeyHandler}/>
            {/* <Outlet/> */}
        </div>
    )

}