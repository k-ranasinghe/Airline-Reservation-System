import { Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import MenuIcon from '@mui/icons-material/Menu';
import img from '../image/airline.jpg';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker, DateRangePicker } from '@mui/x-date-pickers/DatePicker';
import axios from "axios";
import { DataGrid, GridColDef, GridToolbarContainer, GridValueGetterParams, useGridApiContext } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
export default function SearchFlightInput() {

  const [data, setData]=useState({});
  
  const [from, setFrom]=useState(null);
  const [to, setTo]=useState(null);
  const [departureDate, setDepartureDate]=useState({});
  const [arrivalDate, setArrivalDate]=useState({});
const [selected, setSelected]=useState({});
const navigate = useNavigate();

    // useEffect(() => {
    //     axios.get("/airbus").then((response) => {
    //       console.log(response);
    //     });
    
    //     // fetch("/").then((response) => {
    //     //     console.log(response);
    //     //     }
    //     // );
        
    // },[])

    const currencies = [
        {
          value: 'CGK(indonesia)',
          label: 'CGK(indonesia)',
        },
        {
          value: 'DPS (Indonesia),',
          label: 'DPS (Indonesia)',
        },
        {
          value: 'BIA',
          label: 'BIA  (Sri Lanka)',
        },
        {
          value: 'DEL (India)',
          label: 'DEL (India)',
        },
        {
          value: 'MAA',
          label: 'MAA (India)',
        },
      ];

      const columns = [
        { field: 'id:', headerName: 'desitination:', width: 70 },

        
        
        { field: 'origin', headerName: 'origin', width: 130 },
        { field: 'airbus_id', headerName: 'FLight name', width: 130 },
        { field: 'departure', headerName: 'Departure Time', width: 130 },

        { field: 'arrival', headerName: 'Arrival Time', width: 130 }

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
      
      const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      ];

      function getFlights(){
        console.log( "from ", from, "to ", to, "departureDate ", departureDate);
        let date = new Date(departureDate);
          date.setDate(date.getDate() + 1);
        axios.get("/flight",{
          params:{
            from:from,
            to:to,
            departureDate:date.toISOString().slice(0,10)      }
        }).then((response) => {
          console.log(response);
          let data=response.data;
          data.map((item)=>{
            // add key id to each object
            item.id=item.flight_id;
            return item;
          })

          setData(response.data);
        });

      }
      
      function CustomFooter() {
        return (
          <Button
          
          
          onClick={()=>{
            navigate("/passengerDetails",{
              state:{
                flight:selected
              }
            })
          }}>


            Book and Continue
          </Button>
        )}
    return (

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
        {data.length>0?
        <>
        <DataGrid

rows={data.length>0?data:[]}
columns={columns}
style={{border:20}}
onRowClick={(e)=>{

  console.log(e.row);
  setSelected(e.row);
}}

slots={{
  footer: CustomFooter,
}}
initialState={{

  pagination: {
    paginationModel: { page: 0, pageSize: 5 },
  },
}}

pageSizeOptions={[5, 10]}

/>

</>
:<><div style={{  alignSelf:'center' ,marginLeft:30, justifyContent:'center'}}>

        
<h1 >Search Flight</h1></div>
      
      <TextField
      sx={{marginLeft:2}}
    id="outlined-select-currency"
    select
    onChange={(e)=>{
      setFrom(e.target.value)
      console.log(e.target.value)}}
    label="from"
    defaultValue="BIA  (Sri Lanka)"
    helperText="Please select your currency"
  >
    {currencies.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>               
  <TextField
   onChange={(e)=>{
    setTo(e.target.value)
    console.log(e.target.value)}}
      sx={{marginLeft:2,marginRight:2}}
    id="outlined-select-currency"
    select

    label="to"
    defaultValue="BIA  (Sri Lanka)"
    helperText="Please select your currency"
  >
    {currencies.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>  
  <DatePicker
  value={departureDate}
  onChange={(e)=>{
    
    setDepartureDate(e);
    console.log(e)}}
  sx={{marginRight:2}} label="Departure Date" />
  <DatePicker
  
  onChange={(e)=>{
    setArrivalDate(e);
    console.log(e)}}
  label="Arrival Date" />

<Button onClick={()=>{
getFlights();  
}} style={{marginLeft:450}} variant="contained" startIcon={<SearchIcon />}>Search</Button>
   </>}
         
      </Paper>
    </Box>
    <Box>
    <DataGrid

        rows={data.length>0?data:[]}
        columns={columns}

        initialState={{

          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
       
        
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </Box>
      
        </div>
    );
}

