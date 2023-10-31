import * as React from 'react';
import img from '../image/airline.jpg';
import Box from '@mui/material/Box';
import { Paper } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";

import isAdmin from '../utils/utils.js';


import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axios from 'axios';


import { useNavigate } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';







const defaultTheme = createTheme();

export default function FlightStatus() {

    // const [currentDate, setCurrentDate] = useState({});
    const [currentDate, setCurrentDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [delayDetails, setDelayDetails] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (isAdmin()) {
            setShowForm(true);
        }
    }, []); // Run this effect only once when the component mounts

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    // function handleChange(event) {
    //     setDelayDetails({ ...delayDetails, [event.target.name]: event.target.value });
    //     // console.log("passenegers",registrationDetails);

    // }

    // const handleChange = (event) => {
    //     const { name, value, type, checked } = event.target;
    //     const newValue = type === 'checkbox' ? checked : value;

    //     setDelayDetails({
    //         ...delayDetails,
    //         [name]: newValue,
    //     });
    // };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        // 
        // Use a conditional to handle the 'flightID' field
        const newValue =
            name === 'flightID'
                ? parseInt(value, 10) // Parse the value as an integer
                : type === 'checkbox'
                    ? checked
                    : value;
        console.log("int value", parseInt(value, 10))
        setDelayDetails({
            ...delayDetails,
            [name]: newValue,
        });
    };

    function saveDelay() {
        console.log("saving delay details");
        try {
            console.log("delayDetails", delayDetails);
            axios.post("/flightStatus/addFlightDelay", {
                delayDetails: delayDetails,
            }).then((response) => {
                console.log("response", response);

            })
        } catch {

        }

    };

    const formatTime = (dateTimeString) => {
        if (!dateTimeString) return ''; // Handle null or missing values
        const date = new Date(dateTimeString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    const FlightStatusTable = ({ data }) => {
        return (
            <Table style={{ border: '2px solid black' }}>
                <TableHead>
                    <TableRow style={{ borderBottom: '2px solid black' }}>
                        <TableCell><b>Flight Number</b></TableCell>
                        <TableCell><b>Origin</b></TableCell>
                        <TableCell><b>Destination</b></TableCell>
                        <TableCell><b>Delay Time</b></TableCell>
                        <TableCell><b>Departure Time</b></TableCell>
                        <TableCell><b>Arrival Time</b></TableCell>
                        {/* <TableCell>Arrival</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.FlightID} style={{ borderBottom: '2px solid black' }}>
                            <TableCell>{row.FlightNumber}</TableCell>
                            <TableCell>{row.Origin}</TableCell>
                            <TableCell>{row.Destination}</TableCell>
                            <TableCell>
                                <span style={{ color: row.DelayTime === null ? 'green' : 'red' }}>
                                    {row.DelayTime === null ? 'On Time' : row.DelayTime}
                                </span>
                            </TableCell>
                            <TableCell>{formatTime(row.DepartureDateTime)}</TableCell>
                            <TableCell>{formatTime(row.ArrivalDateTime)}</TableCell>
                            {/* <TableCell>{row.isArrival ? 'Yes' : 'No'}</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    };


    const fetchData = async (currentDate) => {
        try {
            let date = new Date(currentDate);
            // const response = await axios.get(`http://localhost:5000//flightStatus?currentDate=${currentDate}`);
            const response = await axios.get("http://localhost:5000/flightStatus?currentDate=" + date.toISOString().slice(0, 10));
            console.log(response, "reposne")
            setData(response.data); // Assuming your API returns an array of flight status data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        // Fetch data when the component mounts
        fetchData(currentDate);
    }, [currentDate]);

    return (
        <div>
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
                }}>

                {/* <div>hello</div> */}
                {/* <div>
                    <TextField
                        id="outlined-basic"
                        label="Outlined"
                        variant="outlined"
                    />

                </div> */}
                <div>
                    {showForm ? (
                        <div>
                            <form>
                                <TextField
                                    name="flightID"
                                    label="Flight ID"
                                    fullWidth
                                    type='number'
                                    value={delayDetails.flightID}
                                    onChange={handleChange}
                                />
                                <TextField
                                    name="delayTime"
                                    label="Delay Time"
                                    fullWidth
                                    value={delayDetails.delayTime}
                                    onChange={handleChange}
                                />
                                {/* <TextField
                                    name="isArrival"
                                    label="Is Arrival"
                                    type="checkbox"
                                    checked={delayDetails.isArrival}
                                    onChange={handleChange}
                                /> */}
                            </form>
                            <button
                                type="submit"
                                onClick={() => {
                                    saveDelay();
                                    navigate('/flightStatus',

                                    )
                                }}

                            >Submit</button>
                        </div>

                    ) : (
                        <p>You do not have permission to edit the data.</p>
                    )}

                </div>

                <FlightStatusTable data={data} />


            </Box>


        </div>
    )
}

// const FlightStatusTable = ({ data }) => {
//     return (
//         <Table>
//             <TableHead>
//                 <TableRow>
//                     <TableCell>Flight Number</TableCell>
//                     <TableCell>Delay Time</TableCell>
//                     <TableCell>Arrival</TableCell>
//                 </TableRow>
//             </TableHead>
//             <TableBody>
//                 {data.map((row) => (
//                     <TableRow key={row.FlightID}>
//                         <TableCell>{row.FlightNumber}</TableCell>
//                         <TableCell>{row.DelayTime}</TableCell>
//                         <TableCell>{row.isArrival ? 'Yes' : 'No'}</TableCell>
//                     </TableRow>
//                 ))}
//             </TableBody>
//         </Table>
//     );
// };

// const FlightStatus = () => {
//     const [currentDate, setCurrentDate] = useState(new Date());
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             const response = await axios.get('/flightStatus', {
//                 params: {
//                     currentDate,
//                 },
//             });

//             setData(response.data);
//         };

//         fetchData();
//     }, [currentDate]);

//     return (
//         <div>
//             <FlightStatusTable data={data} />
//         </div>
//     );
// };

// export default FlightStatus;
