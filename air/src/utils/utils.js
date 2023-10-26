export  default function isAdmin(){
    console.log("userName",localStorage.getItem("userName"))
    if(localStorage.getItem("userName")){

     let userDetails=localStorage.getItem("userName");
     return userDetails==='admin'?true:false;
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