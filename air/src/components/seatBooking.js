import { Checkbox, FormGroup } from "@mui/material";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import { AppBar, Box, Button, Fab, FormControl, FormControlLabel, FormLabel, IconButton, InputLabel, Paper, Radio, RadioGroup, Select, TextField, Toolbar, Typography } from "@mui/material";
import React from "react";
import ChairIcon from '@mui/icons-material/Chair';
import { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import img from '../image/airline.jpg';
import AddIcon from '@mui/icons-material/Add';
import { useHistory, useNavigate } from "react-router-dom";
import PassengerDetailCard from "./PassengerCard";
import { DatePicker } from "@mui/x-date-pickers";

export default function SeatBooking(){
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const init_seat = [ {id:1, seat_no: 'A1', is_selected: false },
    {id:2, seat_no: 'A2', is_selected: true},
    {id:3, seat_no: 'A3', is_selected: true},
    {id:4, seat_no: 'A4', is_selected: true},
    {id:5, seat_no: 'A5', is_selected: false},
    {id:6, seat_no: 'A6', is_selected: false},
    {id:7, seat_no: 'A7', is_selected: false},
    {id:8, seat_no: 'A8', is_selected: false},
    {id:9, seat_no: 'A9', is_selected: false},
    {id:10, seat_no: 'A10', is_selected: false},
    {id:11, seat_no: 'A11', is_selected: false},
    {id:12, seat_no: 'A12', is_selected: false},
    {id:13, seat_no: 'A13', is_selected: false},
    {id:14, seat_no: 'A14', is_selected: false},
    {id:15, seat_no: 'A15', is_selected: false},
    {id:16, seat_no: 'A16', is_selected: false},
    {id:17, seat_no: 'A17', is_selected: false},
    {id:18, seat_no: 'A18', is_selected: false},
    {id:19, seat_no: 'A19', is_selected: false},
    {id:20, seat_no: 'A20', is_selected: false},
    {id:21, seat_no: 'A21', is_selected: false},
    {id:22, seat_no: 'A22', is_selected: false},
    {id:23, seat_no: 'A23', is_selected: false},
    {id:24, seat_no: 'A24', is_selected: false},
    {id:25, seat_no: 'A25', is_selected: false},
    {id:26, seat_no: 'A26', is_selected: false},
    {id:27, seat_no: 'A27', is_selected: false},
    {id:28, seat_no: 'A28', is_selected: false},
    {id:29, seat_no: 'A29', is_selected: false},
    {id:30, seat_no: 'A30', is_selected: false},

]

    const [seats,setSeates]=useState(init_seat);
    const [bookedSeat,seatBookedSeat]=useState('A1');
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

        
<h1 >Book Seat</h1>
</div>
                <div style={{margin:40}}>

                <FormControl component="fieldset">
      <FormLabel component="legend">Business Class</FormLabel>
      <FormGroup aria-label="position" row>


        <FormControlLabel
          value="top"
          control={<Checkbox           icon={<ChairIcon />} checkedIcon={<ChairIcon />}
          />}
          label="Top"
          labelPlacement="bottom"
        />

        {seats.map((seat,index)=>{
            return(
                <FormControlLabel
                key={index}
                value="top"
                control={<Checkbox   disabled={seat.is_selected}  checked={bookedSeat===seat.seat_no?true:false}    icon={<ChairIcon />} checkedIcon={<ChairIcon />}
                />}

                onChange={(e)=>{

                    seatBookedSeat(seat.seat_no);



                    
                    
                }}
                label={seat.seat_no}
                labelPlacement="bottom"
              />
            )
        })}
       
      </FormGroup>
    </FormControl>

                  </div>
                  <Button
        fullWidth={true}
        
          
          
          onClick={()=>{
            navigate('/reviewAndPay')
            
          }}>


            Book and Proceedd to Review
          </Button>
                  </>
        </Paper>

        </Box>

        </div>
    )
}