import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import NearMeIcon from "@material-ui/icons/NearMe";
import Waves from "@material-ui/icons/Waves";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Service from "../../Services/CityService";
import { withRouter } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
const service = new Service();

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    marginLeft: 5,
    marginTop: 65,
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.up("xs")]: {
      width: 335,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      marginTop: 65,
      marginLeft: "0%",
    },
    [theme.breakpoints.up("md")]: {
      width: "100%",
      marginLeft: "2%",
      marginTop: "25.4%",
    },
  },
  title: {
    fontSize: 24,
    textAlign: "start",
    color: "black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    "@media (max-width: 360px)": {
      fontSize: 35,
    },
  },
  temp: {
    fontSize: 35,
    textAlign: "start",
    color: "black",
    marginTop: 15,
    "@media (max-width: 360px)": {
      fontSize: 40,
      marginTop: 10,
    },
  },
  wave: {
    height: 22,
    marginBottom: 1,
    marginTop: 40,
  },
  pos: {
    fontSize: 13,
    textAlign: "start",
    color: "black",
    "@media (max-width: 360px)": {
      fontSize: 20,
    },
  },
  icon: {
    height: 12,
    textAlign: "start",
    fontSize: 13,
    marginTop: 5,
    "@media (max-width: 360px)": {
      fontSize: 20,
    },
  },
  humid: {
    height: 12,
    // width: 100,
    textAlign: "start",
    fontSize: 13,
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    "@media (max-width: 360px)": {
      fontSize: 20,
      marginTop: 15,
    },
  },
  icon2: {
    position: "absolute",
    height: 12,
    paddingLeft: 30,
    textAlign: "start",
    fontSize: 13,
    marginTop: -8,
    marginLeft: "-1%",
  
    [theme.breakpoints.up("xs")]: {
      marginLeft: "-4%",
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: "-1%",
    },
  },
  close: {
    position: "absolute",
    marginLeft: "18%",
    [theme.breakpoints.up("xs")]: {
      marginLeft: "73%",
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: "18%",
    },
  },
  uv: {
    fontSize: "10px",
    marginLeft: "115px",
    marginTop: "-12px",

    "@media (max-width: 360px)": {
      marginLeft: "155%",
      marginTop: 5,
    },
  },
}));

function WeatherCard(props) {
  console.log("props WeatherCard", props);

  const classes = useStyles();
  const [weather, setWeather] = useState([]);
  const [cities, setCities] = useState(props.urlCities);
  useEffect(() => {
    getWeatherDetails();
  }, [cities]);

  const getWeatherDetails = () => {
    service
      .getCity(props.cityDetails.coord.lat, props.cityDetails.coord.lon)
      .then((details) => {
        setWeather(details.data);
        props.setDailyTemp(details.data)
      });
  };

  const removeCard = (city) => {
    let cityArr = cities;
    var cityIndex = cityArr.indexOf(city);
    cityArr.splice(cityIndex, 1);
    setCities(cityArr);

    props.history.push({
      pathname: "/",
      search: `?cities=${cityArr}`,
    });

    props.getCityFromUrl(cityArr);
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            <strong>
              {props.cityDetails.name},{props.cityDetails.sys.country}
            </strong>
            <CloseIcon
              className={classes.close}
              onClick={() => removeCard(props.cityDetails.name)}
            />
          </Typography>
          <Typography className={classes.temp} variant="h5" component="h2">
            <Waves className={classes.wave} />
            {weather && weather.current ? weather.current.temp : ""} C
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            <strong>
              Feels like
              {weather && weather.current ? weather.current.feels_like : " "}
              C.Haze.Gentle Breeze
            </strong>
          </Typography>
          <Typography variant="body2" component="p"></Typography>
          <div className={classes.icon}>
            <NearMeIcon className={classes.icon} />
            5.1m/s W{" "}
          </div>

          <CheckCircleOutlineIcon className={classes.icon2} />
          <div
            style={{
              fontSize: "13px",
              marginLeft: "100px",
              marginTop: "-9px",
            }}
          >
            108hPa
          </div>
          <div className={classes.humid}>
            <div>
              Humidity:{" "}
              {weather && weather.current ? weather.current.humidity : " "}%{" "}
            </div>
          </div>
          <div
            classesName={classes.uv}
            style={{
              fontSize: "13px",
              marginLeft: "65px",
              marginTop: "-12px",
            }}
          >
            {" "}
            UV:9
          </div>

          <div className={classes.humid}>
            <div>
              {" "}
              Dew point :{" "}
              {weather && weather.current
                ? weather.current.dew_point
                : ""}C{" "}
            </div>
          </div>
          <div
            style={{
              fontSize: "13px",
              marginLeft: "145px",
              marginTop: "-12px",
            }}
          >
            Visibility:
            {weather && weather.current ? weather.current.visibility : ""}km
          </div>
        </CardContent>
      </Card>

    </div>
  );
}

export default withRouter(WeatherCard);
