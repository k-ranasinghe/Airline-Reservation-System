-- testing 
use finalBAirline;
select * from flight natural join route order by  DepartureDateTime ;
select * from passenger;
select * from   seat where SeatID=308 ;
select * from booking ;
select * from payment;
select * from registeredUser;

