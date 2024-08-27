'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';

import LogoText from '../LogoText';
import NextImage from '../NextImage';
import { Highlight } from '../ui/hero-highlight';

export function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

    //smooth scroll
    const aboutRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: React.RefObject<HTMLDivElement>) => {
    if (section.current) {
      section.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className='bg-[#f9f9f9]'>
      <nav className='bg-white px-2 sm:px-4 py-5 rounded shadow relative z-10'>
        <div className='container flex flex-wrap justify-between items-center mx-auto'>
          <LogoText />

          <button
            id='menu-toggle'
            type='button'
            className='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
            onClick={toggleMenu}
          >
            <span className='sr-only'>Open main menu</span>
            {/* Hamburger icon */}
            <svg
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16m-7 6h7'
              />
            </svg>
          </button>

          <div
            className={`w-full md:block md:w-auto ${
              isMenuOpen ? '' : 'hidden'
            }`}
            id='mobile-menu'
          >
            <ul className='flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium'>
              <li>
                <a
                    onClick={() => scrollToSection(aboutRef)}
                  className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  '
                >
                  About
                </a>
              </li>
              <li>
                <a
                  onClick={() => scrollToSection(contactRef)}
                  className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  '
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
            Patriot helps you connect deeply with your community. By
            understanding your people, it creates personalized communication
            channels and targeted outreach, making leadership feel closer and
            more meaningful.
          </p>

          <div className='space-y-4 sm:flex sm:space-y-0 sm:space-x-4'>
            <a
              href=''
              target='_blank'
              className='inline-flex items-center justify-center lg:w-md sm:max-w-md px-5 py-3 mb-2 mr-2 text-sm font-medium text-white bg-[#0535a1] border border-gray-200 rounded-sm sm:w-auto focus:outline-none hover:border-[#0535a1] hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 '
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
      <section className='z-10'>
        {/* Team */}
        <div className='mx-auto max-w-7xl sm:py-4 lg:px-8 flex flex-col items-center text-center justify-center'>
          <h2 className='text-4xl sm:text-65xl font-bold text-center text-[#0535a1] capitalize'>
            Our team believes you deserve <br /> only the best
          </h2>
          <h3 className='text-2xl font-medium text-center pt-10 opacity-50'>
            With Patriot, you're partnering with a team that shares your
            dedication to authenticity and excellence, ensuring every connection
            you make is meaningful and impactful.
          </h3>
          <div className='grid grid-cols-1 my-16'>
            <Image
              src='/images/team.jpg'
              alt='team-image'
              height={684}
              width={1196}
              className='rounded-sm'
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <div className='bg-[#0535a1] py-20 marginFeature '>
          <div className='mx-auto max-w-7xl sm:py-4 lg:px-8 '>
            <div className='text-left  pt-48 pb-10 md:pt-96 sm:mt-36 lg:mt-0'>
              <h3 className='lg:text-6xl sm:text-3xl sm:text-center lg:text-left font-bold text-white my-2'>
                Bringing leaders and communities closer.
              </h3>
              <h3 className='lg:text-6xl sm:text-3xl sm:text-center lg:text-left font-bold text-white text-opacity-75 my-2'>
                Cultivating trust and genuine bonds.
              </h3>
              <h3 className='lg:text-6xl sm:text-3xl sm:text-center lg:text-left font-bold text-white text-opacity-50 my-2'>
                Together, we shape a brighter future.
              </h3>
            </div>
          </div>
        </div>
      </section>
      {/* About Us */}
      <section ref={aboutRef} id='about-us-section' >
        <div className='mx-auto max-w-7xl px-4 my-32 lg:px-10 bg-lightgrey rounded-3xl relative'>
          <div className='flex flex-col items-center justify-center my-10 '>
            <NextImage
              useSkeleton
              src='/images/patriot-logo.png'
              alt='patriot logo'
              width={400}
              height={215}
            />
          </div>
          <div className='bg-[#0535a1] rounded-sm mt-16 pt-10 pl-8 pb-10 pr-6 shadow-xl group'>
            <h4 className='text-4xl text-white font-semibold  mb-5 capitalize'>
              About Us
            </h4>
            <h4 className='text-lg  text-white font-normal mb-5'>
              At Patriot, we're all about bringing leaders closer to their
              communities. Our team is here to help make your connections
              heartfelt and impactful, ensuring that every relationship feels
              genuine.
            </h4>
          </div>
          <div className='bg-white border-2 border-blue-700 rounded-sm mt-16 pt-10 pl-8 pb-10 pr-6 shadow-xl group'>
            <h4 className='text-4xl text-gray-800 font-semibold  mb-5'>
              Vision
            </h4>
            <h4 className='text-lg   text-gray-800 font-normal mb-5'>
              We dream of a world where leaders and communities are truly
              connected, built on trust and understanding. Our aim is to make
              these bonds real and meaningful, so they create positive and
              lasting change.
            </h4>
          </div>
          <div className='border-2 border-blue-700 rounded-sm mt-16 pt-10 pl-8 pr-6 shadow-xl group'>
            <h4 className='text-4xl text-gray-800 font-semibold  mb-5'>
              Mission
            </h4>
            <h4 className='text-lg  text-gray-800 font-normal mb-5'>
              Our mission is to help leaders:
            </h4>
            <ul className='list-disc pl-10  text-gray-800 text-lg'>
              <li className='mb-2'>
                <strong>Connect with Care:</strong> Build authentic, meaningful
                relationships with your community.
              </li>
              <li className='mb-2'>
                <strong>Understand Better:</strong> Learn what really matters to
                your audience.
              </li>
              <li className='mb-2'>
                <strong>Inspire and Engage:</strong> Reach out in ways that
                truly resonate and make a difference.
              </li>
            </ul>
            <p className='text-lg text-white text-center mt-6'>
              Let's work together to make every connection count and build a
              future where leaders and communities thrive together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section ref={contactRef} id='contact-us-section' className='bg-white my-32 '>
        <div className='mx-auto max-w-7xl sm:py-4 lg:px-8 flex flex-col items-center text-center justify-center'>
          <h2 className='text-4xl sm:text-65xl font-bold text-center text-[#0535a1] capitalize'>
            Get In Touch
          </h2>
          <h3 className='text-2xl font-medium text-center pt-10 opacity-50'>
            We are here to help you. Reach out to us via any of the following
            methods.
          </h3>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 animate-fadeIn lg:mx-28'>
          <div className='p-4 shadow-lg rounded-sm bg-blue-100 hover:bg-blue-200 transition-colors'>
            <h3 className='text-xl font-bold'>Call Us</h3>
            <p className='text-gray-700 mt-2'>+1 123 456 7890</p>
          </div>
          <div className='p-4 shadow-lg  rounded-sm bg-blue-100 hover:bg-blue-200 transition-colors'>
            <h3 className='text-xl font-bold'>Email Us</h3>
            <p className='text-gray-700 mt-2'>contact@patriot.ph</p>
          </div>
          <div className='p-4 shadow-lg  rounded-sm bg-blue-100 hover:bg-blue-200 transition-colors'>
            <h3 className='text-xl font-bold'>Visit Us</h3>
            <p className='text-gray-700 mt-2'>
              Six Sisters Building, Mandaue City, Cebu
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}

      <footer className='bg-white'>
        <div className='max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8'>
          <div className='flex justify-center mt-8 space-x-6'>
          <a href='#' className='text-gray-400 hover:text-gray-500'>
              <span className='sr-only'>LinkedIn</span>
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                fill='currentColor'
                version='1.1'
                id='Layer_1'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 310 310'
              >
                <g>
                  {' '}
                  <g id='XMLID_801_'>
                    {' '}
                    <path
                      id='XMLID_802_'
                      d='M72.16,99.73H9.927c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5H72.16c2.762,0,5-2.238,5-5V104.73 C77.16,101.969,74.922,99.73,72.16,99.73z'
                    />{' '}
                    <path
                      id='XMLID_803_'
                      d='M41.066,0.341C18.422,0.341,0,18.743,0,41.362C0,63.991,18.422,82.4,41.066,82.4 c22.626,0,41.033-18.41,41.033-41.038C82.1,18.743,63.692,0.341,41.066,0.341z'
                    />{' '}
                    <path
                      id='XMLID_804_'
                      d='M230.454,94.761c-24.995,0-43.472,10.745-54.679,22.954V104.73c0-2.761-2.238-5-5-5h-59.599 c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5h62.097c2.762,0,5-2.238,5-5v-98.918c0-33.333,9.054-46.319,32.29-46.319 c25.306,0,27.317,20.818,27.317,48.034v97.204c0,2.762,2.238,5,5,5H305c2.762,0,5-2.238,5-5V194.995 C310,145.43,300.549,94.761,230.454,94.761z'
                    />{' '}
                  </g>{' '}
                </g>
              </svg>
            </a>
            <a href='#' className='text-gray-400 hover:text-gray-500'>
              <span className='sr-only'>Facebook</span>
              <svg
                className='w-6 h-6'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  fill-rule='evenodd'
                  d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                  clip-rule='evenodd'
                ></path>
              </svg>
            </a>
            <a href='#' className='text-gray-400 hover:text-gray-500'>
              <span className='sr-only'>Instagram</span>
              <svg
                className='w-6 h-6'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  fill-rule='evenodd'
                  d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
                  clip-rule='evenodd'
                ></path>
              </svg>
            </a>
          </div>
          <p className='mt-8 text-base leading-6 text-center text-gray-400'>
            © {new Date().getFullYear()} Patriot. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  );
}

export default HeroSection;
