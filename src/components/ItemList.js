import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utilities/constant";
import { addItem, removeItem } from "../utilities/cartSlice";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  // Get the cart items from the Redux store
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  // Function to get the quantity of an item in the cart
  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find((cartItem) => cartItem.card.info.id === itemId);
    return cartItem ? cartItem.quantity : 0; // If item exists, return quantity; otherwise return 0
  };

  return (
    <div>
      {items.map((item) => (
        <div key={item.card.info.id}>
          <div className="py-2 m-1 shadow-xl text-left border-b-2 border-slate-400 flex justify-between">
            <div>
              <p className="font-bold py-2">{item.card.info.name}</p>
              <p className="p-2">
                <span>₹ {item.card.info.price / 100 || item.card.info.defaultPrice / 100}</span>
                <span> ⭐ </span>
              </p>
              <p className="w-10/12 pb-2 pl-2">{item.card.info.description}</p>
            </div>
            <div>
              <img
                src={CDN_URL + item.card.info.imageId}
                className="w-28 h-28 rounded-lg"
              />
              <div className="flex items-center justify-between mt-1 pr-2">
                <button
                  className="bg-red-300 p-2 w-12 hover:bg-red-600 font-bold text-3xl"
                  onClick={() => handleRemoveItem(item)}
                >
                  -
                </button>
                <div className=" p-2 w-12  font-bold text-3xl bg-zinc-300 ">
                  {getItemQuantity(item.card.info.id)} {/* Show quantity or zero */}
                </div>
                <button
                  className="bg-green-300 p-2 w-12 hover:bg-green-600 font-bold text-3xl"
                  onClick={() => handleAddItem(item)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
