import { useRecoilValue } from "recoil"
import dataAtom from "../store/atoms/data"
import { RecipeItem } from "../components/RecipeItem";

export function Home(){
    const data = useRecoilValue(dataAtom);

    if(!data){
        return(
            <div>loading...</div>
        )
    }

    let arr = [];
    while(arr.length < 3){
        let r = Math.floor(Math.random() * 49) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }

    return(
        <div className="w-full py-[2rem] px-[3%] bg-pink-100 flex flex-row grow flex-wrap justify-between gap-y-8 items-center">
            {arr.map(item => (<RecipeItem key={item} name={data[item].name} img={data[item].image}/>))}
        </div>
    )
}