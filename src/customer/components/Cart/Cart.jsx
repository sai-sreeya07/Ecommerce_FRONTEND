import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { Button } from "@mui/material";
import "./button.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../state/Cart/Action";
import { store } from "../../../state/store";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store);
  const handleCheckOut = () => {
    navigate("/checkout?step=2");
  };
  useEffect(() => {
    dispatch(getCart());
  }, []);
  console.log("Cart datas are here", cart.cart?.cartItems);
  const cartItemCount = cart.cart?.cartItems.length ?? 0;
console.log("Number of cart items:", cartItemCount);

  return (
    <div className="mt-25">
      <div className="grid grid-cols-3 px-10 relative mt-5">
        <div className="col-span-2">
          {cart.cart?.cartItems.map((item) => (
            <CartItem item={item} />
            
          ))}
        </div>

        <div className="px-2 sticky top-0 h-[50vh] mt-5 border rounded-md  ">
          <div className="border">
            <p className="uppercase font-bold opacity-60 pb-4 ">Price Details</p>
            <hr />
            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black">
                <span>Price</span>
                <span>{cart.cart?.totalPrice}</span>
              </div>
              <div className="flex justify-between pt-3 ">
                <span>Discount</span>
                <span className="text-green-600">0</span>
              </div>
              <div className="flex justify-between pt-3">
                <span>Delivery charges</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between pt-3  font-bold">
                <span>Total Amount</span>
                <span className="text-green-600">{cart.cart?.totalPrice}</span>
              </div>
            </div>
            <button
              onClick={handleCheckOut}
              className="custom-button w-full mt-5"
            >
              {" "}
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
