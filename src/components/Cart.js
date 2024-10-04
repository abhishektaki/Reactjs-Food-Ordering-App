import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utilities/cartSlice";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handlePlaceOrder = () => {
        navigate('/order', { state: { cartItems } }); // Pass cartItems as state
    };

    // Calculate total price, considering the quantity of each item
    const totalPrice = cartItems.reduce((total, item) => {
        const itemPrice = item.card.info.price / 100 || item.card.info.defaultPrice / 100;
        return total + itemPrice * item.quantity; // Multiply item price by its quantity
    }, 0);

    // Calculate total quantity of items in the cart
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="text-center m-4 p-4">
            <h1 className="font-bold text-2xl">Cart</h1>
            <div className="w-6/12 m-auto">
                <button 
                    className="p-2 m-2 bg-slate-300 rounded-xl border-2 border-cyan-600 text-red-800 font-semibold hover:bg-red-400 hover:text-gray-700"
                    onClick={handleClearCart}
                >
                    Clear Cart
                </button>
                {cartItems.length === 0 && <h1 className="font-bold">Cart is Empty. Please Add Item</h1>}
                <ItemList items={cartItems} />
            </div>
            {cartItems.length > 0 && (
                <div className="border-2 border-s-fuchsia-200 flex justify-between w-6/12 m-auto">
                    <h1 className="font-bold text-lg">Total Items: {totalQuantity}</h1>
                    <h1 className="font-bold text-lg">Total Price: ₹{totalPrice.toFixed(2)}</h1> {/* Show the total price with two decimal places */}
                    <button className="bg-green-500 m-2 p-2 rounded-lg" onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
