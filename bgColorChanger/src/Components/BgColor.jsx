import {useState, useMemo, useEffect} from 'react'
import './style.css'

export default function BgColor(){
    const [colorScheme, setColorScheme] = useState('rgb');
    const [colorString, setColorString] = useState({r:0, g:0, b:0});

    useEffect(()=>{
        generateNewColor();
    }, [])
    
    let color = useMemo(()=>(
        (colorScheme!='hex') ? 
        (`rgb(${colorString.r}, ${colorString.g}, ${colorString.b})`) : 
        (`#${colorString.r.toString(16).padStart(2,'0')}${colorString.g.toString(16).padStart(2,'0')}${colorString.b.toString(16).padStart(2,'0')}`)
    ), [colorString, colorScheme])

    function generateNewColor(){
        let nr = Math.floor(Math.random()*256);
        let ng = Math.floor(Math.random()*256);
        let nb = Math.floor(Math.random()*256);
        setColorString({r:nr, g:ng, b:nb});
    }

    return(
        <div className="main" style={{backgroundColor:color}}>
            <div className='buttonWrapper'>
                <div className='button' onClick={()=>(setColorScheme(prev=>'rgb'))}><p>RGB</p></div>
                <div className='button' onClick={()=>(setColorScheme(prev=>'hex'))}><p>HEX</p></div>
                <div className='button' onClick={generateNewColor}><p>NEW COLOR</p></div>
            </div>
            <div className='textWrapper'>
                {color}
            </div>
        </div>
    )
}