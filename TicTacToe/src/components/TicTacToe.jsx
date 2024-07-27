import { useState,useEffect } from "react";
import './style.css'

export function TicTacToe(){
    const [curr, setCurrent] = useState(0);
    const [arr, setArr] = useState([...Array(9)].fill(null))
    const [res, setRes] = useState({
        declared: false,
        message: null
    });

    function onClickHandler(index){
        if(arr[index]!==null || res.declared===true)
        return;
        let newArr = [...arr];
        newArr[index] = curr;
        setArr(newArr);
        setCurrent(curr=>(curr===0?1:0));
    }

    useEffect(()=>{
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (arr[a] !== null && arr[a] === arr[b] && arr[a] === arr[c]) {
                setRes({declared: true, message:`${arr[a]===0?'o':'x'} won` })
                return;
            }
        }

        if (arr.every(cell => cell !== null)) {
            setRes({declared: true, message:`draw` })
        }
    },[arr]);

    return(
        <div className="parent">
            <div className="tictactoe">
                {arr.map((item,index)=>{
                    return(<div className="cells" key={index} onClick = {()=>{onClickHandler(index)}}>
                        {arr[index]!==null && (arr[index]===0 ? 'o' : 'x')}
                    </div>)
                })}
            </div>
            <div className="result">
                {res.declared && res.message}
            </div>
        </div>
    )
}