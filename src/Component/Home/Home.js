import React,{useState,useEffect} from 'react'
import Search from '../Search/Search';
import {useLocation} from "react-router-dom";
import WeatherCard from '../WeatherCard/WeatherCard';
// const classes = useStyles;

import Service from "../../Services/CityService";

const service = new Service();

export default function Home() {  
    let url = useLocation();
    const [urlCities,setUrlCities] = useState([]);    
    const [cityName,setCityName] = useState([]);
    const [id,setCityId] = useState("");

    useEffect(() => {
        getCityFromUrl();
    }, [url]);
     
    const getCityFromUrl = (name) =>{
       
        if(name?.id){
            setCityId(name.id)
            console.log("citydetails", name,id)
        }       

        if (url?.search) {
            const query = url.search;
            const stringifiedArray = query.substring(8);
            const originalArray = JSON.parse(stringifiedArray);
            console.log("Original array is", originalArray);
           
            setUrlCities(originalArray) 
            let cities =[]
          
            originalArray.map((city)=>{       
                cities.push(city)
                console.log("url",cities,city)                             
                getWeather(city,id);    
      
            })    
            console.log("citydetails", cityName)      
      
          }       
}
    const getWeather = (val,id) => {
        
    service.findCity(val).then((res) => {
        console.log("Response outside  ------",val,id)
        res.data.list.filter(city => city.id === id).map((details)=>{
            let value = details
            setCityName(value)  
        })        
    }).catch((error) => {
        console.log(error);
    })  
   
}

    return (
        <div style={{background:"#85C1E9",height:"720px"}}>           
            <Search urlCity={urlCities} getCityFromUrl={getCityFromUrl}/>
                {cityName != "" ?
                    <WeatherCard cityDetails={cityName} />
                    : <></>
                }           
        </div>
    )
}
