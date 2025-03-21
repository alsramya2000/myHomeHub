import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginPage from "./components/LoginPage";
import WelcomePage from "./components/WelcomePage";
import "./App.css";

function App() {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    {/* ✅ Default homepage should be Signup Page */}
                    <Route path="/" element={<SignupForm />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/welcome" element={<WelcomePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
