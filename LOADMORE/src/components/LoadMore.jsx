import { useEffect, useState } from "react";
import axios from 'axios'
import './style.css'

export function LoadMore({initialSize, limit}){
    const[productArray, setProductArray] = useState([]);
    const[loading, setLoading] = useState(false);
    const[page, setPage] = useState(2);
    let disabled = productArray.length >= limit;


    async function getData(){
        setLoading(true);
        let size = limit-productArray.length < initialSize ? limit-productArray.length : initialSize;
        let src = `https://picsum.photos/v2/list?page=${page}&limit=${size}`;
        try {
            let res = await axios.get(src);
            setProductArray(curr=>([...curr, ...res.data]));
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    useEffect(()=>{
        getData();
    },[page])

    return(
        <div className="container">
            <div className="imageContainer">
                {productArray.map((item, index)=>{
                    return <div key={index} className="productContainer"><img src={item.download_url}/></div>
                })}
            </div>
            <div className="button">
                <div className="child1">
                    <button onClick={()=>{setPage(c=>c+1)}} disabled={disabled}> {loading?"loading":"load more images"}</button>
                </div>
                {disabled && <div className="child2"> limit reached :( </div>}
            </div>
        </div>
    )
}