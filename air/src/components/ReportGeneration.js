import React, { useEffect, useState } from "react";
import { Paper, TextField } from "@mui/material";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from '@mui/material';
import img from '../image/airline.jpg';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker, DateRangePicker } from '@mui/x-date-pickers/DatePicker';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';



function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Type 1', 3, 2, 44.1, 4.3),
    createData('Type 2', 6, 4, 42.8, 11.7),
    createData('Type 3', 5, 5, 29.6, -2.0),
    createData('Type 4', 8, 11, 39.0, 4.1),
    createData('Type 5', 15, 14, 31.9, 3.9),
  ];

  

export default function ReportGeneration() {
  const [value, setValue] = React.useState(0);

  const [from, setFrom]=useState(null);
  
  

  const [departureDate, setDepartureDate]=useState({});
  const [arrivalDate, setArrivalDate]=useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleListItemClick = (filePath) => {
    // Open a local JavaScript file when a list item is clicked
    window.location.href = filePath;
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[{text:'Explore', filePath: '/passengerDetails'}, 
        {text:'Book', filePath: '/PassengerDetailsForm' }, 
        {text:'Membership Privilages', filePath: '/PassengerCard' }, 
        {text:'Admin Login', filePath: '/ReportGeneration' }].map((item, index) => (
          <ListItem key={item.text} disablePadding onClick={() => handleListItemClick(item.filePath)}>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[{text:'About Us', filePath: '/ReviewAndPay'}, 
        {text:'Help', filePath: '/SeatBooking'}].map((item, index) => (
          <ListItem key={item.text} disablePadding onClick={() => handleListItemClick(item.filePath)}>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

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
            <Button onClick={toggleDrawer('left', true)}>
        <MenuIcon style={{ color: 'white' }}/> {/* Display the menu icon here */}
      </Button>
      <Drawer
        anchor="left" // test
        open={state['left']}
        onClose={toggleDrawer('left', false)}
      >
        {list('left')}
      </Drawer>
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
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Flight Analysis" {...a11yProps(0)} />
          <Tab label="Destination Analysis" {...a11yProps(1)} />
          <Tab label="Booking Analysis" {...a11yProps(2)} />
          <Tab label="Flight Data" {...a11yProps(3)} />
          <Tab label="Revenue Analysis" {...a11yProps(4)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
      
        <div style={{marginLeft: 300}}>
            <div >
                <TextField id="outlined-basic" label="Enter Flight No." variant="outlined" /></div></div>  
                <Button onClick={()=>{
  
                }} style={{marginLeft:700, marginTop:-80}} variant="contained" startIcon={<SearchIcon />}>Search</Button>
                <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            style={{marginBottom:-20}}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 200,
              letterSpacing: '.05rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <div>using this feature you can analysis the statistics for the next immediate flight for the given</div> 
            <div style={{marginTop:25, marginLeft:-1110}}>flight no.</div>
          </Typography>
        
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        
      <div style={{marginLeft: 20}}>
            <div >
                <TextField id="outlined-basic" label="Enter Destination" variant="outlined" /></div></div> 
                <DatePicker 
                    value={departureDate}
                    onChange={(e)=>{
    
                    setDepartureDate(e);
                    console.log(e)}}
                    sx={{marginRight:10, marginLeft:40, marginTop:-7}} label="Form" />
                <DatePicker
                    onChange={(e)=>{
                    setArrivalDate(e);
                    console.log(e)}}
                    sx={{marginTop:-7}} label="Until" /> 
                <Button onClick={()=>{
  
                }} style={{marginLeft:1000, marginTop:-130}} variant="contained" startIcon={<SearchIcon />}>Search</Button>
                <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            style={{marginTop:-23, marginBottom:-50}}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 200,
              letterSpacing: '.05rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <div>using this feature you can analysis the traveling statistics for the given destination for the </div>
            <div style={{marginTop:25, marginBottom:30, marginLeft:-1110}}>given date range.</div>
          </Typography>

      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
                <DatePicker 
                    value={departureDate}
                    onChange={(e)=>{
    
                    setDepartureDate(e);
                    console.log(e)}}
                    sx={{marginRight:10, marginLeft:20}} label="Form" />
                <DatePicker
                    onChange={(e)=>{
                    setArrivalDate(e);
                    console.log(e)}}
                    label="Until" /> 
                <Button onClick={()=>{
  
                }} style={{marginLeft:900, marginTop:-80}} variant="contained" startIcon={<SearchIcon />}>Search</Button>
                <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            style={{marginBottom:-50}}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 200,
              letterSpacing: '.05rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <div>using this feature you can analysis the booking statistics for different passenger types for the </div>
            <div style={{marginTop:25, marginBottom:30, marginLeft:-1133}}>given date range.</div>
          </Typography>

      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        
      <div style={{marginLeft: 200}}>
            <div >
                <TextField id="outlined-basic" label="Enter Origin" variant="outlined" />
            </div>
      </div>  
      <div style={{marginLeft: 500, marginTop:-55}}>
            <div >
                <TextField id="outlined-basic" label="Enter Destination" variant="outlined" />
            </div>
      </div> 
                <Button onClick={()=>{
  
                }} style={{marginLeft:900, marginTop:-80}} variant="contained" startIcon={<SearchIcon />}>Search</Button>
                <div><Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            style={{marginBottom:-20}}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 200,
              letterSpacing: '.05rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            using this feature you can access in depth travel statistics for the given route.
          </Typography></div>

      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Flight Type</StyledTableCell>
            <StyledTableCell align="right">Fleet Size</StyledTableCell>
            <StyledTableCell align="right">No. of Flights&nbsp;(weekly)</StyledTableCell>
            <StyledTableCell align="right">Revenue&nbsp;(millions)</StyledTableCell>
            <StyledTableCell align="right">Profit&nbsp;(millions)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </CustomTabPanel>
      </Paper>
    </Box>
</div>
  );
}
