import { useSetRecoilState } from 'recoil';
import { maxPriceAtom, minPriceAtom } from '../store/atoms/filterAndSort';
import { useRef, useState } from 'react';

const FilterPriceRange = () => {
    const setMinPrice = useSetRecoilState(minPriceAtom);
    const setMaxPrice = useSetRecoilState(maxPriceAtom);

    const [inputMinPrice, setInputMinPrice] = useState("");
    const [inputMaxPrice, setInputMaxPrice] = useState("");
    //const timer:NodeJS.Timeout; cannot use this as on every render when input changes, the timer will reinitialise
    const timer1 = useRef(null);
    const timer2 = useRef(null);


    const handleMinChange = (e) => {
        const value = e.currentTarget.value.replace(/\D/g, ""); // Remove non-numeric characters
        setInputMinPrice(value);
        if(timer1.current)
        clearTimeout(timer1.current);
        timer1.current = setTimeout(()=>{setMinPrice(value)}, 1000)
    };
    
    const handleMaxChange = (e) => {
        const value = e.currentTarget.value.replace(/\D/g, ""); // Remove non-numeric characters
        setInputMaxPrice(value);
        if(timer2.current)
        clearTimeout(timer2.current);
        timer2.current = setTimeout(()=>setMaxPrice(value), 1000)
    };

    return (
        <div className={`border-2 py-4 px-6`}>
            <div className={`font-medium`}>Price Range</div>
            <div className='mt-[1rem] flex flex-col gap-4 items-start'>
                <label className='flex flex-col flex-nowrap w-full'>
                    Min
                    <input type="text" placeholder="0" value={inputMinPrice} onChange={handleMinChange} className="border border-black p-2 w-full rounded-md text-black"/>
                </label>
                <label className='flex flex-col flex-nowrap w-full'>
                    Max
                    <input type="text" placeholder="10000" value={inputMaxPrice} onChange={handleMaxChange} className="border border-black p-2 w-full rounded-md text-black"/>
                </label>
            </div>
        </div>
        )
}

export default FilterPriceRange