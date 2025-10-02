import { Link } from "react-router-dom";
const landing = () => {
  return (
    <div className="relative w-full h-screen bg-[url('/landingpage_bg.webp')] bg-cover bg-center bg-no-repeat">
      <div className="flex-center h-full pb-20">
        <div className="text-white flex-row items-center">
          <div className="ml-15 md:ml-60 lg:ml-70 my-3">
            <h1
              className="w-full text-xl lg:text-4xl md:text-2xl font-bold text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #FF3BFF, #ECBFBF, #5C24FF, #D94FD5)",
              }}
            >
              Welcome to DevConnector
            </h1>
          </div>

          <p className="text-sm text-white mx-5 lg:text-lg">
            Developer Community Having real social contacts can sometimes be
            difficult, everything becomes much simpler here!
          </p>
          <div className=" text-white flex justify-evenly sm:justify-center pt-5">
            <div className="bg-black text-white border border-white p-2 w-18 pt-1 text-md flex-center mx-5">
              <Link to="/login">
                <button className="">Login</button>
              </Link>
            </div>
            <div className="bg-black text-white border border-white p-2 w-18 pt-1 text-md flex-center">
              <Link to="/register">
                <button>SignUp</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default landing;
