import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import HeroImage from "../assets/img/house-banner.png";
import Logo from "../assets/img/logo.svg";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5500/signup", {
        name,
        email,
        password,
      });
      if (res.data === "success") {
        navigate("/login");
      }
    } catch (err) {
      setError("Error occurred while signing up");
      console.log(err);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-violet-100">
      <div className="bg-purple-300 px-5 py-[153px] shadow-md rounded-l-lg">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
      <div className="bg-white  shadow-md rounded-r-lg px-6 py-10 max-w-md w-1/2">
        <h1 className="text-2xl font-semibold text-center mb-4">Sign Up</h1>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Name"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
            <Link to="/login" className="text-violet-500 hover:text-violet-800">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
