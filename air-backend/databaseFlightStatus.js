import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();


const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE

}).promise();


export async function getFlightStatus(currentDate) {
    console.log("current dATE", currentDate);
    // const result = await pool.query('SELECT delay.FlightID, delay.DelayTime, delay.isArrival, flight.FlightNumber FROM delay JOIN flight ON delay.flightID =flight.FlightID WHERE flight.DepartureDateTime like ? OR flight.ArrivalDateTime like ?', [currentDate + '%', currentDate + '%']);
    const result = await pool.query('SELECT delay.FlightID, delay.DelayTime, flight.FlightNumber, route.Origin, route.Destination, flight.DepartureDateTime, flight.ArrivalDateTime FROM delay RIGHT JOIN flight ON delay.flightID = flight.FlightID JOIN route ON flight.FlightNumber = route.FlightNumber  WHERE flight.DepartureDateTime like ? ORDER BY flight.DepartureDateTime', [currentDate + '%', currentDate + '%']);
    console.log(result);
    return result;
}


export default pool;

