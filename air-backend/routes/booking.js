import express from "express";
import { getFlightsFromDB } from "../../air-backend/database.js";
var router = express.Router();


router.get('/flight', async (req, res) => {   
    console.log("request",  req);
    console.log(req.query.from, req.query.to, req.query.departureDate); 
    const result = await getFlightsFromDB(req.query.from, req.query.to, req.query.departureDate);
    res.send(result);
})  ;


export default router;