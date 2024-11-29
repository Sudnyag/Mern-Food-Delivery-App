import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Cart.css";

function Cart({ cart, placeOrder }) {
  const totalPrice = cart.reduce((acc, item) => acc + item.food_price * item.quantity, 0);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    placeOrder(cart);
    navigate('/myOrder'); // Redirect to "My Orders" page
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.food_id} className="cart-item">
              <h5>{item.food_name}</h5>
              <p>Price: Rs.{item.food_price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
          <div className="total">
            <h3>Total Price: Rs.{totalPrice.toFixed(2)}</h3>
            <button 
              type="submit" 
              className="btn btn-warning"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;