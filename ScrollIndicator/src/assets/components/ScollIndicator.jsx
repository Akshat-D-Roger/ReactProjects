import { usePicApi } from "./usePicApi"
import './style.css'
import { useRef, useState } from "react";

export const ScrollIndicator = ()=>{
    
    const[images] = usePicApi();
    const containerRef = useRef(null);
    const [scrollPercentage, setScrollPercentage] = useState(0);

    function calculateScrollPercentage(){
        if(containerRef && containerRef.current){
            let {scrollTop, scrollHeight,clientHeight} = containerRef.current;
            if(scrollHeight===0)
            setScrollPercentage(100);
            else
            setScrollPercentage((scrollTop*100)/(scrollHeight-clientHeight))
        }
    }

    return(
        <div className="parent">
            <div className="scroll">
                <div style={{width:`${scrollPercentage}%`,height:"100%", backgroundColor:"green"}}></div>
            </div>
            <div className="container" ref={containerRef} onScroll={()=>{calculateScrollPercentage()}}>
                <div className="imageContainer">
                    {images.map(item=>{
                        return(<div key={item.id} className="productContainer">
                            <img src={item.download_url} style={{objectFit:"cover", width:"100%", height:"100%"}}/>
                        </div>)
                    })}
                </div>
            </div>
        </div>
    )

}