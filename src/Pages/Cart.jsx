import React from 'react';
import { useCart } from '../components/CartContext';
import { Nav } from '../components/Nav';



const Cart = () => {
  const { state, dispatch } = useCart(); // Using the useCart hook to access the cart state and dispatch
  const { cart } = state; // Extracting the cart array from the state

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const removeFromCart = (itemId) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: {
        id: itemId,
      },
    });
  };

  return (
    <div className="container mx-auto mt-8 bg-white text-black">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

      <div className="flex flex-wrap">
        {cart.map((item, index) => (
          <div key={index} className="flex items-center mb-4">
             <img src={item.image} alt={item.name} className="mr-4 w-24 h-24" />
            <div>
              <p className="font-semibold">{item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: Rs.{item.price * item.quantity}</p>
              <button
                className="text-red-500 hover:text-red-700 font-semibold"
                onClick={() => removeFromCart(item.id)}
              >
                Remove from Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <hr className="border-t border-gray-300 my-4" />

        <div className="flex justify-end">
          <div className="text-xl font-semibold">Total Price: Rs.{totalPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default Cart;