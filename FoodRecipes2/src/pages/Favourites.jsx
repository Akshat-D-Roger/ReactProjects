import { useRecoilValue } from "recoil"
import favouritesAtom from "../store/atoms/favourites"
import { RecipeItem } from "../components/RecipeItem";

export function Favourites(){
    const favourites = useRecoilValue(favouritesAtom);

    if(favourites.length === 0){
        return(<div>no favourites yet :(</div>)
    }

    return(
        <div className="w-full py-[2rem] px-[3%] bg-pink-100 flex flex-row flex-wrap justify-between gap-y-8">
            {favourites.map((item,index)=>(<RecipeItem key={index} name={item.name} img={item.image}/>))}
        </div>
    )
}