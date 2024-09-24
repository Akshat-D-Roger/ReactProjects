import {useRecoilValue} from "recoil"
import dataAtom from "../store/atoms/data";
import { useMemo } from "react";
import inputAtom from "../store/atoms/input";
import { RecipeItem } from "../components/RecipeItem";

export function RecipeList(){
    const searchValue = useRecoilValue(inputAtom);
    const allRecipes = useRecoilValue(dataAtom);

    const list = useMemo(()=>{
        if(!allRecipes)
        return;
        else
        return allRecipes.filter(item=>{
            return ((item.name).toLowerCase()).includes(searchValue.toLowerCase());
        })
    }, [searchValue, allRecipes])

    if(!allRecipes){
        return(
            <div>
                Loading...
            </div>
        )
    }

    return(
        <div className="w-full py-[2rem] px-[3%] bg-pink-100 flex flex-row grow flex-wrap justify-between gap-y-8">
            {list.map(item => (<RecipeItem key={item.id} name={item.name} img={item.image}/>))}
        </div>
    )
}

