import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./WelcomePage.css";

const WelcomePage = () => {
    const [user, setUser] = useState({ firstName: "", lastName: "" });
    const location = useLocation();
    const customerId = new URLSearchParams(location.search).get("customerId");

    useEffect(() => {
        // ✅ Check if user data exists in localStorage
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }

        // ✅ Fetch user data if customerId is available
        if (customerId) {
            fetch(`http://127.0.0.1:5000/user?customerId=${customerId}`)
                .then((response) => response.json())
                .then((data) => {
                    if (!data.error) {
                        setUser(data);
                        localStorage.setItem("user", JSON.stringify(data)); // ✅ Store user in localStorage
                    }
                })
                .catch((error) => console.error("Error fetching user:", error));
        }
    }, [customerId]);

    return (
        <div className="welcome-container">
            {/* ✅ Top Navigation Bar */}
            <nav className="navbar">
                <ul>
                    <li><a href="/welcome">Home</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="#">Thermostat</a></li>
                    <li><a href="#">Surveillance</a></li>
                </ul>
            </nav>

            {/* ✅ Centered Highlighted Section */}
            <div className="main-content">
                <div className="highlight-container">
                    <h1>MyHomeHub</h1>
                    <p>Welcome, {user.firstName} {user.lastName}!</p>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
