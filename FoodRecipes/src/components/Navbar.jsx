import { useState } from "react"
import { Link } from "react-router-dom";

export function Navbar({onKeyHandler}){
    const [input, setInput] = useState("");
    return(
        <div className="flex flex-nowrap justify-between items-center w-full px-2 md:px-10 py-2 border-b-2 gap-4">
            <div className="font-['nothing'] whitespace-nowrap text-[1.25em] sm:text-[2em] lg:text-[2.5em]">FOOD RECIPIES</div>
            <div className="basis-[30%]">
                <input type="search" value={input} onChange={(e)=>{setInput(e.target.value)}} onKeyUp={(e)=>{onKeyHandler(e)}} placeholder="search tasty recipes ..." className="w-full pl-4 border-2 text-[1.25em] max-[400px]:text-[1em] sm:text-[1.5rem] rounded-md"></input>
            </div>
            <div className="flex flex-nowrap gap-5 shrink-0">
                <Link className="text-[1em] lg:text-[1.25em] bg-gray-200 px-3 py-1 lg:py-2 rounded-md" to="/">Home</Link>
                <Link className="text-[1em] lg:text-[1.25em] bg-gray-200 px-3 py-1 lg:py-2 rounded-md" to="/favourites">Favourites</Link>
            </div>
        </div>
    )
}
