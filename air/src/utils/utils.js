export  default function isAdmin(){
    if(localStorage.getItem("UserName")){

     let userDetails=JSON.parse(localStorage.getItem("userDetails"));
     return userDetails.Username=='admin'?true:false;
    }
     return false;
}

export  function isGuest(){
    if(localStorage.getItem("isGuest")){
        return JSON.parse(localStorage.getItem("isGuest"))
        
    }
     return false;
    
}

export  function logout(){
    localStorage.removeItem("passengerDetails")
    localStorage.removeItem("userDetails")
    localStorage.removeItem('guestId')
    localStorage.removeItem("userName")
    localStorage.removeItem("isGuest")
}