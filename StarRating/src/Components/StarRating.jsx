import { useState } from "react";
import { IoStarOutline } from "react-icons/io5";
import './style.css'

export default function StarRating(){
    const [hoverNumber, setHoverNumber] = useState(null);
    const [rating, setRating] = useState(0);

    function onMouseEnterHandler(e){
        setHoverNumber(e.target.id);
    }
    function onMouseLeaveHandler(){
        setHoverNumber(null);
    }
    function onMouseClickHandler(e){
        setRating(e.target.id)
    }


    return(
        <div className="main">
            {[...Array(10)].map((_,index)=>(
                <IoStarOutline
                key={index}
                id={index+1} 
                className={(index < ( hoverNumber ? hoverNumber : rating ) ) ? 'star active':'star'} 
                onMouseEnter={onMouseEnterHandler} 
                onClick={onMouseClickHandler}
                onMouseLeave={onMouseLeaveHandler} 
                />
            ))}
        </div>
    )
}
