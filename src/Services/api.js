
import Service from "./CityService";

const service = new Service();


let value = [];
export default function  getWeather(val){
        service.findCity(val).then((res) => {
            value = res.data.list
            console.log("Response value",value)                     
        }).catch((error) => {
            console.log(error);
        })  
        return value  
}

