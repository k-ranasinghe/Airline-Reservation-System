import * as React from 'react';
import img from '../image/airline.jpg';
import Box from '@mui/material/Box';
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";


import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axios from 'axios';




import { createTheme, ThemeProvider } from '@mui/material/styles';







const defaultTheme = createTheme();

export default function FlightStatus() {

    // const [currentDate, setCurrentDate] = useState({});
    const [currentDate, setCurrentDate] = useState(new Date());
    const [data, setData] = useState([]);

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
                                <span style={{ color: row.DelayTime === null ? 'green' : 'black' }}>
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
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 50,
                        width: "60%",
                        minHeight: 200,
                        borderRadius: '1rem'
                    },
                    backgroundImage: `url(${img})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPositionY: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                {/* <div>hello</div> */}
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
