import React from 'react';
import './MyOrder.css';

function MyOrder({ orders }) {
  return (
    <div className="orders">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((item, index) => (
          <div key={index} className="order-item">
            <h5>{item.food_name}</h5>
            <p>Price: Rs.{item.food_price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))
      )}
      <hr />
      <div>Thank you !! Visit Again :)!!</div>
    </div>
    
  );
}

export default MyOrder;