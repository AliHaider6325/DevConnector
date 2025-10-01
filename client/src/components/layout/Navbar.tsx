const Navbar = () => {
  return (
    <div className="w-full h-15 blue-nav text-white flex items-center justify-between">
      <div className="mr-15">
        <h1 className="font-bold text-md sm:text-lg pl-1 w-auto">
          Dev Connector
        </h1>
      </div>
      <div className="space-x-6 pr-1 text-sm sm:text-md">
        <a href="#">Developers</a>
        <a href="#">Register</a>
        <a href="#">Login</a>
      </div>
    </div>
  );
};

export default Navbar;
