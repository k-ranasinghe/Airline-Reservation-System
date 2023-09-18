import express from 'express';
import { getAibusList, getAibusById, createAibus, getFlightsFromDB } from './database.js';
const app = express();
const port = 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/airbus', async (req, res) => {
    const result = await getAibusList();
    res.send(result);
});
app.get('/airbus/:id', async (req, res) => {    
    const result = await getAibusById(req.params.id);
    res.send(result);
})
app.post('/airbus', async (req, res) => {
    const result = await createAibus(req.body.ID, req.body.Name);
    res.send(result);
})    

app.get('/flight', async (req, res) => {   
    console.log("request",  req.query.to);
    console.log(req.query.from, req.query.to, req.query.departureDate); 
    const result = await getFlightsFromDB(req.query.from, req.query.to, req.query.departureDate);
    res.send(result);
})  ;

