import React from 'react';
import { Link } from 'react-router-dom';



function Footer() {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      {/* Left side: FoodPalace brand or logo */}
      <div className="col-md-4 d-flex align-items-center">
        <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
          <img 
            src="" 
            alt="FoodPalace Logo" 
            style={{ height: '30px' }} // Adjust the size as needed
          />
        </Link>
        <span className="text-muted">© 2024 FoodPalace, Inc</span>
      </div>

      {/* Right side: Links to pages like Privacy Policy, Terms of Service, etc. */}
      <div className="col-md-4 d-flex justify-content-end">
        <Link to="/about" className="text-muted mx-3 text-decoration-none">About Us</Link>
        <Link to="/privacy" className="text-muted mx-3 text-decoration-none">Privacy Policy</Link>
        <Link to="/terms" className="text-muted mx-3 text-decoration-none">Terms of Service</Link>
      </div>
    </footer>
  );
}

export default Footer;
