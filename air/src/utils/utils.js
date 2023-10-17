export  default function isAdmin(){
     let userDetails=JSON.parse(localStorage.getItem("userDetails"));
     return true ;
}

export   function isGuest(){
    let userName= localStorage.getItem("userName")
    return userName==''?false:true;
}