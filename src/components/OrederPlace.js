import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const OrderPlace = () => {
    const location = useLocation();
    const cartItems = location.state?.cartItems || [];
    
    // If you need to manage address state, you can add useState here.
    // const [address, setAddress] = useState('');

    const totalPrice = cartItems.reduce((total, item) => {
        const itemPrice = item.card.info.price / 100 || item.card.info.defaultPrice / 100;
        return total + itemPrice * item.quantity; // Multiply item price by its quantity
    }, 0);

    return (
        <div className="text-center m-4 p-4">
            <h1 className="font-bold text-2xl">Order Summary</h1>
            <div className="w-6/12 m-auto">
                <h2 className="font-bold text-lg">Items to Buy:</h2>
                {cartItems.map((item) => (
                    <div key={item.card.info.id} className="py-2 border-b-2 border-gray-300">
                        <p className="font-bold">{item.card.info.name}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ₹{(item.card.info.price / 100 || item.card.info.defaultPrice / 100) * item.quantity}</p>
                    </div>
                ))}
                <h2 className="font-bold text-lg">Total Price: ₹{totalPrice.toFixed(2)}</h2>

                {/* Address Input */}
                <div className="mt-4">
                    <label htmlFor="address" className="font-bold">Enter Address:</label>
                    <input
                        id="address"
                        type="text"
                        // value={address}
                        // onChange={(e) => setAddress(e.target.value)}
                        className="border-2 border-gray-300 rounded-lg p-2 w-full mt-1"
                        placeholder="Enter your address"
                    />
                </div>
                <button className="bg-green-500 m-2 p-2 rounded-lg" onClick={() => alert('Order placed!')}>
                    Confirm Order
                </button>
            </div>
        </div>
    );
};

export default OrderPlace;
