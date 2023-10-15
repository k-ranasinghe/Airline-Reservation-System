import { AppBar, Box, Button, Fab, FormControl, FormControlLabel, FormLabel, IconButton, InputLabel, Paper, Radio, RadioGroup, Select, TextField, Toolbar, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import img from '../image/airline.jpg';
import AddIcon from '@mui/icons-material/Add';
import { useHistory, useLocation, useNavigate } from "react-router-dom";
import PassengerDetailCard from "./PassengerCard";
import { DatePicker } from "@mui/x-date-pickers";
import isAdmin, { isGuest } from "../utils/utils";
import axios from "axios";


 export default function PassengerDetailsForm(){
const [passengers,setPassengers]=useState([{}]);
const [passengerDetails,setPassengerDetails]=useState({});
const {dataOfBirth,setDateOfBirth}=useState({});

const [flight,setFlight]=useState({});
const navigate = useNavigate();
const location =useLocation();


function handleChange(event){

  // console.log("event",event);


  setPassengerDetails({...passengerDetails,[event.target.name]:event.target.value});
  console.log("passenegers",passengerDetails);
}

useEffect(()=>{
  setFlight(location.state.flight)},[]);

    return(
          
        <div>
            
        <Box sx={{ flexGrow: 1 }}>

        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              B Airlines
            </Typography>
           
            <Button  onClick={()=>{
              navigate("/reportGeneration")
            }} color="inherit" > {isAdmin()?"Admin":""} </Button>
            <Button onClick={()=>{
              navigate("/loginPage")
            }}
            color="inherit"> {!isGuest()?"Login":""}</Button>
            <Button color="inherit" onClick={()=>{
              axios.post('/signUp/logout').then((response)=>{
                console.log(response);
                localStorage.setItem("passengerDetails",null)
                localStorage.setItem("userName",'')
                navigate("/loginPage")
              }
              )
            }}
            >
              {isGuest()?"Log Out":""}

            </Button>
           
          </Toolbar>
        </AppBar>
</Box>
<Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 50,
          width: "60%",
          minHeight: 200,
          borderRadius:'1rem'
        },
        backgroundImage: `url(${img})`,
        backgroundSize:"cover" ,
        backgroundRepeat:"no-repeat" ,
        backgroundPositionY :'center'
      }}
    > 
      
      <Paper elevation={3}>
        
        <>
      <div style={{  alignSelf:'center' ,marginLeft:30, justifyContent:'center'}}>

        
<h1 >Fill Passenger details { localStorage.getItem("userName")!=''? <Button variant="contained" color="success"   onClick={()=>{
  setPassengers([...passengers,{}])
  // console.log(passengers);
  let userDetails= JSON.parse(localStorage.getItem("userDetails"));
  console.log(userDetails);
  setPassengerDetails(userDetails)
}

}>Auto Fill</Button>:null}</h1>


</div>
<div style={{margin:40}}>
            <div >
                <TextField  onChange={handleChange}
                
                InputLabelProps={{
                  shrink: true,
                }} 
                value={passengerDetails.FirstName!=null ? passengerDetails.FirstName:passengerDetails.LastName} id="firstName" name="FirstName" label="first name"   variant="outlined"/>
                <TextField
                 InputLabelProps={{
                  shrink: true,
                }} 
                onChange={handleChange}  value={passengerDetails.LastName} style={{ marginLeft: 20 }} name="LastName" id="lastName" label="last name" variant="outlined" />
                                <TextField
                 InputLabelProps={{
                  shrink: true,
                }} 
                onChange={handleChange}  value={passengerDetails.PassportNumber} style={{ marginLeft: 20 }} name="PassportNumber" id="lastName" label="Passport Number" variant="outlined" />
                <TextField  onChange={handleChange}
                
                InputLabelProps={{
                  shrink: true,
                }} 
                value={passengerDetails.ContactNumber1} id="firstName" name="ContactNumber1" label="ContactNumber1"   variant="outlined"/>
                <FormControl style={{
                    marginLeft: 20,
                    marginRight:20
                }}>


              
  <InputLabel id="demo-simple-select-label">Nationality</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={passengerDetails.naitionality?passengerDetails.naitionality:"sri lankan"}
    label="naitionality"
    onChange={handleChange}
    name="naitionality"
  >
    <MenuItem value={"sri lankan"}>Sri lankan</MenuItem>
    <MenuItem value={"indian"}>Indian</MenuItem>
    <MenuItem value={"british"}>Canadian</MenuItem>
  </Select>
</FormControl>
                  <DatePicker
                style={{ marginLeft: 20 }}
                name="dateOfBirth"
                // value={new Date(passengerDetails.DateOfBirth)}

                    onChange={(e) => {
                        console.log(e)
                        // handleChange(e)
                        // setDateOfBirth(e)
                    }}
                    label="DateOfBirth" />  
                    </div>
            <div style={{marginTop:10}}>

                <TextField id="outlined-basic"  InputLabelProps={{
            shrink: true,
          }} 
          onChange={handleChange} value={passengerDetails.EmailAddress} name="EmailAddress" label="Email Address" variant="outlined" />
           
<FormControl style={{ marginLeft: 20 }} >
                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="gender"



    value={passengerDetails.dateOfBirth}
    onChange={handleChange}

                    >
                        <FormControlLabel  value="female" control={<Radio  />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />

                    </RadioGroup>
                </FormControl>
            </div>
        </div>
        <Button
        fullWidth={true}
        
          
          
          onClick={()=>{
            navigate('/seatBooking',{
              state: {
                passengerDetails: passengerDetails,
                flight:flight
              }
            })
            
          }}>


            Book and Continue
          </Button>


        </>
        </Paper>
        </Box>




  
    </div>
);
    
}

