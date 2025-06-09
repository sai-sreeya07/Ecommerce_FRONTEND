import React, { useEffect, useState } from 'react'
import { Button, Grid, Snackbar, TextField,Alert } from '@mui/material'
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, login } from '../../../state/Auth/Action';
import { authReducer } from '../../../state/Auth/Reducer';
function Login() {

    const {auth}=useSelector((store)=>store)
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const jwt=localStorage.getItem("jwt");
  const handleCloseSnakbar=()=>setOpenSnackBar(false);
  
  useEffect(()=>{
    if(jwt){
        dispatch(getUser(jwt));
    }
  },[jwt])


  useEffect(()=>{
    if(auth.user || auth.error) setOpenSnackBar(true);
  },[auth.user]);
  const handleSubmit=(event)=>{
    event.preventDefault();
    const data=new FormData(event.currentTarget);
    const userData={
        email:data.get("email"),
        password:data.get("password")
    };
    dispatch(login(userData));
    console.log("Login Data ",userData);
    console.log(auth.user)
    console.log("Auth",auth)
    console.log("Login Data ", userData.email);

    console.log(auth.user ? auth.user.email : "User not logged in");

}

if (auth.isLoading) {
    return <div>Loading...</div>;
  }

//   if (auth.error) {
//     console.error("Login failed: ", auth.error);
//     setOpenSnackBar(true);
//   } else if (auth.user) {
//     console.log("Login successful: ", auth.user);
//     // Redirect to the home page or another protected route
//     navigate("/");
//   }
  return (
    

    
    <div className="shadow-lg">
    <form onSubmit={handleSubmit}>
    <Grid container spacing={3}>
        <Grid item xs={12}>
            <TextField
            required
            id='email'
            name='email'
            label='Email'
            fullWidth
            autoComplete='email'/>
        </Grid>
        <Grid item xs={12}>
            <TextField
            required
            id='password'
            name='password'
            label='Password'
            fullWidth
            autoComplete='Password'/>
        </Grid>
        <Grid item xs={12}>
            <Button
            className='bg-[#235d46] w-full'
            type='submit'
            variant='contained'
            size='large'
            sx={{padding:".8rem 0"}}>
                Register
            </Button>
        </Grid>
    </Grid>
    </form>
    <div className='flex justify-center flex-col items-center'>
        <div className='py-3 flex items-center'>
            <p>If You Don't Have Account?</p>
            <Button onClick={()=>navigate("/register")} className='ml-5' size='small'>Register</Button>
        </div>
    </div>
    <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnakbar}>
        <Alert onClose={handleCloseSnakbar} severity="success" sx={{ width: '100%' }}>
          {auth.error?auth.error:auth.user?"Register Success":""}
        </Alert>
      </Snackbar>
</div>
  )
}

export default Login