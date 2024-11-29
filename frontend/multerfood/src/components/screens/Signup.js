import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
    const [first, setFirst] = useState({
        name: "",
        email: "",
        password: "",
        geolocation: "",
    });
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!first.name || !first.email || !first.password || !first.geolocation) {
            setMessage("All fields are required.");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:5000/foodapp/Signup/createUsers",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(first),
                }
            );

            const result = await response.json();
            if (result.success) {
                setMessage("Signup successful! Redirecting...");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000);
            } else {
                setMessage(result.message || "Enter valid credentials.");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            setMessage("An error occurred. Please try again later.");
        }
    };

    const onChange = (event) => {
        setFirst({ ...first, [event.target.name]: event.target.value });
    };

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={first.name}
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={first.email}
                            onChange={onChange}
                        />
                        <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={first.password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="geolocation" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="geolocation"
                            name="geolocation"
                            value={first.geolocation}
                            onChange={onChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <Link to="/login" className="m-3 btn btn-danger">
                        Already a User
                    </Link>
                </form>
                {message && <div className="alert alert-info mt-3">{message}</div>}
            </div>
        </>
    );
}

export default Signup;
