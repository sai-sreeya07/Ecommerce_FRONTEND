import { Label } from '@mui/icons-material'
import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { OrderCart } from './OrderCart'
import { getOrderHistory } from '../../../state/Order/Action'
import { useDispatch, useSelector } from "react-redux";


const orderStatus=[
    {Label:"On th way",value:"On the way"},
    {Label:"Delivered",value:"Delivered"},
    {Label:"Cancelled",value:"Cancelled"},
    {Label:"Returned",value:"Returned"}
]


function Order() {

    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const {order}=useSelector(store=>store);
  
    useEffect(() => {
      dispatch(getOrderHistory({ jwt }));
    }, [jwt]);
  return (
    <div className='px:5 lg:px-20'>
        <Grid container sx={{justifyContent:"space-between"}}>
            <Grid item xs={2.5}>
                <div className='h-auto shadow-lg bg-white p-5 sticky top-5'>
                    <h1 className='font-bold text-lg'>Filter</h1>
                    <div className='space-y-4 mt-4'>
                        <h1 className='font-bold'>ORDER STATE</h1>
                        {orderStatus.map((option)=><div className='flex items-center'>
                        <input defaultValue={option.value} type="checkbox" className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500' />
                        <label className='ml-3 text-sm text-gray-600' htmlFor={option.value}>
                            {option.label}
                        </label>
                    </div>)}
                    </div>
                </div>

            </Grid>
            <Grid item xs={9}>
            {order.orders?.length>0 && order.orders?.map((order )=> {
              return order?.orderItems?.map((item,index)=> <OrderCart item={item} order={order} />)
            })}
            </Grid>
        </Grid>
    </div>
  )
}

export default Order