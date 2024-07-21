import { useEffect, useState } from "react"
import axios from 'axios';

export const usePicApi = ()=>{
    const [images, setImages] = useState([]);

    async function getMoreImages()
    {
        try{
            let res = await axios.get(`https://picsum.photos/v2/list?page=2&limit=100`);
            setImages(prev=>([...prev,...res.data ]));
            return null;
        }
        catch(e){
            return e;
        }
    }

    useEffect(()=>{
        let res = getMoreImages();  
        if(res){
            console.error("Issue in sourcing images")
        }      
    },[])

    return [images]
}