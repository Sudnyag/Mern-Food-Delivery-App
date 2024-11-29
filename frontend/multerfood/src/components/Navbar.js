import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
      setUser(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-warning">
        <div className="container-fluid">
          <Link className="navbar-brand fs-2 fst-italic" to="/"><img src='./foodpalace.jpeg' alt="Food Palace" /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
              </li>
            </ul>
            <div className='d-flex'>
              {!isLoggedIn ? (
                <>
                  <Link className="btn bg-white text-warning mx-1" to="/login">Login</Link>
                  <Link className="btn bg-white text-warning mx-1" to="/Signup">Signup</Link>
                </>
              ) : (
                <>
                  <Link className="btn bg-white text-warning mx-1" to="/cart">My Cart</Link>
                  <div className='btn bg-white text-warning mx-2' onClick={handleLogout}>Logout</div>
                  {user && <div className='btn bg-white text-warning mx-2'>{`Hello, ${user.name}`}</div>}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;