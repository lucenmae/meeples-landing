'use client';
import Image from "next/image";
import React from 'react';

import LogoText from '../LogoText';
import NextImage from '../NextImage';
import { Highlight } from '../ui/hero-highlight';


export function HeroSection() {
  return (
    <section className='bg-[#f9f9f9]'>
      <nav className='bg-white shadow-sm border-gray-200 py-2.5 mt-5 relative  z-10'>
        <div className='flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto'>
          <LogoText />
          <div className='flex items-center lg:order-2'>
            <div className='hidden mt-2 mr-4 sm:inline-block'>
              <span></span>
            </div>

            <a
              href='https://themesberg.com/product/tailwind-css/landing-page'
              className='text-[#0535a1] border  border-[#0535a1] bg-[#ffffff] hover:bg-blue-900 hover:text-white focus:ring-4 focus:ring-purple-300 font-medium rounded-sm text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0'
            >
              Connect Now
            </a>
            <button
              data-collapse-toggle='mobile-menu-2'
              type='button'
              className='inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
              aria-controls='mobile-menu-2'
              aria-expanded='true'
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='w-6 h-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                  clip-rule='evenodd'
                ></path>
              </svg>
              <svg
                className='hidden w-6 h-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clip-rule='evenodd'
                ></path>
              </svg>
            </button>
          </div>
          <div
            className='items-center justify-between w-full lg:flex lg:w-auto lg:order-1'
            id='mobile-menu-2'
          >
            <ul className='flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
              <li>
                <a
                  href='/'
                  className='block py-2 pl-3 pr-4 bg-[#0535a1] rounded lg:bg-transparent text-[#0535a1] lg:p-0 '
                  aria-current='page'
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0  lg:p-0'
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className='grid h-screen  max-w-screen-xl px-4 pb-8 mx-auto lg:gap-8 xl:gap-0  lg:grid-cols-12'>

        <div className='flex flex-col justify-center text-left  lg:col-span-6 relative z-10'>
          <h1 className='max-w-4xl mb-4 leading-[1.2] text-5xl font-extrabold text-black'>
            Building the{' '}
            <Highlight className='text-black leading-[1.5]'>
              next <br /> generation of leaders
            </Highlight>
          </h1>
          <p className='text-gray-500 max-w-lg mb-5'>
          Patriot helps you connect deeply with your community. By understanding your people, it creates personalized communication channels and targeted outreach, making leadership feel closer and more meaningful.
          </p>

          <div className='space-y-4 sm:flex sm:space-y-0 sm:space-x-4'>
            <a
              href=''
              target='_blank'
              className='inline-flex items-center justify-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-white bg-[#0535a1] border border-gray-200 rounded-sm sm:w-auto focus:outline-none hover:border-[#0535a1] hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200'
            >
              Connect Now
            </a>
          </div>
        </div>
        <div className='flex flex-col justify-center lg:col-span-6 lg:mt-0  '>
          <NextImage
            src='/images/hero-image.jpg'
            alt='hero image'
            width={640}
            height={426}
          />
        </div>
      </div>
      <div
        className='absolute inset-0 bg-cover h-screen bg-center z-0'
        style={{
          backgroundImage: 'url("/images/bg.jpg")',
          opacity: 0.05,
        }}
      ></div>
      <section className="z-10">
        {/* Team */}
    <div className='mx-auto max-w-7xl sm:py-4 lg:px-8 flex flex-col items-center text-center justify-center'>
            <h2 className="text-4xl sm:text-65xl font-bold text-center text-[#0535a1]">Our team believes  you deserve <br /> only the best</h2>
            <h3 className="text-2xl font-medium text-center pt-10 opacity-50">With Patriot, you're partnering with a team that shares your dedication to authenticity and excellence, ensuring every connection you make is meaningful and impactful.</h3>
            <div className='grid grid-cols-1 my-16'>
                <Image src="/images/team.jpg" alt="team-image" height={684} width={1196}  className='rounded-sm'/>
  
            </div>
        </div>
    </section>
    <section>
    <div className="bg-[#0535a1] py-20 marginFeature ">
                <div className='mx-auto max-w-7xl sm:py-4 lg:px-8 '>
                    <div className="text-left pt-48 pb-10 md:pt-96 sm:mt-0">
                        <h3 className="text-4xl sm:text-6xl font-bold text-white my-2">Bringing leaders and communities closer.</h3>
                        <h3 className="text-4xl sm:text-6xl font-bold text-white text-opacity-75 my-2">Cultivating trust and genuine bonds.</h3>
                        <h3 className="text-4xl sm:text-6xl font-bold text-white text-opacity-50 my-2">Together, we shape a brighter future.</h3>
                    </div>
                </div>
            </div>
    </section>
    </section>
  );
}



export default HeroSection;