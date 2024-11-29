import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const [credentials, setCredentials] = useState({ username: "", userpassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/foodapp/userLogin/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });
      const result = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(result.message || "Login failed");
      } else {
        console.log("Login successful:", result);
        // Set user in local storage or context
        localStorage.setItem("user", JSON.stringify(result.user));
        // Redirect to home page
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred during login.");
      console.error("Error:", error);
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" name='username' value={credentials.username} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="userpassword" className="form-label">Password</label>
          <input type="password" className="form-control" name='userpassword' value={credentials.userpassword} onChange={onChange} required />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  )
}