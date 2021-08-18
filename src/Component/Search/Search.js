import {
  Button,
  CircularProgress,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  TextField,
  useMediaQuery,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CloudIcon from "@material-ui/icons/Cloud";
import InputBase from "@material-ui/core/InputBase";
import { withRouter } from "react-router-dom";
import Service from "../../Services/CityService";
import "./Search.css";
const service = new Service();

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  text: {
    position: "relative",
    marginTop: 75,
    marginLeft: "10%",
    borderRadius: 4,
    backgroundColor: theme.palette.background.paper,
    fontSize: 16,
    width: "100%",
    height: "38%",
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
    [theme.breakpoints.up("xs")]: {
      width: 313,
      marginLeft: "-1%",
    },
    [theme.breakpoints.up("md")]: {
      width: "10%",
      marginLeft: "1%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "60%",
      marginLeft: "1%",
      height: "70%",
    },
  },
  search: {
    marginTop: 75,
    marginLeft: "2%",
    height: "10%",
    fontSize: "20px",
    // "@media (max-width: 420px)": {
    [theme.breakpoints.up("xs")]: {
      height: "50%",
      fontSize: "18px",
      marginLeft: "10px",
      marginTop: "30px",
    },
    // "@media (max-width: 780px)": {
    [theme.breakpoints.up("md")]: {
      // height: "63%",
      fontSize: "23px",
      marginLeft: "25px",
      marginTop: "75px",
    },
    [theme.breakpoints.up("sm")]: {
      // height: "40%",
      fontSize: "23px",
      marginLeft: "25px",
      marginTop: "75px",
    },
  },
  popper: {
    position: "relative",
    marginTop: 120,
    marginLeft: "32.5%",
    width: "38%",
    [theme.breakpoints.up("xs")]: {
      width: "83%",
      marginLeft: "7.8%",
      marginTop: "35%",
    },
    // "@media (max-width: 780px)": {
    [theme.breakpoints.up("md")]: {
      width: "100%",
      marginLeft: "29%",
      marginTop: "7.8%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "47.6%",
      marginLeft: "10.5%",
      marginTop: "10.2%",
    },
  },
  paper: {
    padding: 4,
    height: "auto",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    // "@media (max-width: 420px)": {
    [theme.breakpoints.up("xs")]: {
      display: "flex",
      fontSize: "18px",
      flexDirection: "column",
    },
    // [theme.breakpoints.up("md")]: {
    //   width: "39%",
    //   marginLeft: "-3.3%",
    //   marginTop: "0.8%",
    // },
  },
  list: {
    minWidth: "100%",
    height: "auto",
    [theme.breakpoints.up("sm")]: {
      fontSize: "20px",
    },
  },
  listItemText: {
    // marginLeft:3,
    fontSize: "12px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    [theme.breakpoints.up("xs")]: {
      fontSize: "10px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "18px",
    },
  },
  loader: {
    zIndex: theme.zIndex.drawer + 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "50%",
  },
  temp: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    [theme.breakpoints.up("xs")]: {
      fontSize: "15px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "22px",
    },
  },
  name: {
    [theme.breakpoints.up("xs")]: {
      fontSize: "15px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "23px",
    },
  },
  icon: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    [theme.breakpoints.up("xs")]: {
      width: "15px",
      marginLeft: "20px",
    },
  },
}));

function Search(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState("");
  const [cityDetails, setCityDetails] = useState([]);
  const [selectedCities, setSelectedCities] = useState(props.urlCities);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    console.log("Cities form url", props.urlCities, selectedCities);
  }, [selectedCities]);

  const setSearchCity = (city) => {
    if (city === "") {
      setOpen(false);
    }
    console.log("city from search", city);
    setCity(city);
  };

  const searchCity = () => {
    setOpen(!open);
    let val = city;
    handleToggle();
    service
      .findCity(val)
      .then((res) => {
        let value = res.data.list;
        setCityDetails({ cityDetails: value });
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setLoader(false);
  };

  const handleToggle = () => {
    setLoader({ loader: true });
  };

  const setCityInUrl = (city) => {
    setOpen(!open);
    let cityArr = selectedCities;

    var cityIndex = cityArr.indexOf(city.name);

    if (cityIndex === -1) {
      let length = cityArr.length;
      if (length === 4) {
        cityArr.shift();
      }
      console.log("Empty CITY NOT in url", length);
      cityArr.push(city.name);

      setSelectedCities(cityArr);

      console.log("Citiesss", selectedCities);

      props.history.push({
        pathname: "/",
        search: `?cities=${cityArr}`,
      });
    }

    props.getCityFromUrl(cityArr);
    setCity("");
  };

  let details = cityDetails.cityDetails;

  return (
    <div>
      <TextField
        id="outlined-basic"
        className={classes.text}
        label="Search"
        variant="outlined"
        value={city}
        onChange={(e) => setSearchCity(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        className={classes.search}
        onClick={searchCity}
      >
        Search
      </Button>
      <Popper className={classes.popper} open={open}>
        <Paper className={classes.paper}>
          {loader ? (
            <CircularProgress className={classes.loader} color="inherit" />
          ) : (
            <>
              {details ? (
                <>
                  {details.map((city) => {
                    return (
                      <ListItem
                        button
                        className={classes.list}
                        onClick={() => setCityInUrl(city)}
                      >
                        <ListItemText classes={{ primary: classes.name }}>
                          {city.name},{city.sys.country}
                        </ListItemText>
                        <ListItemText classes={{ primary: classes.temp }}>
                          {city.main.temp}C
                        </ListItemText>
                        <ListItemIcon>
                          <CloudIcon className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText
                          classes={{ primary: classes.listItemText }}
                          primary={`lat:${city.coord.lat},lon:${city.coord.lon}`}
                        ></ListItemText>
                      </ListItem>
                    );
                  })}
                </>
              ) : null}
            </>
          )}
        </Paper>
      </Popper>
    </div>
  );
}

export default withRouter(Search);
