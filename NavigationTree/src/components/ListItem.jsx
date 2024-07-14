import { ListMenu } from "./ListMenu"
import { useState } from "react";
import { AiTwotonePlusCircle, AiTwotoneMinusCircle } from "react-icons/ai";

export function ListItem({item}){
    const[viewChilds, setViewChilds] = useState(false);
    return(
        <li style={{listStyleType:"none"}}>

            <div onClick={()=>{setViewChilds(curr=>!curr)}} style={{display:"flex", alignItems:"center", position:"relative"}}>
                <div>{item.label}</div>
                {item.children && item.children.length > 0 && <div style={{position:"absolute", top:"0.1rem", left: "-1.4rem"}}>{!viewChilds ?<AiTwotonePlusCircle/> :<AiTwotoneMinusCircle/> }</div>}
            </div>

            <div>
                {viewChilds && item.children && item.children.length > 0 && <ListMenu data={item.children}></ListMenu>}
            </div>

        </li>
    )



}