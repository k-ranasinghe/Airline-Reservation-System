export  default function isAdmin(){
     let userDetails= localStorage.getItem("userDetails")
     return userDetails.UserType=='ADMIN'?true:false;
}

export   function isGuest(){
    let userName= localStorage.getItem("userName")
    return userName==''?false:true;
}