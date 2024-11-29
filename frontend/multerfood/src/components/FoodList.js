import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './FoodList.css';

function FoodList({ updateCart }) {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const navigate = useNavigate();

  const handleQuantityChange = (food_id, quantity) => {
    setSelectedQuantities({
      ...selectedQuantities,
      [food_id]: quantity
    });
  };

  const handleAddToCart = (foodItem) => {
    const quantity = selectedQuantities[foodItem.food_id] || 1;
    const item = { ...foodItem, quantity: parseInt(quantity) };

    const updatedFoodItems = foodItems.map(item => {
      if (item.food_id === foodItem.food_id) {
        return { ...item, food_quantity: item.food_quantity - quantity };
      }
      return item;
    });

    setFoodItems(updatedFoodItems);

    updateCart(item);

    console.log("Added to cart:", item);
    navigate('/cart');
  };

  async function getFood() {
    try {
      const result = await fetch("http://localhost:5000/foodapp/getAll");
      const output = await result.json();
      setFoodItems(output);
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  }

  useEffect(() => {
    getFood();
  }, []);

  return (
    <div className="container">
      {foodItems.map((x) => (
        <div key={x.food_id} className="card">
          <img src={x.food_url} alt={x.food_name} className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">{x.food_name}</h5>
            <h6 className="card-text">Price: Rs.{x.food_price}</h6>
            <h6 className="card-text">Quantity: {x.food_quantity}
              <select
                className='m-2 h-100 bg-warning'
                value={selectedQuantities[x.food_id] || 1}
                onChange={(e) => handleQuantityChange(x.food_id, e.target.value)}
              >
                {Array.from(Array(x.food_quantity + 1), (e, i) => (
                  <option key={i} value={i}> {i}</option>
                ))}
              </select>
            </h6>
          </div>
          <div className="card-footer">
            <button
              className="btn btn-warning ms-2"
              onClick={() => handleAddToCart(x)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FoodList;