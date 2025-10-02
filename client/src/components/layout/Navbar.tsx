import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="w-full h-15 blue-nav text-white flex items-center justify-between">
      <div className="mr-15">
        <h1 className="font-bold text-md sm:text-lg pl-1 w-auto">
          <Link to="/" className="flex-center">
            <img src="registerUserSvg.svg" alt="logo" className="w-7 h-7" />
            <p> Dev Connector</p>
          </Link>
        </h1>
      </div>
      <div className="space-x-6 pr-1 text-sm sm:text-md">
        <Link to="#">Developers</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Navbar;
