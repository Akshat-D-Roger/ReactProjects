import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { PiDotDuotone } from "react-icons/pi";
import axios from 'axios'
import './style.css'

export function ImgSlider(){
    const[image, setImage] = useState({data:[],currId:0});

    //fetch the data for the first time
    useEffect(()=>{
        async function getData(){
            try{
                let res = await axios.get("https://picsum.photos/v2/list?page=1&limit=5");
                setImage({data:res.data, currId:0});
            }
            catch(e){
                console.error(e);
            }
        }
        
        setTimeout(() => {
            getData();
        }, 5000);
    }, []);

    useEffect(() => {
        console.log("in this fun")
        if (image.data.length > 0) {
            const interval = setInterval(() => {
                setImage(prevImage => ({
                    ...prevImage,
                    currId: (prevImage.currId + 1) % prevImage.data.length
                }));
            }, 5000);

            //Clean up the interval on component unmount
            return () => {
                console.log("cleaning");
                clearInterval(interval)
            };
        }
    }, [image.data.length]);

    function onClickHandler(e){
        let id = e.target.id;
        let newIdObj;
        if(id=='prev'){
            newIdObj = {...image, currId:(image.currId===0 ? image.data.length-1: image.currId-1)};
        }
        else{
            newIdObj = {...image, currId:image.currId===image.data.length-1 ? 0: image.currId+1};
        }
        setImage(newIdObj);
    }

    return(
        <div className="container">
            <div className="Button" id='prev' onClick={(e)=>{onClickHandler(e)}}>
                <IoIosArrowBack className="arrowIcon"/>
            </div>
            <div className="image">
                {image.data.length > 0 ? (image.data).map((_,index)=>{
                    return <img key={index} src={((image.data)[index]).download_url} alt={((image.data)[index]).author} className={index!=image.currId ? "hidden" : "visible"} />
                })
                : "Kindly wait, caraousel is loading" }
            </div>
            <div className="Button" id="next" onClick={(e)=>{onClickHandler(e)}}>
                <IoIosArrowForward className="arrowIcon"/>
            </div>
            <div className="circles">
                {image.data.length > 0 && image.data.map((_,index)=>{
                    return <PiDotDuotone className={index!=image.currId ? "dot" : "dot selected"} key={index} onClick={()=>{setImage(p=>({...p,currId:index}))}}/>
                })}
            </div>
        </div>
    )
}