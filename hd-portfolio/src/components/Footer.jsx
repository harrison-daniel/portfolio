import React from "react";
import { FaLinkedin,  } from 'react-icons/fa';
// FaGithub
// import { HiOutlineMail } from 'react-icons/hi';
// import { BsFillPersonLinesFill } from 'react-icons/bs';


const Footer = () => {

  

  return (
    
      <ul>
        <li className="flex justify-between items-center w-40 h-14 px-4 ml-[-100px] hover:ml-[-10px] hover:rounded-md duration-300 bg-gray-500">
          <a href="https://www.linkedin.com/in/harrisondaniel/" target="blank" className="flex justify-between items-center w-full text-white">
            <>
              Linkedin <FaLinkedin size={30} />
            </>
          </a>
        </li>
      </ul>
    
  );
}

export default Footer;