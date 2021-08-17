import AxiosService from "./AxiosService";

const dotenv = require("dotenv");
dotenv.config();

const axios = new AxiosService();
let cnt = 7;

const baseurl = "https://api.openweathermap.org/data/2.5";
const weatherKey = process.env.REACT_APP_WEATHER_KEY;

export default class CityService {
  getCityDetails = (id) => {
    return axios.getMethod(
      `${baseurl}forecast/daily?id=${id}&appid=${weatherKey}`
    );
  };

  findCity = (city) => {
    return axios.getMethod(
      `https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${weatherKey}&units=metric`
    );
  };

  getCity = (lat, lon) => {
    return axios.getMethod(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${weatherKey}`
    );
  };
}
