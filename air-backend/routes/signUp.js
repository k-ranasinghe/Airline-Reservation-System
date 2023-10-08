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
    const result = await checkPasswordfromDB(req.body.loginDetails);
    try{
        bcrypt.compare(req.body.loginDetails.password.toString(), result[0][0].Password,(err,response)=>{
            if(err){
                console.log("not found");
                console.log(err);
            }
            else{
                if(response){
                    res.send({Login:true});
                }
                else{
                    res.send({Login:false});
                }
            }
        })
    }catch{
        console.log("notfound");
    }
    
});
export default router;

