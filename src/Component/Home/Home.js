import React,{useState,useEffect} from 'react'
import Search from '../Search/Search';
import {useLocation} from "react-router-dom";
import WeatherCard from '../WeatherCard/WeatherCard';
// const classes = useStyles;


export default function Home() {  
    let url = useLocation();
    const [urlCities,setUrlCities] = useState([]);
    
    const [cityName,setCityName] = useState([]);

    useEffect(() => {
        getCityFromUrl();
    }, [url]);

    const getCityFromUrl = (name,cityName) =>{

        let idCity = url.search;
        let d = idCity.split("=",2)
        
        let arr = [];
        console.log("url id", d[1]) // [Mumbai,surat]

       if(d != ""){
        let c = d[1].split(",",2)
        console.log("cities",c)
        let cities =[]
      
        c.map((city)=>{         
            cities.push(city)
            console.log("url",cities)
        })
        if(name != ""){
            setUrlCities(name)
            setCityName(cityName)
        }
        setUrlCities(cities)
        
        setCityName(cityName)
    }
       
}
  
    return (
        <div style={{background:"#85C1E9",height:"720px"}}>           
            <Search urlCity={urlCities} getCityFromUrl={getCityFromUrl}/>
            {urlCities != "" ? <WeatherCard city={urlCities} cityName={cityName}/>:null}
        </div>
    )
}
