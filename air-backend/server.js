import express from 'express';
import router1 from './routes/booking.js';
import router2 from './routes/signUp.js';
import router3 from './routes/flightStatus.js';

import cors from "cors";



const app = express();
const port = 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.use(express.json());

app.use(cors());

app.use('/booking', router1);
app.use('/signUp', router2);
app.use('/flightStatus', router3);
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

//I commented from here
// app.get('/', (req, res) => res.send('Hello World!'));
// app.get('/airbus', async (req, res) => {
//     const result = await getAibusList();
//     res.send(result);
// });
// app.get('/airbus/:id', async (req, res) => {
//     const result = await getAibusById(req.params.id);
//     res.send(result);
// })
// app.post('/airbus', async (req, res) => {
//     const result = await createAibus(req.body.ID, req.body.Name);
//     res.send(result);
// })






// app.get('/flight', async (req, res) => {
//     console.log("request",  req);
//     console.log(req.query.from, req.query.to, req.query.departureDate);
//     const result = await getFlightsFromDB(req.query.from, req.query.to, req.query.departureDate);
//     res.send(result);
// })  ;

