import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil";
import recipeDetailsAtom from "../store/atoms/recipeDetails";
import favouritesAtom from "../store/atoms/favourites";


export function Recipe(){
    const [searchParams] = useSearchParams();
    const  [recipeDetails, setRecipeDetails] = useRecoilState(recipeDetailsAtom)
    const [favourites, setFavourites] = useRecoilState(favouritesAtom);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({isError:false,message:''});
    const [inFavourites, setInFavourites] = useState(false);

    let name = searchParams.get("name");
    console.log(name);    

    async function getRecipeDetails(){
        setLoading(true);
        setError({isError:false,message:''});
        try{
            let res = await axios.get("https://dummyjson.com/recipes/search?q="+name);
            console.log(res);
            if(res.data.recipes.length===0)
            setError({isError:true,message:'recipe does not exist...'});
            else
            {
                setRecipeDetails((res.data.recipes)[0])
            }
        }
        catch(err){
            setError({isError:true,message:err});
        }
        finally{
            setLoading(false);
        }
    }

    function findInFavourites(){
        if(favourites.find(item=>(item.name===name))){
            setInFavourites(true);
            console.log(true);
        }
        console.log(false);
    }

    useEffect(()=>{
        getRecipeDetails();
        findInFavourites();
        return ()=>{setRecipeDetails('')}
    },[])

    function favoritesOnClickHandler(){
        if(inFavourites){
            let newFavourites = favourites.filter(item=>(item.name!==name))
            setFavourites(newFavourites)
        }
        else{
            setFavourites(prev=>([...prev, {name:name, image:recipeDetails.image}]))
        }
        setInFavourites(prev=>!prev);
    }

    
    if(loading){
        return(<div>loading...</div>)
    }

    if(error.isError){
        return(<div>{error.message}</div>)
    }

    return(
        <div className="w-full p-8 flex flex-row flex-wrap gap-8">
            <div>
                <div className="h-[40svh] min-w-[20%]">
                    <img className="w-full h-full object-cover" src={recipeDetails.image}/>
                </div>
                <div>
                    <div>Ingredients</div>
                    <div>{recipeDetails && (recipeDetails.ingredients).map((item,index)=>(<li key={index}>{item}</li>))}</div>
                </div>
            </div>
            <div>
                <div>Instructions</div>
                {recipeDetails && (recipeDetails.instructions).map((item,index)=>(<li key={index}>{item}</li>))}
            </div>
            <button onClick={favoritesOnClickHandler}>{inFavourites ? 'remove from favourites' : 'add to favourites'}</button>
        </div>
    )
}