export  default function isAdmin(){
     let userDetails=JSON.parse(localStorage.getItem("userDetails"));
     return userDetails.UserType=='Admin'?true:false;
}

export   function isGuest(){
    let userName= localStorage.getItem("userName")
    return userName==''?false:true;
}