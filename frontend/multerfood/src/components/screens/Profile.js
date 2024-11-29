import React, { useEffect, useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No token found");

        const response = await fetch("http://localhost:5000/foodapp/user/profile", {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in headers
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch profile");

        setUser(data); // Store user profile data
      } catch (error) {
        console.error("Error fetching profile:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Error loading profile. Please log in again.</div>;

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      {/* Add more user profile details */}
    </div>
  );
}
