import {useState} from 'react'
import {data} from '../data.js'
import './comp.css'

export function Multi(){
    let arr = [];
    for(let i=0;i<data.length;i++){
        arr.push(<Tile key={data[i].id} object={data[i]}></Tile>);
    }
    return(
        <div className="box">
            {arr}
        </div>
    )
}


function Tile({object}){
    const [expanded, setExpanded] = useState(false);
    return(
        <>
        <div className="wrapper" onClick={()=>{setExpanded(curr=>!curr)}}>
            <div className="question">
                <span>{expanded ? '-' : '+'}</span>
                <div>{object.question}</div>
            </div>
            {expanded && <div className="answer">{object.answer}</div>}
        </div>
        </>
    )

}