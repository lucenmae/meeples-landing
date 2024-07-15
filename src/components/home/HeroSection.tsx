import Link from "next/link";
import React, { useState } from "react";

import Card from '@/components/ui/cards';

import Logo from "../Logo";
import NextImage from "../NextImage";
import { FlipWords } from "../ui/flip-words";
import { Boxes } from "../ui/background-boxes";


export function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const words = ["PLAY", "CONNECT", "THRIVE"];

  return (
    
    <section className="bg-[#F3F3F3] ">
           
<div className="absolute inset-0 w-full bg-[#F3F3F3] z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <nav className="absolute w-full top-5 py-5 z-30 ">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="w-full flex flex-col lg:flex-row">
            {/* Logo and Menu Button */}
            <div className="flex justify-between lg:hidden px-4">
              <Link href="/" aria-label="Meeples" className="flex items-center ">
                <NextImage
                  useSkeleton
                  src="/images/meeples-wordmark.png"
                  alt="meeples wordmark"
                  width={200}
                  height={115}
                />
              </Link>
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen ? "true" : "false"}
                onClick={handleToggleMenu}
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed. */}
                <svg
                  className={isMenuOpen ? "hidden h-6 w-6 cursor-none" : "block h-6 w-6 cursor-none" }
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="black"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
                {/* Icon when menu is open. */}
                <svg
                  className={isMenuOpen ? "block h-6 w-6 cursor-none" : "hidden h-6 w-6 cursor-none"}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="black"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            <div
              className={
                isMenuOpen
                  ? "max-sm:bg-white  w-full lg:flex justify-between py-5 max-lg:mt-1 max-lg:px-4 max-lg:shadow-lg max-lg:shadow-gray-200 max-lg:h-auto max-lg:overflow-auto transition-all duration-500 delay-200"
                  : " max-sm:bg-white hidden w-full lg:flex justify-between py-5 max-lg:mt-1 max-lg:px-4 max-lg:shadow-lg max-lg:shadow-gray-200 max-lg:h-auto max-lg:overflow-auto transition-all duration-500 delay-200"
              }
              id="navbar"
            >
              <ul className="flex lg:items-center max-lg:gap-4 max-lg:mb-4 flex-col mt-4 lg:flex-1 md:mt-0 lg:flex-row ">
                <li>
                  <a href="#" className="cursor-none text-sm font-semibold leading-6 text-gray-900">
                    <button className="cursor-none inline-block px-6 py-2.5 text-md font-bold text-center text-black bg-white border-2 border-black rounded-md shadow-[5px_5px_0px_#000] transition-all ease-linear hover:bg-yellow-400 hover:-translate-y-1 active:shadow-none active:translate-y-1 mr-4 btn-tooltip tooltip" data-tooltip="can I join? 🥺">
                      Rent
                    </button>
                  </a>
                </li>
                <li>
                  <a href="#" className="cursor-none  text-sm font-semibold leading-6 text-gray-900">
                    <button className="cursor-none inline-block px-5 py-2.5 text-md font-bold text-center text-black bg-white border-2 border-black rounded-md shadow-[5px_5px_0px_#000] transition-all ease-linear hover:bg-yellow-400 hover:-translate-y-1 active:shadow-none active:translate-y-1 mr-4 btn-tooltip tooltip" data-tooltip="let's play? 😍">
                      Games
                    </button>
                  </a>
                </li>
              </ul>
              {/* Logo */}
              <div className="hidden lg:flex items-center cursor-none">
                <Logo />
              </div>
              {/* Action Buttons */}
              <div className="flex lg:items-center justify-start flex-col lg:flex-row max-lg:gap-4 lg:flex-1 lg:justify-end">
                <a href="#" className="cursor-none  text-sm font-semibold leading-6 text-gray-900 tooltip-container">
                  <button className="cursor-none inline-block px-5 py-2.5 text-md font-bold text-center text-black bg-white border-2 border-black rounded-md shadow-[5px_5px_0px_#000] transition-all ease-linear hover:bg-yellow-400 hover:-translate-y-1 active:shadow-none active:translate-y-1 mr-4 btn-tooltip tooltip" data-tooltip="games! 🎲💛">
                    About
                  </button>
                </a>
                <a
                  href="https://discord.gg/vxDY3U8Bwn"
                  className="text-sm font-semibold leading-6 text-gray-900 cursor-none tooltip-container "
                >
                  <button className="btn-tooltip tooltip cursor-none inline-block px-5 py-2.5 text-xl font-bold text-center text-white bg-indigo-500 border-2 border-black rounded-md shadow-[5px_5px_0px_#000] transition-all ease-linear transform scale-90 hover:bg-white hover:text-indigo-500 hover:border-indigo-500 hover:shadow-[5px_5px_0px_#6366F1] hover:-translate-y-1 active:bg-indigo-500 active:border-gray-800 active:text-white active:shadow-none active:translate-y-1 " data-tooltip="please join 🥺">
                    Join Discord
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-80 h-full flex flex-col items-center justify-center py-20 text-gray-800">
        <div className="h-screen flex flex-col items-center justify-center flex-1">
          <div className="h-1/2  flex flex-col items-center justify-center">
            <h1 className="motto shadow-[5px_5px_0px_#2b2a28] md:text-4xl lg:text-7xl sm:text-xl uppercase relative z-20 font-poppins font-black text-center">
              <FlipWords words={words} /> <br />
            </h1>
            <p className="text-center mt-20 font-semibold text-lg relative z-20 max-w-3xl">
              LSU Meeples - An Interest-Based Organization at La Salle University Ozamiz City Promoting Tabletop Games
            </p>
          </div>
          <div className="mt-24 flex items-center justify-center z-30">
          <Card />
        </div>
        </div>

 
      </div>

    </section>
    
  );
}

export default HeroSection;
