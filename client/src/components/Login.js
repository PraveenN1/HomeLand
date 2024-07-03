import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/img/logo.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      if (res.data === "exist") {
        navigate("/", { state: { id: email } });
      } else if (res.data === "notexist") {
        navigate("/signup");
      }
    } catch (err) {
      setError("Wrong email or password");
      console.log(err);
    }
  }

  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-violet-100 ">
        <div className="bg-purple-300 px-5 py-[122px] shadow-md hidden md:block">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className=" bg-white  px-10 pt-10 pb-6 w-[25rem] shadow-md ">
          <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                name="username"
                id="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email"
              />
            </div>
            <div className="mb-6">
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
                Login
              </button>
              <Link
                to="/signup"
                className="font-bold text-sm text-violet-500 hover:text-violet-800"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
