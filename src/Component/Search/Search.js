import { Button, ListItem, ListItemIcon, ListItemText, Paper, Popper} from '@material-ui/core'
import React,{useState} from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CloudIcon from '@material-ui/icons/Cloud';
import InputBase from '@material-ui/core/InputBase';
import {withRouter } from "react-router-dom";
import Service from "../../Services/CityService";

const service = new Service();

const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      marginTop: 75,
      marginLeft: 140,
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      width:515,
      padding: '10px 56px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);
  
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    search: {
     marginTop : -5,
     marginLeft: 2,
    //  margin: theme.spacing(2),
    },
    popper: {
     position: "relative",
     marginTop : 120,
     marginLeft: 212, 
     width:"51.4%",
    },
    paper :{
        padding: 4,
        minWidth: "74%",
        // maxWidth:"80% !important",
        height: "auto",
        marginLeft:"277px",        
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
    },
    list : {
        minWidth:"100%",
        height:"auto",
        // fontSize: 5,
        // paddingRight:25,
        // marginLeft:50
    },
    listItemText:{
        // marginLeft:3,
        fontSize:'12px',
        display:"flex",
        justifyContent:"flex-end",
        alignItems:"flex-end",
      },
       loader: {
        zIndex: theme.zIndex.drawer + 1,
        display:"flex",
        justifyContent: "center",
        alignItems:"center",
        marginLeft: "50%"
  },
  temp:{
    display:"flex",
    justifyContent:"flex-start",
    alignItems:"flex-end",
  },
  name:{
    // display:"flex",
    // justifyContent:"flex-start",
    // alignItems:"flex-start",
  },
  icon:{
    //   marginLeft:"50px",
    display:"flex",
    justifyContent:"flex-end",
    alignItems:"flex-end",
  }
  }));

function Search(props) {
  
    const classes = useStyles();
    const [open,setOpen]= useState(false);
    const [city,setCity] = useState("");
    const [cityDetails,setCityDetails]= useState([]);
    
    const setSearchCity = (city) => {       
        if(city === ""){
            setOpen(false);
          }
          setCity({city: city}); 
    }

    const searchCity = () => {
        setOpen(!open)
        let val = city.city;       
        // handleToggle();
        service.findCity(val).then((res) => {
            let value = res.data.list        
            setCityDetails({cityDetails : value})
            // handleClose();               
        }).catch((error) => {
            console.log(error);
        })               
    }
    let cityArr = [];

    const setCityInUrl = (city) => {
        setOpen(!open)
        cityArr.push(city.name)

        if(city.name != props.urlCity){
            props.history.push({
                pathname: '/',
                search: `?cities=${JSON.stringify(cityArr)}`
       
            })
        }      
        props.getCityFromUrl(city);
    
    }
    
    let details = cityDetails.cityDetails;
  
    return (
        <div>           
            <BootstrapInput id="cityInput"  placeholder="Search" onChange={(e) => setSearchCity(e.target.value)}/>
            <Button variant="contained" color="primary" className={classes.search} onClick={searchCity}>Search</Button>            
                <Popper  className={classes.popper} open={open} >
                    <Paper className={classes.paper}>
                    {details ? <>
                        {details.map((city)=>{ 
                            return(
                                <ListItem button className={classes.list} onClick={()=>setCityInUrl(city)}>                        
                                    <ListItemText className={classes.name}>
                                        {city.name},{city.sys.country} 
                                    </ListItemText>        
                                    <ListItemText className={classes.temp}>
                                        {city.main.temp}C
                                    </ListItemText>
                                    <ListItemIcon >
                                        <CloudIcon className={classes.icon}/>
                                    </ListItemIcon>
                                    <ListItemText  classes={{primary:classes.listItemText}}
                                        primary={`lat:${city.coord.lat},lon:${city.coord.lon}`}>
                                    </ListItemText>
                                </ListItem>                
                                )}
                        )}</>  :null}     
                </Paper>
            </Popper>               
        </div>
    )
}


export default withRouter(Search);