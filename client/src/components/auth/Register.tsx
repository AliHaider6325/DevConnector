import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";

// define the props type
type RegisterProps = {
  setAlert: (msg: string, alertType: string) => void;
};

const Register: React.FC<RegisterProps> = (props) => {
  const host = "http://localhost:5000";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password !== checkPassword) {
      props.setAlert("passwords do not match", "alert-red");
    } else {
      console.log("success");
    }
  }

  return (
    <div
      className="w-full h-screen flex-center"
      style={{
        backgroundImage: "linear-gradient(90deg, #FF3BFF, #5C24FF, #D94FD5)",
      }}
    >
      <div className="bg-white p-6 shadow-2xl rounded-md lg:p-16">
        <div className="flex-center">
          <img src="registerUserSvg.svg" alt="svg_logo" className="w-13 h-13" />
        </div>
        <div className="font-bold text-xl">Create your Account</div>
        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <input
              className="focus:outline-none border-2 border-black rounded-4xl p-3"
              type="text"
              placeholder="Enter your Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mt-2">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="focus:outline-none border-2 border-black rounded-4xl p-3"
              type="text"
              placeholder="Enter your Email"
              required
            />
          </div>
          <div className="w-50">
            <p className="text-xs">
              *This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </p>
          </div>
          <div className="mt-2">
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="focus:outline-none border-2 border-black rounded-4xl p-3"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="mt-2">
            <input
              onChange={(e) => setCheckPassword(e.target.value)}
              className="focus:outline-none border-2 border-black rounded-4xl p-3"
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <div className="mt-2 flex-center">
            <button className="bg-purple-950 px-3 py-2 rounded-md text-white">
              Register
            </button>
          </div>
          <p>Already have an account? </p>
          <Link to="/login">
            <p className="text-purple-950">Sign in</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { setAlert })(Register);
