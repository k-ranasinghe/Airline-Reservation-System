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

// flightinfo 
export async function getFlightData0 (flightnumber){
    console.log(flightnumber)
    const result =await pool.query('SELECT flightid, flightnumber, aircraftid, DepartureDateTime FROM flight WHERE flightnumber like ? limit 1', [flightnumber])   
    console.log(result[0])
    return result[0];
}

// flightdata for passenger age > 18
export async function getFlightData1 (flightnumber){
    console.log(flightnumber)
    const result =await pool.query('CREATE VIEW immflight1 AS SELECT flightid, aircraftid, departuredatetime FROM flight WHERE flightnumber like ? limit 1', [flightnumber])
    const result1 =await pool.query('SELECT @rownum:=@rownum+1 AS ID, seatid, booking.PassengerID AS passengerid, firstname, lastname, passportnumber, dateofbirth, contactnumber1, ContactNumber2 FROM immflight1 JOIN booking ON immflight1.flightid = booking.flightid JOIN passenger ON booking.passengerid = passenger.passengerid JOIN registereduser ON passenger.userid = registereduser.userid , (SELECT @rownum:=0) r WHERE DateOfBirth < DATE_SUB(NOW(), INTERVAL 18 YEAR) UNION SELECT @rownum:=@rownum+1 AS ID, seatid, booking.PassengerID AS passengerid, firstname, lastname, passportnumber, dateofbirth, contactnumber1, ContactNumber2 FROM immflight1 JOIN booking ON immflight1.flightid = booking.flightid JOIN passenger ON booking.passengerid = passenger.passengerid JOIN guest ON passenger.guestid = guest.guestid , (SELECT @rownum:=0) r WHERE DateOfBirth < DATE_SUB(NOW(), INTERVAL 18 YEAR);')
    const result2 =await pool.query('drop view immflight1')    
    console.log(result1[0])
    return result1[0];
}

// flightdata for passenger age < 18
export async function getFlightData2 (flightnumber){
    console.log(flightnumber)
    const result =await pool.query('CREATE VIEW immflight1 AS SELECT flightid, aircraftid, departuredatetime FROM flight WHERE flightnumber like ? limit 1', [flightnumber])
    const result1 =await pool.query('SELECT @rownum:=@rownum+1 AS ID, seatid, booking.PassengerID AS passengerid, firstname, lastname, passportnumber, dateofbirth, contactnumber1, ContactNumber2 FROM immflight1 JOIN booking ON immflight1.flightid = booking.flightid JOIN passenger ON booking.passengerid = passenger.passengerid JOIN registereduser ON passenger.userid = registereduser.userid , (SELECT @rownum:=0) r WHERE DateOfBirth > DATE_SUB(NOW(), INTERVAL 18 YEAR) UNION SELECT @rownum:=@rownum+1 AS ID, seatid, booking.PassengerID AS passengerid, firstname, lastname, passportnumber, dateofbirth, contactnumber1, ContactNumber2 FROM immflight1 JOIN booking ON immflight1.flightid = booking.flightid JOIN passenger ON booking.passengerid = passenger.passengerid JOIN guest ON passenger.guestid = guest.guestid , (SELECT @rownum:=0) r WHERE DateOfBirth > DATE_SUB(NOW(), INTERVAL 18 YEAR);')
    const result2 =await pool.query('drop view immflight1')    
    console.log(result1[0])
    return result1[0];
}

export async function getDestinationData (Destination, fromDate, toDate){
    console.log(Destination, fromDate, toDate)
    const result =await pool.query('SELECT booking.flightid as flightid, flightnumber, aircraftid, COUNT(*) as passengers, ArrivalDateTime FROM booking join flight on (flight.flightid = booking.flightid) WHERE booking.flightid IN (SELECT flight.flightid FROM flight JOIN route ON flight.flightnumber = route.flightnumber WHERE route.destination LIKE ? AND flight.ArrivalDateTime BETWEEN ? AND ?) GROUP BY flightid', [Destination, fromDate+'%', toDate+'%'])    
    console.log(result[0])
    return result[0];
}

export async function getDestinationTotal (Destination, fromDate, toDate){
    console.log(Destination, fromDate, toDate)
    const result =await pool.query('SELECT SUM(subquery.passengers) as total_passengers FROM ( SELECT booking.flightid as flightid, flightnumber, aircraftid, COUNT(*) as passengers, ArrivalDateTime FROM booking join flight on (flight.flightid = booking.flightid) WHERE booking.flightid IN (SELECT flight.flightid FROM flight JOIN route ON flight.flightnumber = route.flightnumber WHERE route.destination LIKE ? AND flight.ArrivalDateTime BETWEEN ? AND ?) GROUP BY flightid ) as subquery', [Destination, fromDate+'%', toDate+'%'])    
    console.log(result[0])
    return result[0];
}

export async function getPassengerDataGold (fromDate, toDate){
    console.log(fromDate, toDate)
    const result =await pool.query('select passenger.passengerid as passengerid, registereduser.firstname as firstname, registereduser.lastname as lastname, registereduser.nationality as nationality, registereduser.passportnumber as passportnumber from passenger join registereduser on (passenger.userid = registereduser.userid) join booking on (passenger.passengerid = booking.PassengerID) join payment on (payment.bookingid = booking.bookingid) where usertype like "gold" AND timestamp BETWEEN ? AND ?', [fromDate+'%', toDate+'%'])    
    console.log(result[0])
    return result[0];
}

export async function getPassengerDataFrequent (fromDate, toDate){
    console.log(fromDate, toDate)
    const result =await pool.query('select passenger.passengerid as passengerid, registereduser.firstname as firstname, registereduser.lastname as lastname, registereduser.nationality as nationality, registereduser.passportnumber as passportnumber from passenger join registereduser on (passenger.userid = registereduser.userid) join booking on (passenger.passengerid = booking.PassengerID) join payment on (payment.bookingid = booking.bookingid) where usertype like "frequent" AND timestamp BETWEEN ? AND ?', [fromDate+'%', toDate+'%'])    
    console.log(result[0])
    return result[0];
}

export async function getPassengerDataGuest (fromDate, toDate){
    console.log(fromDate, toDate)
    const result =await pool.query('SELECT passenger.passengerid as passengerid, firstname, lastname, nationality, passportnumber FROM Passenger JOIN Guest ON (Passenger.GuestID = Guest.GuestID) join booking on (passenger.passengerid = booking.PassengerID) join payment on (payment.bookingid = booking.bookingid) WHERE timestamp BETWEEN ? AND ?', [fromDate+'%', toDate+'%'])    
    console.log(result[0])
    return result[0];
}

export async function getPassengerDataTotal (fromDate, toDate){
    console.log(fromDate, toDate)
    const result =await pool.query('SELECT (SELECT COUNT(*) FROM Passenger JOIN RegisteredUser ON (Passenger.UserID = RegisteredUser.UserID) JOIN Booking ON (Passenger.PassengerID = Booking.PassengerID) JOIN Payment ON (Payment.BookingID = Booking.BookingID) WHERE UserType LIKE "gold" AND Timestamp BETWEEN ? AND ?) AS Gold, (SELECT COUNT(*) FROM Passenger JOIN RegisteredUser ON (Passenger.UserID = RegisteredUser.UserID) JOIN Booking ON (Passenger.PassengerID = Booking.PassengerID) JOIN Payment ON (Payment.BookingID = Booking.BookingID) WHERE UserType LIKE "frequent" AND Timestamp BETWEEN ? AND ?) AS Frequent, (SELECT COUNT(*) FROM Passenger JOIN Guest ON (Passenger.GuestID = Guest.GuestID) JOIN Booking ON (Passenger.PassengerID = Booking.PassengerID) JOIN Payment ON (Payment.BookingID = Booking.BookingID) WHERE Timestamp BETWEEN ? AND ?) AS Guest', [fromDate+'%', toDate+'%', fromDate+'%', toDate+'%', fromDate+'%', toDate+'%'])
    console.log(result[0])
    return result[0];
}

export async function getRouteData (origin, Destination){
    console.log(origin, Destination)
    const result =await pool.query('SELECT flight.flightid, flight.aircraftid, flight.DepartureDateTime, flight.ArrivalDateTime, (SELECT COUNT(*) FROM Booking WHERE Booking.FlightID = flight.FlightID) AS PassengerCount FROM flight JOIN route ON flight.flightnumber = route.flightnumber WHERE route.origin LIKE ? AND route.destination LIKE ? AND flight.ArrivalDateTime < now()', [origin, Destination])    
    console.log(result[0])
    return result[0];
}

export async function getRouteInfo (origin, Destination){
    console.log(origin, Destination)
    const result =await pool.query('select flight.FlightNumber as flightnumber, duration from flight join route on (flight.flightnumber = route.flightnumber) where origin like ? and Destination like ? limit 1', [origin, Destination])    
    console.log(result[0])
    return result[0];
}

export async function getRouteTotal (origin, Destination){
    console.log(origin, Destination)
    const result =await pool.query('SELECT COUNT(*) as totalcount FROM Booking join flight on (Booking.FlightID = flight.FlightID) join route on (flight.flightnumber = route.FlightNumber) where origin like ? and Destination like ? and ArrivalDateTime < now()', [origin, Destination])    
    console.log(result[0])
    return result[0];
}

export async function getModelRevenue (){
    const result =await pool.query('SELECT m.Model AS Model, COUNT(DISTINCT a.AircraftID) AS FleetSize, COUNT(DISTINCT f.FlightID) AS TotalFlights, ROUND(SUM(p.PlatinumPrice * m.PlatinumSeats + p.BusinessPrice * m.BusinessSeats + p.EconomyPrice * m.EconomySeats) / 1000000, 4) AS Revenue FROM Model m LEFT JOIN Aircraft a ON m.Model = a.Model LEFT JOIN Flight f ON a.AircraftID = f.AircraftID LEFT JOIN Price p ON f.FlightID = p.FlightID GROUP BY m.Model')    
    console.log(result[0])
    return result[0];
}

export async function getTotalRevenue (){
    const result =await pool.query('SELECT SUM(NumberOfAircrafts) AS TotalFleetSize, SUM(NumberOfFlights) AS TotalFlights, ROUND(SUM(TotalRevenueInMillions), 4) AS TotalRevenue FROM ( SELECT m.Model AS Model, ROUND(SUM(p.PlatinumPrice * m.PlatinumSeats + p.BusinessPrice * m.BusinessSeats + p.EconomyPrice * m.EconomySeats) / 1000000, 4) AS TotalRevenueInMillions, COUNT(DISTINCT a.AircraftID) AS NumberOfAircrafts, COUNT(DISTINCT f.FlightID) AS NumberOfFlights FROM Model m LEFT JOIN Aircraft a ON m.Model = a.Model LEFT JOIN Flight f ON a.AircraftID = f.AircraftID LEFT JOIN Price p ON f.FlightID = p.FlightID GROUP BY m.Model) AS Subquery')    
    console.log(result[0])
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



