
import Service from "./CityService";

const service = new Service();


let value = [];
export default function  getWeather(val,id){
        service.findCity(val).then((res) => {
            console.log("Response outside  ------",val,id)
            res.data.list.filter(city => city.id === id).map((details)=>{
                value = details
                console.log("Response value",value)
            })
            // value.push(res.data.list)
            // console.log("Response value",value)                     
        }).catch((error) => {
            console.log(error);
        })  
        return value  
}

