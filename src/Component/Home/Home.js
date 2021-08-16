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

    }, [url]);
     
    useEffect(() => {
        getCityFromUrl();
    }, []);
     
    const getCityFromUrl = (name) =>{
       

        if(name?.id){
            setCityId(name.id)
            console.log("citydetails", name,id)
            setCities(name)
            // getWeather(id)
        }       

        let stringifiedArray  = ""
        if (url?.search) {
            const query = url.search;
            console.log("iff ===>>>>>",urlCities)
           
            getWeather(urlCities);

            // if(name){
            //     stringifiedArray = query.substring(10);
            //     console.log("url ",stringifiedArray)
            // }else
            //     stringifiedArray = query.substring(8);

            // console.log("url ",stringifiedArray)
            // const originalArray = JSON.parse(stringifiedArray);
            // console.log("url ",originalArray)
          
            // console.log("Original array is", originalArray);
           
            // setUrlCities(originalArray) 

            // let cities =[]
          
            // originalArray.map((city)=>{       
            //     cities.push(city)
            //     console.log("url",cities,city)                             
            //     getWeather(city,id);    
      
            // })    
            // console.log("citydetails", cityName)      
      
          }       
}
let details = cities
    const getWeather = (url) => {
    
        console.log("City in get weather",urlCities)
        let multipleCItyDetails = [];
        urlCities.map((city) => {        
        service.findCity(city).then((res) => {
            
            details = res.data.list[0]
            console.log("city heree",cities)
            multipleCItyDetails.push(details)
            setCities(details)
            
        }).catch((error) => {
            console.log(error);
        })    
        console.log("-----------------",cities)
    })
}

    return (
        <div style={{background:"#85C1E9",height:"720px"}}>           
            <Search urlCities={urlCities} getCityFromUrl={getCityFromUrl}/>
                {cities != "" ?<>                   
                    <WeatherCard urlCities={urlCities} cityDetails={cities} />
                  </>
                   : <></>
                }           
        </div>
    )
}
