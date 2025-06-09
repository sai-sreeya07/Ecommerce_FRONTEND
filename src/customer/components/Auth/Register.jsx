import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { getUser, register } from '../../../state/Auth/Action';
import { store } from '../../../state/store';

function Register() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const jwt=localStorage.getItem("jwt")
    const { auth } = useSelector((store) => store);


    useEffect(()=>{
        if(jwt){
          dispatch(getUser(jwt))
        }
      
      },[jwt])

    // useEffect(()=>{
    //     if(jwt){
    //         dispatch(getUser(jwt))
    //     }
    // },[jwt,auth.jwt])

    // useEffect(() => {
    //     if (jwt && !auth.user) { // Check if jwt exists and user is not already loaded
    //         dispatch(getUser(jwt));
    //     }
    // }, [jwt, auth.user, dispatch]); // Add auth.user and dispatch to the dependencies
    


    const handleSubmit=(event)=>{
        event.preventDefault();
        const data=new FormData(event.currentTarget);
        const userData={
            first_name:data.get('first_name'),
            last_name:data.get('last_name'),
            email:data.get("email"),
            password:data.get("password")
        };
        dispatch(register(userData))
        console.log("userData ",userData);
        console.log("jwt",jwt)
        

    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <TextField
                required
                id='first_name'
                name='first_name'
                label='First Name'
                fullWidth
                autoComplete='given-name'/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                required
                id='last_name'
                name='last_name'
                label='Last Name'
                fullWidth
                autoComplete='given-name'/>
            </Grid>
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
                onClick={()=>navigate("/")}
                sx={{padding:".8rem 0"}}>
                    Register
                </Button>
            </Grid>
        </Grid>
        </form>
        <div className='flex justify-center flex-col items-center'>
            <div className='py-3 flex items-center'>
                <p>If You Have  An Account?</p>
                <Button onClick={()=>navigate("/login")} className='ml-5' size='small'>Login</Button>
            </div>
        </div>
    </div>
  )
}

export default Register