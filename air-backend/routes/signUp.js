import express from "express";
import {createRegistrant} from "../../air-backend/databaseSignUp.js"
import {checkPasswordfromDB} from "../../air-backend/databaseSignUp.js"
import bcrypt from  'bcrypt'
var router = express.Router();
const salt = 10;

router.post('/insertSignUp', async(req,res) => {
    console.log("request",  req.body);
    console.log("signup in process")
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
});
router.post('/checkPassword', async(req, res) => {
    console.log("login in process")
    
    bcrypt.hash(req.body.loginDetails.password.toString(), salt,async function (err, hash) {
        if(err){

            console.log(err);
        }
        else{
            req.body.loginDetails.password = hash;
            console.log("request",  req.body);
            const result = await checkPasswordfromDB(req.body.loginDetails);
            res.send(result);
        }
    }); 
    // console.log("request",  req.body);
    // const result = await checkPasswordfromDB(req.body.loginDetails);
    // res.send(result);
});

export default router;