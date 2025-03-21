import React from "react";
import { Link } from "react-router-dom";
import "./ServicesPage.css";

const ServicesPage = () => {
    return (
        <div className="services-container">
            {/* ✅ Top Navigation Bar */}
            <nav className="navbar">
                <ul>
                    <li><Link to="/welcome">Home</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="#">Thermostat</Link></li>
                    <li><Link to="#">Surveillance</Link></li>
                </ul>
            </nav>

            {/* ✅ Services Overview */}
            <div className="services-overview">
                <h1>Our Services</h1>
                <p>
                    <strong>Seamless Smart Home Control</strong><br />
                    Take full control of your home with an intuitive dashboard that connects all your smart devices in one place. 
                    Adjust lighting, temperature, security, and appliances with just a tap. Receive instant alerts for unexpected 
                    activity, control smart locks remotely, and ensure your family’s safety with our advanced security features.
                </p>
            </div>

            {/* ✅ Services Features Section */}
            <div className="services-features">
                <div className="service-card">
                    <img src="thermostat_image.jpg" alt="Thermostat" />
                    <div className="service-text">
                        <h2>Temperature Control</h2>
                        <p>
                            Experience a smart thermostat that saves energy, enhances comfort, and provides personalized control.
                            Gain access to real-time visualizations of your energy usage for smarter savings.
                        </p>
                        <p className="thermostat-link">
                            <Link to="#">Explore more</Link>
                        </p>
                    </div>
                </div>

                <div className="service-card">
                    <img src="security_camera_image.png" alt="Security Camera" />
                    <div className="service-text">
                        <h2>Security Camera</h2>
                        <p>
                            Boost your home security with a smart camera that offers real-time monitoring and alerts—
                            along with easy access to live streams and recorded footage for ultimate peace of mind.
                        </p>
                        <p className="camera-link">
                             <Link to="#">Explore more</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
