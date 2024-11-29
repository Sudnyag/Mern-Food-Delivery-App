import React from 'react';

export default function Carousal() {
  return (
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" >

        <div className="carousel-inner" id='carousal'>
          < div className='carousel-caption' style={{ zIndex: '10' }}>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-warning text-white bg-warning" type="submit">Search</button>
            </form>
          </div>

          <div className="carousel-item active">
            <img src="https://wallpaperaccess.com/full/1306253.jpg" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="Burger" />
          </div>

          <div className="carousel-item">
            <img src="https://i0.wp.com/cookingfromheart.com/wp-content/uploads/2016/08/Veg-Momos-4.jpg?resize=720%2C480&ssl=1" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="Momos" />
          </div>

          <div className="carousel-item">
            <img src="https://www.simplemost.com/wp-content/uploads/2016/07/pepperoni-olive-cheese-pizza-addictive-foods-e1468856431544.jpeg" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="Pizza" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>


      </div>
    </div>
  );
}