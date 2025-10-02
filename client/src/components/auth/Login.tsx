import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const host = "http://localhost:5000";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div
      className="w-full h-screen flex-center"
      style={{
        backgroundImage: "linear-gradient(90deg, #FF3BFF, #5C24FF, #D94FD5)",
      }}
    >
      <div className="bg-white p-6  shadow-2xl rounded-md lg:p-16">
        <div className="flex-center">
          <img src="registerUserSvg.svg" alt="svg_logo" className="w-13 h-13" />
        </div>
        <div className="font-bold text-xl">Sign In To Your Account</div>
        <form className="" action="" onSubmit={(e) => handleSubmit(e)}>
          <div className="mt-2">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="focus:outline-none border-2 border-black rounded-4xl p-3"
              type="email"
              placeholder="Enter your Email"
              required
            />
          </div>
          <div className="mt-2">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="focus:outline-none border-2 border-black rounded-4xl p-3"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="mt-2 flex-center">
            <button className="bg-purple-950 px-3 py-2 rounded-md text-white">
              Login
            </button>
          </div>
          <p>Don't have an account? </p>
          <Link to="/register">
            <p className="text-purple-950">Register</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
