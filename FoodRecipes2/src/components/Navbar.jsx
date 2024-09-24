import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import inputAtom from "../store/atoms/input";

export function Navbar(){
    const [input, setInput] = useRecoilState(inputAtom)
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        navigate("/list")
    }

    return(
        <div className="w-full px-3 py-2 flex flex-row flex-nowrap justify-between items-center border-b-2 gap-2">
            <div>
                <Link className="font-['nothing'] text-xl sm:text-3xl whitespace-nowrap" to="/">FOOD RECIPES</Link>
            </div>
            <div className="basis-[25%] border-2 border-black shrink-0">
                <form onSubmit={handleSubmit}>
                    <input required onInvalid={(e)=>{e.target.setCustomValidity('bro? enter smthng, smh')}} type="text" name="search" className="h-full w-full text-l sm:text-xl py-0.5 px-2" placeholder="search recipes...." value={input} onChange={(e)=>{e.target.setCustomValidity('');setInput(e.target.value)}}/>
                </form>
            </div>
            <div className="flex flex-row flex-nowrap gap-1">
                <div>
                    <Link className=" text:md sm:text-l border-2 border-black px-1.5 py-1 bg-gray-300 whitespace-nowrap" to="/list" onClick={()=>(setInput(''))}>all recipes</Link>
                </div>
                <div>
                    <Link className=" text:md sm:text-l border-2 border-black px-1.5 py-1 bg-gray-300 " to="/favourites">favourites</Link>
                </div>
            </div>
        </div>
    )
}