import {useState, useRef} from 'react'
import './style.css'

export function ScrollToSection({numberOfSections=4}){
    const [input, setInput] = useState('');
    const [inputError, setInputError] = useState('');
    let refsArray = [];

    for(let i=0;i<numberOfSections;i++){
        refsArray[i] = useRef(null);
    }

    function onClickHandler(){
        const inputNumber = parseInt(input);
        if(!isNaN(inputNumber) && !(inputNumber>numberOfSections) && !(inputNumber<1)){
            (refsArray[inputNumber-1]).current.scrollIntoView({behavior: 'smooth'})
        }
    }

    function onChangeHandler(e){
        const value = e.target.value
        const inputNumber = parseInt(value);
        console.log(e.target.value)
        if((isNaN(inputNumber)||inputNumber<1 || inputNumber>numberOfSections) && value!==''){
            setInputError(`Input should be between 1 and ${numberOfSections}`);
        }
        else{
            setInputError('');
        }
        setInput(e.target.value)
    }


    return(
        <div>
            <div className='header'>
                <div>
                    <input type="Number" value={input} onChange={(e)=>{onChangeHandler(e)}} placeholder="try jump here !" pattern="\d*"></input>
                    {inputError && <div>{inputError}</div>}
                </div>
                <div>
                    <button onClick = {onClickHandler}>Jump</button>
                </div>
            </div>
            {[...Array(numberOfSections).keys()].map((_,index)=>{
                return <div key={index} ref={refsArray[index]} className='section'>section {index+1}</div>
            })}
        </div>
    )
}