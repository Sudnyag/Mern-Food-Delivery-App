import './App.css';
import Home from './components/screens/Home';
import { Route, Routes } from 'react-router-dom';
import Login from './components/screens/Login';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './components/screens/Signup';
import MyOrder from './components/screens/MyOrder';
import Cart from './components/Cart';
import { useState } from 'react';

export default function App() {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const updateCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.food_id === item.food_id);
      if (existingItem) {
        return prevCart.map(cartItem => 
          cartItem.food_id === item.food_id 
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity } 
            : cartItem
        );
      }
      return [...prevCart, item];
    });
  };

  const placeOrder = (cartItems) => {
    setOrders([...orders, ...cartItems]);
    setCart([]);  // Clear the cart after placing the order
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home updateCart={updateCart} cart={cart} placeOrder={placeOrder} />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/cart" element={<Cart cart={cart} placeOrder={placeOrder} />} />
        <Route path='/myOrder' element={<MyOrder orders={orders} />} />
      </Routes>
    </div>
  );
}