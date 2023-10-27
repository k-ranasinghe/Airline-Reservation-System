import express from "express";


import { createBooking, createGuestUser, createPassenger, createPayment, getAirportLocation, getAriports, getBookingById, getBussinessSeatsFromDB, getEconomySeatsFromDB, getFlightsFromDB, getFlightsWithPricesFromDB, getPlatinumSeatsFromDB, updateBooking } from "../../air-backend/database.js";
import requireAuth from "../utils/authentication.js";
import main from "../mailer.js";
var router = express.Router();



// router.get("*",requireAuth)
router.get("/test/cookie", (req, res) => {
    console.log("reqest", req)
    res.cookie("new-user", false);
    res.send("cookie set");
});

router.get('/flight', async (req, res) => {

    console.log("request", req);
    // console.log(req.query.from, req.query.to, req.query.departureDate); 
    const result = await getFlightsWithPricesFromDB(req.query.from, req.query.to, req.query.departureDate);
    // res.cookie('new-user',false)

    res.send(result);
    console.log("reqest", req.cookies)
});

router.get('/seatList', async (req, res) => {

    const Platinum = await getPlatinumSeatsFromDB(req.query.flightId);
    const Business = await getBussinessSeatsFromDB(req.query.flightId);
    const Economy = await getEconomySeatsFromDB(req.query.flightId);
    const result = { "Platinum": Platinum, "Business": Business, "Economy": Economy };
    res.send(result);
}
);

router.get('/aiportLocation', async (req, res) => {
    console.log("request", req);
    const result = await getAirportLocation(req.query.origin, req.query.destination);
    res.send(result);
}
);

router.get('/airports', async (req, res) => {
    console.log("request", req);
    const result = await getAriports();
    res.send(result);
}
);
router.post('/bookTicket', async (req, res) => {
    console.log("request", req.body);
    let passenger_id = null
    let geust_id = null
    if (req.body.isGuest) {
        const geust_id = await createGuestUser(req.body.flight, req.body.passengerDetails);
        console.log("guest", geust_id);
        passenger_id = await createPassenger('Guest', null, geust_id);

    } else {
        passenger_id = await createPassenger('Registered', req.body.userID, null);

    }



    console.log("passenger", passenger_id);

    const booking_id = await createBooking(req.body.flight, passenger_id, req.body.seat, 0);
    console.log("booking", booking_id);
    const booking = await getBookingById(booking_id);

    res.send({ "booking_id": booking, "guest_id": geust_id });

    // const Passenger = await createPassenger(req.query.passengerDetails);
}
)
router.post('/createPayment', async (req, res) => {
    console.log("request", req.body);


    const result = await updateBooking(req.body.bookingId);
    const payment = await createPayment(req.body.bookingId, req.body.passengerID);
    console.log("payment", payment);
    console.log("body", req.body)
    main(req.body.passengerDetails[0], req.body.flight[0], req.body.seat[0])

    res.send(payment);

    // const Passenger = await createPassenger(req.query.passengerDetails);
}

);

export default router;