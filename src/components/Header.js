import { LOGO_URL } from "../utilities/constant";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utilities/useOnlineStatus";
import userContext from "../utilities/userContext";
import { useSelector } from "react-redux";

const Header = () => {
    const onlineStatus = useOnlineStatus();
    const { loggedInUser } = useContext(userContext);
    console.log(loggedInUser);

    // Subscribing to the cart store using useSelector
    const cartItems = useSelector((store) => store.cart.items);
    console.log(cartItems);

    // Calculate the total quantity of items in the cart
    const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    const [btnNameReact, setBtnNameReact] = useState("Login");

    return (
        <div className="flex justify-between m-2 bg-pink-200 shadow-lg">
            <div className="logo-container">
                <img className="w-50" src={LOGO_URL} alt="logo" />
            </div>
            <div className="flex items-center">
                <ul className="flex p-4 pt-40">
                    <li className="px-4"><Link to="/">Home</Link></li>
                    <li className="px-4"><Link to="/contact">Contact Us</Link></li>
                    <li className="px-4"><Link to="/about">About Us</Link></li>
                    <li className="px-4 font-bold"><Link to="/Cart">Cart ({totalCartQuantity} items)</Link></li>
                    <li className="px-4">Online Status {onlineStatus ? "🟢" : "🔴"}</li>
                    <button className="login" 
                        onClick={() => {
                            setBtnNameReact(btnNameReact === "Login" ? "Logout" : "Login");
                        }}>
                        {btnNameReact}
                    </button>
                    <li className="px-4 font-bold">{loggedInUser}</li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
