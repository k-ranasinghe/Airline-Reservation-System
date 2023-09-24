import express from "express";
import { createBooking, createPassenger, createPayment, getAirportLocation, getAriports, getBookingById, getBussinessSeatsFromDB, getEconomySeatsFromDB, getFlightsFromDB, getFlightsWithPricesFromDB, getPlatinumSeatsFromDB, updateBooking } from "../../air-backend/database.js";
var router = express.Router();


router.get('/flight', async (req, res) => {   
    console.log("request",  req);
    console.log(req.query.from, req.query.to, req.query.departureDate); 
    const result = await getFlightsWithPricesFromDB(req.query.from, req.query.to, req.query.departureDate);

    res.send(result);
})  ;

router.get('/seatList', async (req, res) => {
    console.log("request",  req);
    console.log(" req.query",req.query.flightId);
    const Platinum = await getPlatinumSeatsFromDB(req.query.flightId);
    const Business =await getBussinessSeatsFromDB(req.query.flightId);
    const Economy =await getEconomySeatsFromDB(req.query.flightId);
    const result={"Platinum":Platinum ,"Business":Business, "Economy": Economy};
    res.send(result);
}
);

router.get('/aiportLocation', async (req, res) => {
    console.log("request",  req);
    const result = await getAirportLocation(req.query.origin, req.query.destination);
    res.send(result);
}
);

router.get('/airports', async (req, res) => {
    console.log("request",  req);
    const result = await getAriports();
    res.send(result);
}
);
router.post ('/bookTicket', async (req, res) => {
    console.log("request",  req.body);
    const passenger_id = await createPassenger(req.body.flight,  req.body.passengerDetails);
    console.log("passenger",  passenger_id);

    const booking_id = await createBooking(req.body.flight,passenger_id, req.body.seat,0);
    console.log("booking",  booking_id);
    const booking =await getBookingById(booking_id);

    res.send(booking);

    // const Passenger = await createPassenger(req.query.passengerDetails);
}
)
router.post ('/createPayment', async (req, res) => { 
    console.log("request",  req.body);

    const result = await updateBooking(req.body.bookingId);
    const payment = await createPayment(req.body.bookingId);
    console.log("payment",  payment);
    

    res.send(payment);

    // const Passenger = await createPassenger(req.query.passengerDetails);
}

);

export default router;