import { useState,useEffect } from "react";
import { useLocation } from "./useLocation";
import axios from 'axios'
import './style.css'

export function Weather(){
    const [location,setLocation] = useLocation("Banglore");
    const [inpLocation, setInpLocation] = useState(location);
    const [error, setError] = useState({
        isError: false,
        message: ""
    })
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);

    async function locationApiCall(){
        setLoading(true);
        setError({isError:false, message: ''})
        try{
            // await (new Promise (resolve=>setTimeout(resolve, 5000)));
            let data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a3b9f7c7a480c3729afdf18d9765bfe0`);
            setWeatherData(data.data);  
        }
        catch(err){
            if(err.response && err.response.status===404){
                setError({isError: true, message: "location does not exist !"})
            }
            else{
                setError({isError: true, message: "server error :( please try again later !"})
            }
        }
        setLoading(false);
    }

    function getCurrentDate(){
        return((new Date()).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }))
    }

    function handleKeyUp(e){
        if(e.key==='Enter'){
            setLocation(inpLocation)
        }
    }

    useEffect(()=>{
        locationApiCall();
    }, [location])

    return(
        <div className="parent">
            <div className="container">
                <div className="input">
                    <input value={inpLocation} onChange={(e)=>{setInpLocation(e.target.value)}} placeholder="search city" onKeyUp={(e)=>{handleKeyUp(e)}}></input>
                </div>
                {error.isError ? (<div className="error">{error.message}</div>) : 
                    (loading ? <div className="loading"> please wait...   :) </div> : (
                        weatherData && (
                            <div className="weatherContainer">
                                <div className="line1">
                                    <div className="locationName">{weatherData.name}, {weatherData.sys.country}</div>
                                    <div className="date">{getCurrentDate()}</div>
                                </div>
                                <div className="line2">
                                    <div className="temp">{weatherData.main.temp}F</div>
                                    <div className="weather">{(weatherData.weather)[0].main}</div>
                                </div>
                                <div className="line3">
                                    <div className="wind">
                                        <div className="d1">{weatherData.wind.speed}</div>
                                        <div className="d2">wind speed</div>
                                    </div>
                                    <div className="humidity">
                                        <did className="d1">{weatherData.main.humidity}</did>
                                        <div className="d2">humidity</div>
                                    </div>
                                </div>
                            </div>
                        )
                    ))
                }
            </div>
        </div>
    )
}