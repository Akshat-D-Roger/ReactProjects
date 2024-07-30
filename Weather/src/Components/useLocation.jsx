import { useEffect, useState } from "react";

export function useLocation(defaultLocation="Banglore"){
    const [location, setLocation] = useState(()=>{
        let location = "";
        try{
            location = JSON.parse(localStorage.getItem("location")) || defaultLocation;
        }
        catch(err){
            location = defaultLocation;
        }
        return location;
    })

    useEffect(()=>{
        localStorage.setItem("location", JSON.stringify(location))
    }, [location])
    return [location, setLocation]
}