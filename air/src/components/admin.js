import { Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from "dayjs";
import MenuIcon from '@mui/icons-material/Menu';
import img from '../image/airline.jpg';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker, DateRangePicker } from '@mui/x-date-pickers/DatePicker';
import axios from "axios";
import { DataGrid, GridColDef, GridToolbarContainer, GridValueGetterParams, useGridApiContext } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import isAdmin, { isGuest, logout } from "../utils/utils";


export default function AdminPage() {

  const navigate = useNavigate();
  

//   useEffect(() => {
//     console.log(localStorage.getItem("username"));
//     localStorage.removeItem("seat")

//     if (!localStorage.getItem("userDetails") && !isGuest()) {
//       navigate("/loginPage");
//     }




//     axios.get("/booking/airports").then((response) => {
//       console.log(response);

//       let data = response.data;
//       let countries = [];

//       countries = data.map((item) => {
//         return {
//           value: item.airportcode,
//           label: <><p style={{ margin: 0 }}>
//             <p style={{ fontWeight: 'bold', margin: 0, marginTop: 20 }}>{item.cityname} - {item.countryname}</p><br /><p style={{ fontSize: 15, margin: 0, marginTop: -20 }}>{item.airportname}   {"(" + item.airportcode + ")"}</p></p></>
//         }
//       })

//       setCountries(countries);
//     }
//     );
//   }, [])


  return (

    <div>

      <Box sx={{ flexGrow: 1 }}>

        <AppBar position="static">
          <Toolbar>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              B Airways
            </Typography>
            <Typography style={{ marginLeft: 500 }} variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome {localStorage.getItem("userName") != '' ? localStorage.getItem("userName") : ""}
            </Typography>
            <Button onClick={() => {
              navigate("/flightStatus")
            }} color="inherit" > Flight Status </Button>
            {isAdmin() ? <Button onClick={() => {
              navigate("/reportGeneration")
            }} color="inherit" > Admin</Button> : null}
            <Button onClick={() => {
              navigate("/loginPage")
            }}
              color="inherit"> {isGuest() ? "Login" : ""}</Button>
            {!isGuest() ? <Button color="inherit" onClick={() => {
              axios.post('/signUp/logout').then((response) => {
                console.log(response);
                logout();

                navigate("/loginPage")
              }
              )
            }}
            >
              Log Out

            </Button> : null}

          </Toolbar>
        </AppBar>
      </Box>


      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          minHeight: '100vh',
        //   backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPositionY: 'center',
        }}
      >

<Paper elevation={3}

style={{ marginTop: 50, marginLeft: -800 }}>
<><div style={{ alignSelf: 'center', marginLeft: 30, width: '700px', height: '400px', justifyContent: 'center' }}>


  <h1 >Sector 1</h1></div>
  <div>
  <Typography variant="h5" sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Calibri',
                fontWeight: 'bold',
                letterSpacing: '.05rem',
                color: 'grey',
                textDecoration: 'none',
              }}><div style={{ marginTop: -320, marginLeft: '50px', marginRight: 'auto', width: 'fit-content' }}
              >Heart Rate</div>
              <div style={{ marginTop: -320, marginLeft: '50px', marginRight: 'auto', width: 'fit-content' }}
                >Blood Oxygen</div>
                <div style={{ marginTop: -320, marginLeft: '40px', marginRight: 'auto', width: 'fit-content' }}
                >Temperature</div></Typography>
              <div style={{ marginTop: -300, marginLeft: 100, marginRight: 'auto', width: 'fit-content', fontSize: '50px', color: 'rgba(100, 100, 100, 0.3)' }}>50</div>
              <div style={{ marginTop: -67, marginLeft: 350, marginRight: 'auto', width: 'fit-content', fontSize: '50px', color: 'rgba(100, 100, 100, 0.3)' }}>50</div>
              <div style={{ marginTop: -67, marginLeft: 580, marginRight: 'auto', width: 'fit-content', fontSize: '50px', color: 'rgba(100, 100, 100, 0.3)' }}>50</div>
              <Typography variant="h5" sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Calibri',
                fontWeight: 'bold',
                letterSpacing: '.05rem',
                color: 'grey',
                textDecoration: 'none',
              }}><div style={{ marginTop: 50, marginLeft: '50px', marginRight: 'auto', width: 'fit-content' }}
              >Noise Level</div>
              <div style={{ marginTop: 50, marginLeft: '10px', marginRight: 'auto', width: 'fit-content' }}
                >Air Quality</div>
                <div style={{ marginTop: 50, marginLeft: '40px', marginRight: 'auto', width: 'fit-content' }}
                >Humidity</div></Typography>
              <div style={{ marginTop: -10, marginLeft: 100, marginRight: 'auto', width: 'fit-content', fontSize: '50px', color: 'rgba(100, 100, 100, 0.3)' }}>50</div>
              <div style={{ marginTop: -67, marginLeft: 350, marginRight: 'auto', width: 'fit-content', fontSize: '50px', color: 'rgba(100, 100, 100, 0.3)' }}>50</div>
              <div style={{ marginTop: -67, marginLeft: 580, marginRight: 'auto', width: 'fit-content', fontSize: '50px', color: 'rgba(100, 100, 100, 0.3)' }}>50</div>
  </div>
</> 

</Paper>
<Paper
      elevation={0} // Set elevation to 0 for no shadow
      style={{ marginTop: -320, marginLeft: -1300, height: '50px', width: '100px',
        border: '3px solid rgba(0, 100, 100, 0.5)', // Set border color with transparency
        padding: '20px', // Optional: Add padding if needed
        backgroundColor: 'transparent', // Optional: Set a background color
        borderRadius: '10px'
      }}
    >  
    </Paper>
    <Paper
      elevation={0} // Set elevation to 0 for no shadow
      style={{ marginTop: -95, marginLeft: -835, height: '50px', width: '115px',
        border: '3px solid rgba(0, 100, 100, 0.5)', // Set border color with transparency
        padding: '20px', // Optional: Add padding if needed
        backgroundColor: 'transparent', // Optional: Set a background color
        borderRadius: '10px',
      }}
    >  
    </Paper>
    <Paper
      elevation={0} // Set elevation to 0 for no shadow
      style={{ marginTop: -95, marginLeft: -352, height: '50px', width: '105px',
        border: '3px solid rgba(0, 100, 100, 0.5)', // Set border color with transparency
        padding: '20px', // Optional: Add padding if needed
        backgroundColor: 'transparent', // Optional: Set a background color
        borderRadius: '10px',
      }}
    >  
    </Paper>
    <Paper
      elevation={0} // Set elevation to 0 for no shadow
      style={{ marginTop: 38, marginLeft: -1300, height: '50px', width: '100px',
        border: '3px solid rgba(0, 100, 100, 0.5)', // Set border color with transparency
        padding: '20px', // Optional: Add padding if needed
        backgroundColor: 'transparent', // Optional: Set a background color
        borderRadius: '10px'
      }}
    >  
    </Paper>
    <Paper
      elevation={0} // Set elevation to 0 for no shadow
      style={{ marginTop: -95, marginLeft: -835, height: '50px', width: '115px',
        border: '3px solid rgba(0, 100, 100, 0.5)', // Set border color with transparency
        padding: '20px', // Optional: Add padding if needed
        backgroundColor: 'transparent', // Optional: Set a background color
        borderRadius: '10px',
      }}
    >  
    </Paper>
    <Paper
      elevation={0} // Set elevation to 0 for no shadow
      style={{ marginTop: -95, marginLeft: -352, height: '50px', width: '105px',
        border: '3px solid rgba(0, 100, 100, 0.5)', // Set border color with transparency
        padding: '20px', // Optional: Add padding if needed
        backgroundColor: 'transparent', // Optional: Set a background color
        borderRadius: '10px',
      }}
    >  
    </Paper>

<Paper elevation={3}

style={{ marginTop: -335, marginLeft: 700 }}>
<><div style={{ alignSelf: 'center', marginLeft: 30, width: '700px', height: '400px', justifyContent: 'center' }}>


  <h1 >Sector 2</h1></div>
  <div>

  </div>
</> 

</Paper>


      </Box>


    </div>
  );
}

