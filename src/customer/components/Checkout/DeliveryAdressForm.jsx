import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import AdressCard from "../AdressCard/AdressCard";
import { useDispatch,useSelector } from 'react-redux';
import { createOrder } from "../../../state/Order/Action";
import { useNavigate } from "react-router-dom";

const DeliveryAdressForm=()=> {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("adress")
    const data = new FormData(e.currentTarget);
    const address={
      firstName:data.get("firstName"),
      lastName:data.get("lastName"),
      streetAdress:data.get("StreetAdress"),
      city:data.get("city"),
      state:data.get("state"),
      zipCode:data.get("zipCode"),
      phoneNumber:data.get("phoneNumber")
    }
    const orderData={address,navigate}

    dispatch(createOrder(orderData))
    console.log("adress",address)
  }


  return (
    <div className="">
      <Grid container spacing={4}>
        <Grid item xs={12} lg={7}>
          <Box className="border rounded-s-md shadow-md p-5">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="adress"
                    name="adress"
                    label="Adress"
                    fullWidth
                    autoComplete="given-name"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State/Ptovince/Region"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    label="Zip / Postal Code"
                    fullWidth
                    autoComplete="shipping postal-code"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    sx={{ py:1.5, mt: 2, bgcolor: "green" }}
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default DeliveryAdressForm;
