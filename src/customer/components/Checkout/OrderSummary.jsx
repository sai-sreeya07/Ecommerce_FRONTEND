import React, { useEffect } from 'react'
import AdressCard from '../AdressCard/AdressCard'
import CartItem from '../Cart/CartItem'
import { useDispatch,useSelector } from 'react-redux';
import { getOrderById } from '../../../state/Order/Action';
import { useLocation } from 'react-router-dom';
import { store } from '../../../state/store';
import { createPayment } from '../../../state/Payment/Action';


function OrderSummary() {
  const dispatch=useDispatch()
  const location=useLocation()
  const {order}=useSelector(store=>store)
  const searchParams=new URLSearchParams(location.search)
  const orderId=searchParams.get("order_id");

  
   const handleCheckOut=()=>{
    dispatch(createPayment(orderId))
   }

  
  useEffect(()=>{
    dispatch(getOrderById(orderId))
  },[orderId])
  return (
    <div>
      <div className='p-5 shadow-lg rounded-s-md border'>
        <AdressCard address={order.order?.shippingAddress}/>
      </div>

      <div>
      <div className="lg:grid grid-cols-3 lg:px-10 relative mt-5">
        <div className="col-span-2">
          {order.order?.orderItems.map((item)=><CartItem item={item}/>)}
        </div>

        <div className="px-2 sticky top-0 h-[50vh] mt-5 lg-mt-0   border rounded-md  ">
          <div className="border">
            <p className="uppercase font-bold opacity-60 pb-4">Price Details</p>
            <hr />
            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black">
                <span>Price</span>
                <span>${order.order?.totalPrice}</span>
              </div>
              <div className="flex justify-between pt-3 ">
                <span>Discount</span>
                <span className="text-green-600">50% off</span>
              </div>
              <div className="flex justify-between pt-3">
                <span>Delivery charges</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between pt-3  font-bold">
                <span>Total Amount</span>
                <span className="text-green-600">${order.order?.totalPrice/2}</span>
              </div>
            </div>
            <button className="custom-button w-full mt-5" onClick={handleCheckOut}> Check Out</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default OrderSummary