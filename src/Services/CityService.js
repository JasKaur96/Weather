import AxiosService from "./AxiosService";

const dotenv = require("dotenv");
dotenv.config();

const axios = new AxiosService();
let cnt = 7;

const baseurl = "https://api.openweathermap.org/data/2.5";

export default class CityService {
      
    getCityDetails = (id) => {
        // console.log("City Service",process.env.WEATHER_KEY);
        return axios.getMethod(`${baseurl}forecast/daily?id=${id}&appid=ff0bd6cea731b843b65052e626b782d2`);
    }
  
    findCity = (city) => {
        // console.log("City Service",process.env.WEATHER_KEY);
        return axios.getMethod(`https://api.openweathermap.org/data/2.5/find?q=${city}&appid=ff0bd6cea731b843b65052e626b782d2&units=metric`);
    }

    getCity = (lat,lon) =>{
        return axios.getMethod(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=ff0bd6cea731b843b65052e626b782d2`
    )
    }
}
