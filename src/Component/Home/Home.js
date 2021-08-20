import React, { useState, useEffect } from "react";
import Search from "../Search/Search";
import { useLocation } from "react-router-dom";
import WeatherCard from "../WeatherCard/WeatherCard";
import "./Home.css";
import { makeStyles } from "@material-ui/core/styles";
import Service from "../../Services/CityService";
import { Grid } from "@material-ui/core";
import BarGraph from "../BarGraph/BarGraph";
import BarGroupGraph from "../BarGraph/BarGroupGraph";

const service = new Service();

const useStyles = makeStyles((theme) => ({
  home: {
    display: "flex",
    justifyContent: "center",
    width: "100% !important",
    height: "872px !important",
    [theme.breakpoints.up("md")]: {
      height: "100vh !important",
    },
    // [theme.breakpoints.up("xs")]: {
    //   width: "100% !important",
    //   height: "180% !important",
    // },
  },
  grid: {
    width: "93%",
    marginLeft: "3%",
    display: "flex",
    justifyContent: "center",
    marginBottom: " 20%",
    [theme.breakpoints.up("md")]: {
      width: "120% !important",
    },
    // [theme.breakpoints.up("xs")]: {
    //   marginLeft: "51%",
    // },
  },
}));

export default function Home() {
  const classes = useStyles();
  let url = useLocation();
  let citiesInUrl = [];
  const [urlCities, setUrlCities] = useState(citiesInUrl);
  const [cities, setCities] = useState([]);
  const [dailyTemp, setDailyTemp] = useState([]);

  useEffect(() => {
    let idCity = url.search;
    let separateByComma = idCity.split("=", 2);

    if (separateByComma != "") {
      citiesInUrl = separateByComma[1].split(",");
      setUrlCities(citiesInUrl);
    }
    getWeather(citiesInUrl);
  }, []);

  const getWeather = async (cityArray = []) => {
    setUrlCities(cityArray);
    let multipleCItyDetails = [];

    await Promise.all(
      cityArray.map(async (city) => {
        const res = await service.findCity(city);
        let details = res.data.list[0];
        multipleCItyDetails.push(details);
      })
    );
    setCities([...multipleCItyDetails]);
  };

  console.log(dailyTemp)

  return (
    <div
      style={{
        background: "#85C1E9",
      }}
      className="home"
      // className={classes.home}
    >
      <Search urlCities={urlCities} getCityFromUrl={getWeather} />
      <div className="grid">
        <Grid container spacing={3} justifyContent={"center"}>
          {cities.map((city) => (<>
            <Grid item xs={12} md={3} sm={12}>
              <WeatherCard
                urlCities={urlCities}
                cityDetails={city}
                getCityFromUrl={getWeather}
                setDailyTemp={setDailyTemp}  
              />      
            </Grid>
         
     </>
          ))}
           </Grid>
           <div style={{marginTop:"100px"}}>
            {dailyTemp? 
              <BarGraph urlCities={urlCities} dailyTemp={dailyTemp}
              />

             : <></>} 
            </div> 
        
      </div>
     
      </div>
  );

}
