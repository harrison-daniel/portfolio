import React from "react";
import gitpub from "../assets/gitpub.png";
import runbuddy from "../assets/run-buddy.png";
import careerCommander from "../assets/careerCommander.png";
import workDayScheduler from "../assets/workDayScheduler.png";


const Portfolio = () => {

  const portfolios = [
    {
      id: 1,
      src: gitpub
    },
    {
      id: 2,
      src: careerCommander
    },
    {
      id: 3,
      src: workDayScheduler
    },
    {
      id: 4,
      src: runbuddy
    }
    // {
    //   id: 5,
    //   src: runbuddy
    // }
  ]

  return (
  <div
    name="portfolio"
    className="bg-gradient-to-b from-black to-gray-800 w-full text-white md:h-screen">
    
    <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
      <div className="pb-8">
        <p className="text-4xl font-bold inline border-b-4 border-gray-500">Portfolio</p>
        <p className="py-6"></p>
      </div>


      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-0">
        {portfolios.map(({id, src}) => (
          <div key={id} className="shadow-md shadow-gray-600 rounded-lg">
            <img src={src} alt="gitpub beer logo" className="rounded-md duration-200 hover:scale-105" />
            <div className="flex items-center justify-center">
              <button className="w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105">Application</button>
              <button className="w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105">Github</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Portfolio;