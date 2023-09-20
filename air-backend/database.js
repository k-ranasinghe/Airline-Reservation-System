import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

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
    const result=await pool.query(`select * from  flight where desitination ='${from}' and origin ='${to}' and departure like '%${departureDate}%'`);
    console.log(result[0])
    return result[0];
}



export async function bookTicket(flight,passengerDetails,seat){

    const result=await pool.query(`insert into ticket (flight_id,passenger_id,seat_id) values (${flight.flight_id},${passengerDetails.passenger_id},${seat.seat_id})`);
}

// const result1=await getAibusList();
// console.log(result1);
// const result2=await getAibusById("Bog-737-1");
// console.log(result2);
// const result3=await createAibus(3,'A380');
// console.log(result3);
getFlightsFromDB('BIA','MAA','2023-09-11');
export default pool;



