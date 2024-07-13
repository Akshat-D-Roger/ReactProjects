import { useState } from "react";
import { LoadMore } from "./components/LoadMore";

export function App(){

    const [input, setInput] = useState(40);
    return(
        <div>
            <input value={input} onChange={(e)=>{setInput(e.target.value)}}></input>
            <LoadMore initialSize={input} limit={100}/>
        </div>
    )
}