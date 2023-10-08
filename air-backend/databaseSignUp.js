import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();


const pool=mysql.createPool({
    host: process.env.MYSQL_HOST, 
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE

}).promise();

export async function createRegistrant(registrationDetails){ 

    const result = await pool.query('insert into registereduser (Username, Password, FirstName, LastName, Nationality, PassportNumber, UserType, DateOfBirth, ContactNumber, EmailAddress) values (?,?,?,?,?,?,?,?,?,?);',[registrationDetails.userName,registrationDetails.password, registrationDetails.firstName, registrationDetails.lastName, registrationDetails.country, registrationDetails.passportNumber, 'Gold' , '2002-07-09' ,registrationDetails.number,registrationDetails.email])
    console.log(result[0])
    return result[0];
}

export async function checkPasswordfromDB(loginDetails){
    try{
        const result = await pool.query('select count(Username) as count from registereduser where Username = ? and Password = ?',[loginDetails.username, loginDetails.password]);
        console.log(result[0]);
        if(result[0].count=== 1){
            return {Login:true};
        }else{
            return {Login: false};
        
        }
    }catch(error){
        console.error(error);
    }
    
}
export default pool;
