import express from "express";
import {createRegistrant} from "../../air-backend/databaseSignUp.js"
var router = express.Router();

router.post('/insertSignUp', async(req,res) => {
    console.log("request",  req.body);
    const registration_id = await createRegistrant(req.body.registrationDetails);
})

export default router;