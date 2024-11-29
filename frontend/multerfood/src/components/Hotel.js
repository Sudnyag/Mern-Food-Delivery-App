import React, { useEffect, useState } from "react";
import './Hotel.css'; // Ensure you have the correct path

function Hotel() {
  const [hotels, setHotels] = useState([]);
  

  const handleView = ({ hotel_id, hotel_name }) => {
    var obj = { hotel_id, hotel_name };
    console.log(obj);
  };

  async function getHotel() {
    try {
      const result = await fetch("http://localhost:5000/foodapp/hotels/gethotels");
      const output = await result.json();
      setHotels(output);
    } catch (error) {
      console.error("Error fetching hotel list:", error);
    }
  }

  useEffect(() => {
    getHotel();
  }, []);

  return (
    <div className="container">
      {hotels.map((x) => (
        <div key={x.hotel_id} className="card">
          <img
            src={x.hotel_url}
            alt={x.hotel_name}
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title">{x.hotel_name}</h5>
            <h6 className="card-text">Address: {x.hotel_address}</h6>
          </div>
          <div className="card-footer">
            <button
              className="btn btn-warning ms-2"
              onClick={() => handleView({ hotel_id: x.hotel_id, hotel_name: x.hotel_name })}
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Hotel;