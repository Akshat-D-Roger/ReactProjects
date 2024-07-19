import { useEffect, useState } from "react";
export function useLocalStorage(key, defaultValue){
    const[value, setValue] = useState(()=>{
        let currValue;
        try{
            currValue = JSON.parse(localStorage.getItem(key)) || defaultValue;
        }
        catch(e){
            console.error(e);
            currValue = String(defaultValue);
        }

        return currValue;
    })

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value));
    }, [value])

    function onClick(){
        let newValue = value === 'light' ? 'dark' : 'light'
        setValue(newValue);
    }

    return [value,onClick];
}