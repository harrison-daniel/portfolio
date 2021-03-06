import React from "react";
import headshotImage from "../assets/headshot.jpg";
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-scroll";


const Home = () => {
  return (
    <div name="home" className="h-screen w-full bg-gradient-to-b from-black via-black to-gray-400">
      <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row">
        <div className="flex flex-col justify-center h-full">
          <h2 className="text-4xl sm:text-7xl font-bold text-white">
            My Portfolio
            </h2>
          <p className="text-gray-500 py-4 max-w-md">
            Coming from the SaaS industry and working for small start-ups, I've seen all sides of creating and managing applications. I'm seeking new opportunities to pursue my passion for technology using the skills I've learned from the University of Richmond Bootcamp.
          </p>

          <div>
            <Link to="portfolio" smooth duration={500} className="group text-white w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer">
              Portfolio
              <span className="group-hover:rotate-90 duration-300">
              <BsArrowRightShort size={25} className="ml-1" />
              </span>
            </Link>
          </div>
        </div>

        <div>
          <img src={headshotImage} alt="my professional headshot" className="rounded-2xl mx-auto w-2/3 md:w-full" />
        </div>

      </div>
  </div>
  );
};

export default Home;