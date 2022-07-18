import React from "react";

const About = () => {
  return (
    <div
    name="about"
    className="w-full h-screen bg-gradient-to-b from-gray-800 to-black text-white">
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">About</p>
        </div>

        <p className="text-xl mt-20">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas vero asperiores, voluptates est eius molestias libero omnis at alias, amet, tempora deserunt! Saepe ipsa illo perspiciatis nam atque, quod sed.
        </p>

        <br />

        <p classNAme="text-xl">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae iure, assumenda quibusdam impedit reiciendis expedita reprehenderit, iusto aperiam laboriosam quod voluptas corrupti obcaecati. Odio assumenda est voluptatum pariatur aliquid asperiores.
        </p>
      </div>
    </div>
  );
};

export default About;