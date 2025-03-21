import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const SignupForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        thermostatDeviceId: "",
        cameraDeviceId: "",
    });

    const [customerId, setCustomerId] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:5000/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setCustomerId(result.customerId);
            alert(`Signup successful! Your Customer ID: ${result.customerId}`);
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to submit. Please check your backend.");
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup for MyHomeHub</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
                <input type="text" name="thermostatDeviceId" placeholder="Thermostat Device ID" onChange={handleChange} required />
                <input type="text" name="cameraDeviceId" placeholder="Camera Device ID" onChange={handleChange} required />
                <button type="submit">Sign Up</button>
            </form>

            {customerId && (
                <div className="customer-id">
                    <h3>Signup Successful!</h3>
                    <p>Your Customer ID: <strong>{customerId}</strong></p>
                </div>
            )}

            {/*  Login Link */}
            <p className="login-link">
                Already a user? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default SignupForm;
