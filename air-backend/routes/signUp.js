import express from "express";
import {createRegistrant} from "../../air-backend/databaseSignUp.js"
import bcrypt from  'bcrypt'
var router = express.Router();
const salt = 10;

router.post('/insertSignUp', async(req,res) => {
    console.log("request",  req.body);
    bcrypt.hash(req.body.registrationDetails.password.toString(), salt,async function (err, hash) {
        if(err){
            console.log(err);
        }
        else{
            req.body.registrationDetails.password = hash;
            const registration_id = await createRegistrant(req.body.registrationDetails);
            res.send(registration_id);


        }
    }); 
})

export default router;