import React from "react";
import { FaGithub } from "react-icons/fa";

function Nav({ onAboutClick, onLoginClick }) {
  return (
    <div className="flex w-full justify-between items-center p-2 sm:p-6 bg-black text-white fixed top-0 z-50">
      {/* Left Side: Website Logo Name */}
      <div className="text-center text-xl sm:text-3xl font-bold tracking-widest uppercase">
        SEAVPHOV
      </div>

      {/* Right Side: Buttons */}
      <div className="flex space-x-4">
        {/* Login Button */}
        <div className="text-white p-2 rounded-full bg-[#000000] hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:bg-green-700">
          <button
            onClick={onLoginClick}
            className="p-0 sm:p-1 text-base sm:text-lg font-semibold"
          >
            Login
          </button>
        </div>

        {/* About Button */}
        <div className="text-white p-2 rounded-full bg-[#000000] hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:bg-blue-700">
          <button
            onClick={onAboutClick}
            className="p-0 sm:p-1 text-base sm:text-lg font-semibold"
          >
            About
          </button>
        </div>

        {/* GitHub Button */}
        <div className="text-white p-2 rounded-full bg-[#000000] hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:bg-[#24292e]">
          <a
            href="https://github.com/Vichetsopheaktradev"
            target="_blank"
            rel="noreferrer"
            className="flex items-center"
          >
            <FaGithub className="text-xl sm:text-2xl" />
            &nbsp;
            <span className="hidden sm:block text-base sm:text-lg font-semibold">
              GitHub
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Nav;
