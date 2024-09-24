import { useNavigate } from "react-router-dom"

export function RecipeItem({name, img}){
    const navigate = useNavigate();

    function onClickHandler(){
        navigate("/recipe?name="+encodeURIComponent(name))
    }

    return(
        <div className="w-[30%] h-[40vh] border-black border-2" onClick={onClickHandler}>
            <img className="object-cover w-full h-[90%] p-2" src={img} loading="lazy"/>
            <div className="text-center">{name}</div>
        </div>
    )
}