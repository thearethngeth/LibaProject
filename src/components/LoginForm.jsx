import React, { useState } from "react";

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    alert("Login successful!"); // Replace with your authentication logic
    onClose();
  };

  const handleRegister = () => {
    alert("Redirecting to registration page!"); // Replace with your registration logic
    // Logic to navigate to registration page or popup goes here
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
        >
          Login
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <button
          onClick={handleRegister}
          className="w-[48%] bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
        >
          Register
        </button>
        <button
          onClick={onClose}
          className="w-[48%] bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
