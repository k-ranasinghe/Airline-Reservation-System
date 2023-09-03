import { AppBar, Box, Button, Fab, FormControl, FormControlLabel, FormLabel, IconButton, InputLabel, Paper, Radio, RadioGroup, Select, TextField, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import img from '../image/airline.jpg';
import AddIcon from '@mui/icons-material/Add';
import { useHistory, useNavigate } from "react-router-dom";
import PassengerDetailCard from "./PassengerCard";
import { DatePicker } from "@mui/x-date-pickers";


 export default function PassengerDetailsForm(){
const [passengers,setPassengers]=useState([{}]);
const[age, setAge]=useState(10);
const navigate = useNavigate();

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
      <Button color="inherit">Login</Button>
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

        
<h1 >Fill Passenger details</h1>
</div>
<div style={{margin:40}}>
            <div >
                <TextField id="outlined-basic" label="first name" variant="outlined" />
                <TextField style={{ marginLeft: 20 }} id="outlined-basic" label="last name" variant="outlined" />
                
                <FormControl style={{
                    marginLeft: 20,
                    marginRight:20
                }}>
  <InputLabel id="demo-simple-select-label">Nationality</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Age"
    // onChange={handleChange}
  >
    <MenuItem value={10}>Sri lankan</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl>
                  <DatePicker
                style={{ marginLeft: 20 }}

                    onChange={(e) => {
                        console.log(e)
                    }}
                    label="   Date Of Birth" />  
                    </div>
            <div style={{marginTop:10}}>

                <TextField id="outlined-basic" label="Email Address" variant="outlined" />
           
<FormControl style={{ marginLeft: 20 }} >
                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />

                    </RadioGroup>
                </FormControl>
            </div>
        </div>
        <Button
        fullWidth={true}
        
          
          
          onClick={()=>{
            navigate('/seatBooking')
            
          }}>


            Book and Continue
          </Button>


        </>
        </Paper>
        </Box>




  
    </div>
);
    
}

