import React,{useState,useEffect} from 'react'
import Search from '../Search/Search';
import {useLocation} from "react-router-dom";
import WeatherCard from '../WeatherCard/WeatherCard';
// const classes = useStyles;

import Service from "../../Services/CityService";

const service = new Service();

export default function Home() {  
    let url = useLocation();
    let citiesInUrl = [];
    const [urlCities,setUrlCities] = useState(citiesInUrl);    
    const [cities,setCities] = useState([]);
    const [id,setCityId] = useState("");

    useEffect(() => {
        
        let idCity = url.search;
        let d = idCity.split("=",2)

        console.log("url id", d[1])

        if(d != ""){
            citiesInUrl = d[1].split(",")
            // console.log("cities",citiesInUrl)            
            console.log("cities in if",citiesInUrl)
            setUrlCities(citiesInUrl)           
        }      
        getCityFromUrl();
         
        // getWeather(urlCities);

    }, []);
     
    useEffect(() => {
        getCityFromUrl();
    }, []);
     
    const getCityFromUrl = (name) =>{       

        // if(name?.id){
        //     setCityId(name.id)
        //     console.log("citydetails", name,id)
        //     setCities(name)
        //     getWeather(id)
        // }    

        getWeather(name);


    }

// let details = cities
    const getWeather = (cityArray=[]) => {
    
        console.log("City in get weather",cityArray)
        setUrlCities(cityArray) 
        let multipleCItyDetails = [];
        cityArray.map((city) => {        
            service.findCity(city).then((res) => {
                
                let details = res.data.list[0]
                console.log("city heree",cities)
                multipleCItyDetails.push(details)
            
            }).catch((error) => {
                console.log(error);
            })    
            setCities(multipleCItyDetails)
        console.log("-----------------",cities)
    })
   
    console.log("multipleCItyDetails",)
           
}

    return (
        <div style={{background:"#85C1E9",height:"720px"}}>           
            <Search urlCities={urlCities} getCityFromUrl={getCityFromUrl}/>
                {cities.map( (city) => 
                 
                    <WeatherCard urlCities={urlCities} cityDetails={city} />
              
                    )
                }           
        </div>
    )
}
