import { useState } from "react"
import axios from 'axios'

export function QRCode()
{
    const [input1, setInput1] = useState("");
    const [qr, setqr] = useState(null);

    async function onclickHandler(){
        //code to check input and give warning
        let res = await axios.get(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input1}`, {responseType:'blob'});
        setqr(URL.createObjectURL(res.data));
    }

    return(
        <div>
            <div>
                <div>
                    <input value={input1} onChange={(e)=>(setInput1(e.target.value))}></input>
                </div>
                <div>
                    <button onClick={onclickHandler}>beware pressing this generates a qr code</button>
                </div>
                <div>
                    <div style={{display:"none"}}>enter the input</div>
                </div>
            </div>
            <div>
                {qr && <img src={qr}/>}
            </div>
        </div>
    )
}