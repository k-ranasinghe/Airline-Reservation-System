import { AppBar, Box, Button, Fab, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import img from '../image/airline.jpg';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from "react-router-dom";
import PassengerDetailCard from "./PassengerCard";


 export default function PassengerDetailsForm(){
const [passengers,setPassengers]=useState([{}]);
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

        
<h1 >Fill Passenger details</h1></div>
<div style={{marginLeft:30}}>
{passengers.map((passenger,index)=>{


return(
  <div key={index}>
    <PassengerDetailCard/>
    </div>
)

})}

<PassengerDetailCard/>

</div>
<Fab 
onClick={()=>{
    setPassengers([...passengers,{}])
}}
color="primary" aria-label="add">
  <AddIcon />
</Fab>


        </>
        </Paper>
        </Box>




  
    </div>
);
    
}

