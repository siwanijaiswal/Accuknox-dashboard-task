import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center w-full h-screen bg-gradient-to-r from-[#fc5c7d] to-[#6a82fb] ">
        <h1 className="text-4xl text-white">Welcome to Home page </h1>
        <Link to="/dashboard">
          <button className="border-1 text-xl rounded-md px-8 text-white py-3 m-3 bg-sky-500">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
