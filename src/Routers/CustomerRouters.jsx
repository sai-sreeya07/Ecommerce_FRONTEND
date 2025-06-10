import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // Import useLocation
import HomePage from '../customer/Pages/HomePage/HomePage';
import Cart from '../customer/components/Cart/Cart';
import Footer from '../customer/components/footer/Footer';
import Product from '../customer/components/Product/Product';
import ProductDetails from '../customer/components/ProductDetails/ProductDetails';
import Checkout from '../customer/components/Checkout/Checkout';
import Order from '../customer/components/Order/Order';
import OrderDetails from '../customer/components/Order/OrderDetails';
import PaymentSuccess from '../customer/components/Payment/PaymentSuccess';
 // Import your Navigation component
import Navigation from '../customer/components/Navigation/Navigation';
import './CustomerRouters.css';
// If you are using Material-UI for theming, you'll need these imports
// import { ThemeProvider } from '@mui/material/styles';
// import { customerTheme } from '../Admin/them/customeThem'; // Adjust path as per your project

function CustomerRouters() {
  const location = useLocation();

  // You can define conditions for when to show the Navigation bar.
  // For example, if you have a 404 page or a specific route where you don't want the nav.
  // For now, let's assume you want it on all customer routes.
  const showNavigation =location.pathname !== "*";// Or add specific conditions: location.pathname !== '/some-other-path';

  return (
    <div>
      {/* If you're using Material-UI ThemeProvider, uncomment and wrap your content */}
      {/* <ThemeProvider theme={customerTheme}> */}
        {showNavigation && <Navigation />} {/* Render Navigation component here */}

        <div className="main-page-content">
          <Routes>
            {/* Main Home Page */}
            <Route path='/' element={<HomePage />}></Route>
            {/* Login/Register routes can point to HomePage or a dedicated Auth page */}
            <Route path='/login' element={<HomePage />}></Route>
            <Route path='/register' element={<HomePage />}></Route>

            {/* Cart Page */}
            <Route path='/cart' element={<Cart />}></Route>

            {/* Product Listing Page */}
            {/* This route will handle paths like /products or /categoryName */}
            {/* Note: The order of routes matters. More specific paths should come before less specific ones. */}
            <Route path='/products' element={<Product />}></Route> {/* Specific products path */}
            <Route path='/:categoryName' element={<Product />}></Route> {/* Dynamic category path */}
            {/* If you have multi-level categories like /:lavelOne/:lavelTwo/:lavelThree, define them before single-level ones.
                Example: <Route path='/:lavelOne/:lavelTwo/:lavelThree' element={<Product />}></Route>
            */}

            {/* Product Details Page (remains the same as it needs a specific productId) */}
            <Route path='/product/:productId' element={<ProductDetails />}></Route>

            {/* Checkout & Order Related Pages */}
            <Route path='/checkout' element={<Checkout />}></Route>
            <Route path='/account/order' element={<Order />}></Route>
            <Route path='/account/order/:orderId' element={<OrderDetails />}></Route>
            <Route path='/payment/:orderId' element={<PaymentSuccess />}></Route>
          </Routes>
          {/* Footer component rendered here, below all routes */}
          <div><Footer /></div>
        </div>
      {/* </ThemeProvider> */}
    </div>
  );
}

export default CustomerRouters;