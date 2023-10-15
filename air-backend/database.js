import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();



const FLIGHT='Flight';

const pool=mysql.createPool({
    host: process.env.MYSQL_HOST, 
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE

}).promise();

export async function getAibusList(){
    const result =await pool.query('SELECT * FROM airbus');
    return result[0];
}

export async function getAibusById(id){
    const result =await pool.query('SELECT * FROM airbus WHERE id=?',[id]);
    return result[0];
}
export async function createAibus(ID ,Name){
    const result =await pool.query('INSERT INTO airbus (ID,type) values (?, ?)',[ID,Name]);
    return result[0];
};

export async function getFlightsFromDB (from,to,departureDate){
    // console.log(new Date(departureDate).toISOString().slice(0,10))
    console.log(from,to,departureDate)
    // const result=await pool.query(`select * from  ${FLIGHT} where desitination ='${from}' and origin ='${to}' and departure like '%${departureDate}%'`);
    const result =await pool.query('select * from Flight inner join Route  using (FlightNumber)  where Origin=? and Destination=? and DepartureDateTime like ?',[from,to,departureDate+'%'])
    console.log(result[0])
    return result[0];
}

export async function getFlightsWithPricesFromDB (from,to,departureDate){
    // console.log(new Date(departureDate).toISOString().slice(0,10))
    // console.log(from,to,departureDate)
    // const result=await pool.query(`select * from  ${FLIGHT} where desitination ='${from}' and origin ='${to}' and departure like '%${departureDate}%'`);
    const result =await pool.query('select * from Flight inner join Route on Flight.FlightNumber=Route.FlightNumber inner join Price on Price.FlightId=Flight.FlightId where Origin=? and Destination=? and DepartureDateTime like ?',[from,to,departureDate+'%'])
    // console.log(result[0])
    return result[0];
}

export async function getEconomySeatsFromDB (flightId){
    const result =await pool.query('select * from Seat where FlightId=? and TravelClass="Economy"',[flightId])
    return result[0];
}

export async function getPlatinumSeatsFromDB (flightId){
    const result =await pool.query('select * from Seat where FlightId=? and TravelClass="Platinum"',[flightId])
    return result[0];
}
export async function getBussinessSeatsFromDB (flightId){
    const result =await pool.query('select * from Seat where FlightId=? and TravelClass="Business"' ,[flightId])
    return result[0];
}

export async function getBookingById(id){
    const result =await pool.query('select * from Booking inner join Flight on Flight.FlightID = Booking.FlightID inner join Passenger on Passenger.PassengerID =Booking.PassengerID inner join Seat on Seat.SeatID=Booking.SeatID where BookingID=?',[id])
    return result[0];
}

export async function getAirportLocation(origin,desitination){
    const result =await pool.query('select  countrynew.locationname as countryname, statenew.locationname as statename, citynew.locationname as cityname, airportcode, airportname from countrynew  left join statenew on (countrynew.LocationId = statenew.ParentID) join citynew on ((countrynew.LocationID= citynew.ParentID) or (statenew.LocationID= citynew.ParentID)) join Airport on (Airport.CityCode = citynew.LocationID) where Airport.AirportCode=? or Airport.AirportCode=? order by countrynew.locationname asc ; ',[origin,desitination])
    console.log(result[0],origin,desitination)
    return result[0];
}



export async function bookTicket(flight,passengerDetails,seat){

    const result=await pool.query('insert into ticket (flight_id,passenger_id,seat_id) values (${flight.flight_id},${passengerDetails.passenger_id},${seat.seat_id})');
}


export async function createPassenger( passengerType, userID,GuestID){
   let result=[]
   console.log("passengerType",passengerType,userID,GuestID);
    if(passengerType=='Guest'){
         result =await pool.query('insert into Passenger ( PassengerType,UserID, GuestID ) values ("Guest",NULL,?); ',[GuestID])
    }
    if(passengerType=='Registered'){
         result =await pool.query('insert into Passenger ( PassengerType,UserID, GuestID ) values ("Registered",?,NULL); ',[userID])
    }

    
    
    console.log(result[0].insertId)
    return result[0].insertId;
}



export async function createGuestUser( flight, passengerDetails){
    console.log( "flight", flight)
    console.log("passenger", passengerDetails);
    const result =await pool.query('insert into Guest(FirstName,LastName, Nationality,PassportNumber ,DateOfBirth ,ContactNumber1,ContactNumber2, EmailAddress  ) values ( "?","?",?,?,?,?,?,?); ',[passengerDetails.firstName,passengerDetails.lastName,'Sri lankan','20343434','2001-07-12','0774077017', '0774077017',passengerDetails.emailAddress,'1'])
    console.log(result[0].insertId)
    return result[0].insertId;
}


export async function createBooking (flight,passenger_id,seat,paymentStatus){
    console.log("seat",seat)

    
    const result =await pool.query('insert into Booking (FlightId,PassengerID, SeatID, PaymentStatus) values ( "?","?","?",?);',[flight.FlightID,passenger_id,seat,paymentStatus])
    /// udpate seat availability
    const result1 =await pool.query('update Seat set Availability=0 where SeatID=?',[seat])
    
    return result[0].insertId;
}

export async function createPayment (booking_id,PassengerID ){
    console.log( "date", new Date().toISOString().slice(0, 19).replace('T', ' '))
    const payment=await pool.query('UPDATE UserBookingCount SET bookingCount = bookingCount + 1 WHERE UserID =  ( select UserID from  Passenger where PassengerID=?);',[PassengerID])
    const result =await pool.query('insert into Payment (BookingID ,TimeStamp,PassengerID) values ( "?" ,?,"?");',[booking_id, new Date().toISOString().slice(0, 19).replace('T', ' '),PassengerID])
    return result
}


export async function getAriports(){
    const result =await pool.query('select  countrynew.locationname as countryname, statenew.locationname as statename, citynew.locationname as cityname, airportcode, airportname from countrynew  left join statenew on (countrynew.LocationId = statenew.ParentID) join citynew on ((countrynew.LocationID= citynew.ParentID) or (statenew.LocationID= citynew.ParentID)) join Airport on (Airport.cityCode = citynew.LocationID)  order by countrynew.locationname asc ; ')


    return result[0];
}

export async function updateBooking(booking_id){    
    const result =await pool.query('update Booking set PaymentStatus=1 where BookingID=?',[booking_id])
    return result[0];
}

export async function insertUserBooking(userId,bookingID){
    const result =await pool.query('insert into UserBooking (UserID,BookingID) values (?,?)',[userId,bookingID])
    return result[0];
}

    
// const result1=await getAibusList();
// console.log(result1);
// const result2=await getAibusById("Bog-737-1");
// console.log(result2);
// const result3=await createAibus(3,'A380');
// console.log(result3);

// getFlightsWithPricesFromDB('DEL','CGK','2023-09-29');
// getSeatsFromDB(525)
export default pool;



