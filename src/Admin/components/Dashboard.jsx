import { Grid } from '@mui/material'
import React from 'react'
import AdminDash from './Achivement'
import ProductsTable from './ProductsTable'

const AdminDashboard = () => {
  return (
    <div className='p-10'>
        <Grid container spacing={2}>
           <Grid item xs={12} md={4}>


            <AdminDash/>

           </Grid>
           <Grid item xs={12} md={8}> 
        
          </Grid>
          <Grid item xs={12} md={6}>
            
          </Grid>




        </Grid>
    </div>
  )
}

export default AdminDashboard