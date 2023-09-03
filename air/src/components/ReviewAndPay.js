import React from "react";
import { Checkbox, Fade, FormGroup, Modal } from "@mui/material";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import { AppBar, Box, Button, Fab, FormControl, FormControlLabel, FormLabel, IconButton, InputLabel, Paper, Radio, RadioGroup, Select, TextField, Toolbar, Typography } from "@mui/material";
import ChairIcon from '@mui/icons-material/Chair';
import { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import img from '../image/airline.jpg';
import AddIcon from '@mui/icons-material/Add';
import { useHistory, useNavigate } from "react-router-dom";
import PassengerDetailCard from "./PassengerCard";
import { DatePicker } from "@mui/x-date-pickers";
import { DataGrid } from "@mui/x-data-grid";
import Backdrop from '@mui/material/Backdrop';
 export default function ReviewAndPay(){


  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

    const columns = [
        { field: 'id:', headerName: 'id:', width: 70 },

        
        { field: 'desitination:', headerName: 'desitination', width: 200 },
        { field: 'origin', headerName: 'origin', width: 130 },
        { field: 'airbus_id', headerName: 'FLight name', width: 130 },
        { field: 'departure', headerName: 'Departure Time', width: 130 },

        { field: 'arrival', headerName: 'Arrival Time', width: 130 },
        { field: 'passengerName', headerName: 'Passenger Name', width: 130 }


        // {
        //   field: 'departure',
        //   headerName: 'Age',
        //   type: 'number',
        //   width: 90,
        // },
        // {
        //   field: 'fullName',
        //   headerName: 'Full name',
        //   description: 'This column has a value getter and is not sortable.',
        //   sortable: false,
        //   width: 160,
        //   valueGetter: (params) =>
        //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        // },
      ];

      const row=[{
        id:"1",
        desitination:'BIA',
        origin:'MAI',
        airbus_id:'BIA 123',
        departure:'12.00',
        arrival:'12.00',
        passengerName:'Sajeenthiran Parameswaran',
        }]

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

        
<h1 >Review And Pay</h1>
</div>

<div style={{  alignSelf:'center' ,marginLeft:30, justifyContent:'center'}}>

        

<>
        <DataGrid

rows={row}
columns={columns}
style={{border:20}}
disableRowSelectionOnClick
disableSelectionOnClick



 





/>

</>
</div>
<Button
        fullWidth={true}
        
          
          
          onClick={()=>{
            setOpen(true)
           
            
          }}>


            comfirm Payment
          </Button>
</>
        </Paper>

        </Box>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Thank you for your payment
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              The ticket will be sent to your email address
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Have A Safe Journey
            </Typography>
          </Box>
        </Fade>
      </Modal>

        </div>
        )
 }