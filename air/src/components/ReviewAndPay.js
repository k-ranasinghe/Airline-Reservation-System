import React, { useEffect } from "react";
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
import { useHistory, useLocation, useNavigate } from "react-router-dom";
import PassengerDetailCard from "./PassengerCard";
import { DatePicker } from "@mui/x-date-pickers";
import { DataGrid, GridActionsCellItem, GridSaveAltIcon } from "@mui/x-data-grid";
import Backdrop from '@mui/material/Backdrop';
import axios from "axios";
import isAdmin, { isGuest, logout } from "../utils/utils";
export default function ReviewAndPay() {


  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const location = useLocation();
  const [flight, setFlight] = useState({});
  const [passengerDetails, setPassengerDetails] = useState({});
  const [seat, setSeat] = useState([]);
  const [contactDeatils, setContactDetails] = useState({});
  const [details, setDetails] = useState([])
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});



  function getAirportLocation(origin, desitination) {
    axios.get("/booking/aiportLocation", {
      params: {
        origin: origin,
        destination: desitination
      }
    }).then((response) => {
      console.log("ariport ", response);
      setOrigin(response.data.find((item) => item.airportcode === origin))
      setDestination(response.data.find((item) => item.airportcode === desitination))

    })
  }
  function createTicket() {
    console.log(location.state.bookingDetails[0])
    axios.post("/booking/createPayment", {
      bookingId: location.state.bookingDetails[0].BookingID,
      passengerID: location.state.bookingDetails[0].PassengerID,
      flight: flight,
      passengerDetails: passengerDetails,
      seat: seat

    }).then((response) => {
      console.log(response);
    })
  }

  useEffect(() => {
    if (localStorage.getItem("seat") !== null) {

      setPassengerDetails(JSON.parse(localStorage.getItem("passengerDetails")))
    }
    getAirportLocation(location.state.flight.Origin, location.state.flight.Destination);
  }, [])
  useEffect(() => {
    console.log(location.state)

    setFlight([{ id: 1, ...location.state.flight }])
    setPassengerDetails([{ id: 1, ...location.state.passengerDetails }])
    setContactDetails({
      emailAddress: location.state.passengerDetails.emailAddress,
      contactNumber: location.state.passengerDetails.contactNumber
    });
    setSeat([{ seatNO: location.state.bookedSeat, travelClass: location.state.travelClass, id: 1 }])
    setDetails([{
      id: "1",
      desitination: location.state.flight.desitination,
      origin: location.state.flight.origin,
      airbus_id: location.state.flight.airbus_id,
      departure: location.state.flight.departure,
      arrival: location.state.flight.arrival,
      passengerName: location.state.passengerDetails.firstName
    }])


  }, [])

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

  const passengerColumn = [
    { field: 'id:', headerName: '', width: 70 },


    { field: 'FirstName', headerName: 'First Name', width: 200 },
    { field: 'LastName', headerName: 'Last Name', width: 130 },
    { field: 'PassportNumber', headerName: 'PassportNumber', width: 130 },

    { field: 'ContactNumber1', headerName: 'Contact Number 1', width: 130 },
    { field: 'EmailAddress', headerName: 'Email Address', width: 130 },
    { field: 'ContactNumber2', headerName: 'Contact Number 2', width: 200 },


  ];

  const flightColumn = [
    { field: 'id:', headerName: '', width: 70 },




    { field: 'FlightNumber', headerName: 'Flight Number', width: 100 },
    { field: 'AircraftID', headerName: 'Air Bus', width: 100 },

    { field: 'DepartureDateTime', headerName: 'Departure Time', width: 250 },
    { field: 'ArrivalDateTime', headerName: 'Expected Arrival', width: 300 },

    { field: 'Duration', headerName: 'Duration', width: 100 }


  ];


  const seatColumn = [
    { field: 'id:', headerName: '', width: 70 },


    { field: 'travelClass', headerName: 'Travel Class', width: 200 },
    { field: 'seatNO', headerName: 'Seat no', width: 130 }



  ];


  const columns = [
    { field: 'id:', headerName: 'id:', width: 0 },


    { field: 'airbus_id', headerName: 'FLight name', width: 100 },
    { field: 'departure', headerName: 'Departure Time', width: 100 },

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

  const row = [{
    id: "1",
    desitination: 'BIA',
    origin: 'MAI',
    airbus_id: 'BIA 123',
    departure: '12.00',
    arrival: '12.00',
    passengerName: 'Sajeenthiran Parameswaran',
  }]


  function bookTicket() {
    axios.post("/bookTicket", {
      flight: flight,
      passengerDetails: passengerDetails,
      seat: seat
    }).then((response) => {
      console.log(response);
    })

  }

  return (
    <div>


      <Box sx={{ flexGrow: 1 }}>

        <AppBar position="static">
          <Toolbar>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              B Airlines
            </Typography>

            <Button onClick={() => {
              navigate("/flightStatus")
            }} color="inherit" > Flight Status </Button>

            <Button onClick={() => {
              navigate("/reportGeneration")
            }} color="inherit" > {isAdmin() ? "Admin" : ""} </Button>
            <Button onClick={() => {
              navigate("/loginPage")
            }}
              color="inherit"> {isGuest() ? "Login" : ""}</Button>
            <Button color="inherit" onClick={() => {
              axios.post('/signUp/logout').then((response) => {
                logout();

                navigate("/loginPage")
              }
              )
            }}
            >
              {!isGuest() ? "Log Out" : ""}

            </Button>

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
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPositionY: 'center',
        }}
      >

        <Paper elevation={3}>

          <>
            <div style={{ alignSelf: 'center', marginLeft: 30, justifyContent: 'center' }}>


              <h1 >Booking Summary</h1>
            </div>
            <div style={{ display: 'flow', flexDirection: 'row' }}>

              <div>
                <p style={{ margin: 0, marginLeft: 30 }}>
                  <p>
                    From
                  </p>

                  <p style={{ fontWeight: 'bold', margin: 0, marginTop: -10 }}>{origin.cityname} - {origin.countryname}</p><br /><p style={{ fontSize: 15, margin: 0, marginTop: -20 }}>{origin.airportname}   {"(" + origin.airportcode + ")"}</p></p>
              </div>
              <div>

                <p style={{ margin: 0, marginLeft: 30, marginTop: 30 }}>
                  <p>
                    To
                  </p>
                  <br />
                  <p style={{ fontWeight: 'bold', margin: 0, marginTop: -30 }}>{destination.cityname} - {destination.countryname}</p><br /><p style={{ fontSize: 15, margin: 0, marginTop: -20 }}>{destination.airportname}   {"(" + destination.airportcode + ")"}</p></p>
              </div>

            </div>
            <div style={{ alignSelf: 'center', marginLeft: 30, marginTop: 20, justifyContent: 'center' }}>



              {details.length > 0 ? <>
                <DataGrid

                  rows={flight}
                  columns={flightColumn}
                  style={{ border: 20 }}
                  disableRowSelectionOnClick
                  disableSelectionOnClick
                  hideFooter









                />

              </> : null}
            </div>
            <div style={{ alignSelf: 'center', marginLeft: 30, marginTop: 40, justifyContent: 'center' }}>


              <h3 >Passenger Details </h3>
            </div>

            <div style={{ alignSelf: 'center', marginLeft: 30, justifyContent: 'center' }}>



              {details.length > 0 ? <>
                <DataGrid

                  rows={passengerDetails}
                  columns={passengerColumn}
                  style={{ border: 20 }}
                  disableRowSelectionOnClick
                  disableSelectionOnClick
                  hideFooter









                />

              </> : null}
            </div>

            <div style={{ alignSelf: 'center', marginLeft: 30, marginTop: 40, justifyContent: 'center' }}>


              <h3 >Selected Seat</h3>
            </div>

            <div style={{ alignSelf: 'center', marginLeft: 30, justifyContent: 'center' }}>



              {details.length > 0 ? <>
                <DataGrid

                  rows={seat}
                  columns={seatColumn}
                  style={{ border: 20 }}
                  disableRowSelectionOnClick
                  disableSelectionOnClick
                  hideFooter









                />

              </> : null}
            </div>
            <Button
              fullWidth={true}



              onClick={() => {
                setOpen(true)
                createTicket();


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