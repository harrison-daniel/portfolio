import React from "react";
import html from "../assets/html.png";
import css from "../assets/css.png";
import javascript from "../assets/javascript.png";
import reactImage from "../assets/react.png";
import graphql from "../assets/graphql.png";
import github from "../assets/github.png";
import tailwind from "../assets/tailwind.png";

const AboutMe = () => {
  const techs = [
    {
      id: 1,
      src: html,
      title: "HTML",
    },
    {
      id: 2,
      src: css,
      title: "CSS",
      
    },
    {
      id: 3,
      src: tailwind,
      title: "Tailwind",
      
    },
    {
      id: 4,
      src: reactImage,
      title: "React",
      
    },
    {
      id: 5,
      src: javascript,
      title: "Javascript",
      
    },
    {
      id: 7,
      src: graphql,
      title: "GraphQL",
      
    },
    {
      id: 8,
      src: github,
      title: "GitHub",
      
    },
  ];

  return (
    <div
    name="about"
    className="w-full h-screen bg-gradient-to-b from-gray-800 to-black text-white">
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">About</p>
        </div>

        <p className="text-xl mt-20">
          I'm looking to advance my career in the SaaS industry through the skills gained from the University of Richmond Bootcamp and my Hospitality degree. These paired together have provided me an understanding of both the customer side of applications and how to best build and enhance them.
        </p>

        <br />
          I have knowledge of both front end and back-end technologies. I'm familiar with version control and working with other people on team initiatives.

          Below are some of the technologies I have worked with.

        <p classNAme="text-xl">

        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-8 text-center py-8 px-12 sm:px-0">
          {techs.map(({ id, src, title, style }) => (
            <div
              key={id}
              className={`shadow-md hover:scale-105 duration-500 py-2 rounded-lg ${style}`}
            >
              <img src={src} alt="" className="w-20 mx-auto" />
              <p className="mt-4">{title}</p>
            </div>
          ))}
        </div>
          
        </p>
      </div>
    </div>
  );
};

export default AboutMe;