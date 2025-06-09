import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../customer/Pages/HomePage/HomePage';
import Cart from '../customer/components/Cart/Cart';
// import { Navigation } from '@mui/icons-material'; // This import is incorrect for a component, remove it
import Footer from '../customer/components/footer/Footer'; // Keep if you want footer here
import Product from '../customer/components/Product/Product';
import ProductDetails from '../customer/components/ProductDetails/ProductDetails';
import Checkout from '../customer/components/Checkout/Checkout';
import Order from '../customer/components/Order/Order';
import OrderDetails from '../customer/components/Order/OrderDetails';
import PaymentSuccess from '../customer/components/Payment/PaymentSuccess';

function CustomerRouters() {
  return (
    <div>
      <div>
        <Routes>
          {/* Main Home Page */}
          <Route path='/' element={<HomePage/>}></Route>
          {/* Login/Register routes can point to HomePage or a dedicated Auth page */}
          <Route path='/login' element={<HomePage/>}></Route>
          <Route path='/register' element={<HomePage/>}></Route>

          {/* Cart Page */}
          <Route path='/cart' element={<Cart/>}></Route>

          {/* Single-level Product Listing Page */}
          {/* This route will handle paths like /products or /categoryName */}
          <Route path='/:categoryName' element={<Product/>}></Route> 
          {/* If you specifically want '/products', change the path to '/products' */}
          {/* <Route path='/products' element={<Product/>}></Route> */}

          {/* Product Details Page (remains the same as it needs a specific productId) */}
          <Route path='/product/:productId' element={<ProductDetails/>}></Route>

          {/* Checkout & Order Related Pages */}
          <Route path='/products' element={<Product/>}></Route>
          <Route path='/checkout' element={<Checkout/>}></Route>
          <Route path='/account/order' element={<Order/>}></Route>
          <Route path='/account/order/:orderId' element={<OrderDetails/>}></Route>
          <Route path='/payment/:orderId' element={<PaymentSuccess/>}></Route>

        </Routes>
        {/* Footer component rendered here, below all routes */}
        <div><Footer/></div>
      </div>
    </div>
  );
}

export default CustomerRouters;