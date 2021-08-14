import React,{useState,useEffect} from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CloudIcon from '@material-ui/icons/Cloud';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NearMeIcon from '@material-ui/icons/NearMe';
import WavesIcon from '@material-ui/icons/Waves';
import Waves from '@material-ui/icons/Waves';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { CircularProgress } from '@material-ui/core';
import Service from "../../Services/CityService";
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import getWeather from "../../Services/api"
const service = new Service();

const useStyles = makeStyles((theme) => ({ 
    root: {
        width: 375,
        marginLeft:5,
        marginTop:65,
       display:"flex",
       flexDirection:"row",
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 24,
        textAlign: "start",
        color : "black",
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
      },
      temp:{
        fontSize: 35,
        textAlign: "start",
        color : "black",
        marginTop: 15,
      },
      wave:{
          height: 22,
          marginBottom: 1,
          marginTop: 40,
      },
      pos: {
        fontSize: 13,
        textAlign: "start",
        color : "black",
      },
      icon:{
        height: 12,
        // paddingRight: 5,
        textAlign: "start",
        fontSize: 13,
        marginTop: 5,
      },
      humid:{
        height: 12,
        // width: 100,
        textAlign: "start",
        fontSize: 13,
        marginTop: 5,
        display: "flex",
        flexDirection:"row",
        // justifyContent: "space-between"
      },
      icon2:{
        height: 12,
        paddingLeft: 30,
        textAlign: "start",
        fontSize: 13,
        marginTop: 5,
      },
      close:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-end",
        // marginBottom: 11,
      }
  }));


export default function WeatherCard(props) {
   
    const classes = useStyles();
    const [weather,setWeather] = useState([])

    useEffect(() =>{
        getWeatherDetails();
    },[]);

    const getWeatherDetails = () =>{
        service.getCity(props.cityDetails.coord.lat,props.cityDetails.coord.lon).then((details)=>{
            setWeather(details.data)
        })
    }

    const removeCard = () => {
        console.log("Removed Card")
    }

    
    return (<div style={{display:"flex", justifyContent:"center", width:"100%",flexDirection:"row"}}>            
          <Card className={classes.root} >
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  <strong> {props.cityDetails.name},{props.cityDetails.sys.country}
                   </strong>
                    <CloseIcon style={{marginLeft:"95%"}}  className={classes.close} onClick={removeCard}/>
                </Typography>
                
                <Typography className={classes.temp} variant="h5" component="h2">
                    <Waves  className={classes.wave}/> 
                    {weather && weather.current ? weather.current.temp : ""} C
                 </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    <strong>Feels like {weather && weather.current ? weather.current.feels_like : " "}C.Haze.Gentle Breeze</strong>
                </Typography>
                <Typography variant="body2" component="p">
                    
                </Typography>
                <div className={classes.icon}>
                    <NearMeIcon className={classes.icon}/>5.1m/s W  <CheckCircleOutlineIcon className={classes.icon2}/>108hPa
                </div>
                <div className={classes.humid}>
                    <div>Humidity: {weather && weather.current ? weather.current.humidity : " "}% </div>
                    <div style={{marginLeft:"30px"}}> UV:9</div>        
                </div>
                <div className={classes.humid}>
                    <div> Dew point : {weather && weather.current ? weather.current.dew_point : ""}C </div>
                    <div style={{marginLeft:"23px"}}> Visibility: {weather && weather.current ? weather.current.visibility : ""}km</div>
                </div>
              </CardContent>
            </Card>
     </div>
    
    )
}
