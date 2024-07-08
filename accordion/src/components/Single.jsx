import {useState} from 'react'
import {data} from '../data.js'
import './comp.css'

export function Single(){
    const [currId, setId] = useState(null);
    let arr = [];

    for(let i=0;i<data.length;i++){
        arr.push(<Tile key={data[i].id} object={data[i]} currId={currId} setId={setId}></Tile>)
    }

    return(
        <div className="box">
            {arr}
        </div>
    )
}

function Tile({object, currId, setId}){

    function onClickHandler(){
        currId===object.id ? setId(null) : setId(object.id);
    }

    return(
        <>        
            <div className="wrapper" onClick={onClickHandler}>
                <div className="question">
                    <span>{currId===object.id ? '-' : '+'}</span>
                    <div>{object.question}</div>
                </div>
                {currId===object.id && <div className="answer">{object.answer}</div>}
            </div>
        </>
    )
}