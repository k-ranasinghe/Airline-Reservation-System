import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import img from '../image/airline.jpg';
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";




export default function SignIn() {
  const [loginDetails, setLoginDetails] = useState({});
  const navigate = useNavigate();

  function handleChange(event){
    setLoginDetails({...loginDetails, [event.target.name]: event.target.value});
    console.log(loginDetails);

  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  function authenticate(){
    console.log("Login in process");
    try{
      console.log(loginDetails);
      axios.post("/signUp/checkPassword",{
        loginDetails: loginDetails,
      }).then((response)=>{
        console.log(response);
        if(response.data.Login){
          navigate('/');
        }else if(response.data.Login){
          alert("Invalid Credentials");
        }
      })
    }catch{
      
    }
    
  };
 
  return (

    
  
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 50,
          width: "60%",
          minHeight: 200,
          borderRadius: '1rem'
        },
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPositionY: 'center',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Paper elevation={3} style={{
        padding: 8,
        minWidth: 300,
        borderRadius: 0,
      }}>

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              marginBottom: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
              
              <TextField
              onChange={handleChange}
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
              onChange={handleChange}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 1 }}
                onClick={() => {
                  authenticate();
                  // navigate('/')
                }}
              >
                Log In
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2, backgroundColor: 'green'}}
                onClick={() => {
                  // authenticate()
                  navigate('/')
                }}
              >
                Continue as Guest
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="http://localhost:3000/signUpPage" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Paper>
    </Box>

    
  );
}








// //{/* <TextField
//               onChange={handleChange}
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//                 autoFocus
//               /> */}
















