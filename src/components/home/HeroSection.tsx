'use client';
import Image from "next/image";
import React from 'react';

import LogoText from '../LogoText';
import NextImage from '../NextImage';
import { Highlight } from '../ui/hero-highlight';


export function HeroSection() {
<<<<<<< HEAD
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
=======
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const words = ['PLAY', 'CONNECT', 'THRIVE'];

  // Most Played Games
  const cardDataArray = [
    {
      src: '/images/cards/Uno.jpg',
      alt: 'Uno',
      title: 'Uno',
      description:
        'a fast-paced card game where players race to match colors and numbers.',

      link: 'https://boardgamegeek.com/boardgame/2223/uno',
    },
    {
      src: '/images/cards/Coup.jpg',
      alt: 'Coup',
      title: 'Coup',
      description:
        "a game of bluffing and deception where players compete to eliminate opponents' influence.",

      link: 'https://boardgamegeek.com/boardgame/131357/coup',
    },
    {
      src: '/images/cards/onuw.jpg',
      alt: 'One Night Ultimate Werewolf',
      title: 'One Night Ultimate Werewolf',
      description:
        'a social deduction game where players take on secret roles to unmask the werewolves.',
      link: 'https://boardgamegeek.com/boardgame/147949/one-night-ultimate-werewolf',
    },
    {
      src: '/images/cards/Catan.jpg',
      alt: 'Catan Board Game',
      title: 'Catan',
      description:
        'a multiplayer board game where players build and trade resources to dominate the island.',

      link: 'https://boardgamegeek.com/boardgame/13/catan',
    },
  ];

  // Games Inventory
  const gameInventory = [
    {
      src: '/images/cards/Uno.jpg',
      alt: 'Uno',
      title: 'Uno',
      description:
        'a fast-paced card game where players race to match colors and numbers.',

      link: 'https://boardgamegeek.com/boardgame/2223/uno',
    },
    {
      src: '/images/cards/Coup.jpg',
      alt: 'Coup',
      title: 'Coup',
      description:
        "a game of bluffing and deception where players compete to eliminate opponents' influence.",

      link: 'https://boardgamegeek.com/boardgame/131357/coup',
    },
    {
      src: '/images/cards/onuw.jpg',
      alt: 'One Night Ultimate Werewolf',
      title: 'One Night Ultimate Werewolf',
      description:
        'a social deduction game where players take on secret roles to unmask the werewolves.',
      link: 'https://boardgamegeek.com/boardgame/147949/one-night-ultimate-werewolf',
    },
    {
      src: '/images/cards/Catan.jpg',
      alt: 'Catan Board Game',
      title: 'Catan',
      description:
        'a multiplayer board game where players build and trade resources to dominate the island.',

      link: 'https://boardgamegeek.com/boardgame/13/catan',
    },
    {
      src: '/images/cards/guess-who.jpg',
      alt: 'Guess Who? Board Game',
      title: 'Guess Who?',
      description: 'A fun deduction game for two players.',
      link: 'https://boardgamegeek.com/boardgame/4143/guess-who',
    },
    {
      src: '/images/cards/scrabble.jpg',
      alt: 'Scrabble Board Game',
      title: 'Scrabble',
      description: 'The classic word game for vocabulary enthusiasts.',
      link: 'https://boardgamegeek.com/image/335812/guess-who',
    },
    {
      src: '/images/cards/exploding-kittens.jpg',
      alt: 'Exploding Kittens Board Game',
      title: 'Exploding Kittens',
      description: 'A highly-strategic, kitty-powered card game.',
      link: 'https://boardgamegeek.com/boardgame/172225/exploding-kittens',
    },
    {
      src: '/images/cards/sequence.jpg',
      alt: 'Sequence Board Game',
      title: 'Sequence',
      description: 'An exciting game of strategy and luck.',
      link: 'https://boardgamegeek.com/image/212893/sequence',
    },
    {
      src: '/images/cards/here-to-slay.jpg',
      alt: 'Here to Slay Board Game',
      title: 'Here to Slay',
      description: 'A strategic card game with role-playing elements.',
      link: 'https://boardgamegeek.com/boardgame/299252/here-to-slay',
    },
    {
      src: '/images/cards/munchkin.jpg',
      alt: 'Munchkin Board Game',
      title: 'Munchkin',
      description: 'A fun and fast-paced dungeon-crawling card game.',
      link: 'https://boardgamegeek.com/image/1871016/munchkin',
    },
    {
      src: '/images/cards/avalon.jpg',
      alt: 'The Resistance: Avalon Board Game',
      title: 'The Resistance: Avalon',
      description: 'A game of deception and deduction in the Arthurian legend.',
      link: 'https://boardgamegeek.com/image/1398895/the-resistance-avalon',
    },
    {
      src: '/images/cards/unstable.jpg',
      alt: 'Unstable Unicorns Board Game',
      title: 'Unstable Unicorns',
      description: 'A strategic card game about building a unicorn army.',
      link: 'https://boardgamegeek.com/image/3912914/unstable-unicorns',
    },
    {
      src: '/images/cards/clue.jpg',
      alt: 'Cluedo aka Clue Board Game',
      title: 'Cluedo',
      description: 'A classic mystery game of who, what, and where.',
      link: 'https://boardgamegeek.com/image/7563466/clue',
    },
    // Add game cards here
  ];

 //smooth scroll
 const gamesRef = useRef<HTMLDivElement>(null);
 const aboutRef = useRef<HTMLDivElement>(null);

 const scrollToSection = (section: React.RefObject<HTMLDivElement>) => {
  if (section.current) {
    section.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

  return (
    <section className='bg-[#F3F3F3] '>
      <div className='absolute inset-0 w-full bg-[#F3F3F3] z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none' />
      <nav className='absolute w-full top-5 py-5 z-30 '>
      <div className='mx-auto max-w-7xl lg:px-8'>
        <div className='w-full flex flex-col lg:flex-row'>
          {/* Logo and Menu Button */}
          <div className='flex justify-between lg:hidden px-4'>
            <Link
              href='/'
              aria-label='Meeples'
              className='flex items-center '
            >
              <NextImage
                useSkeleton
                src='/images/meeples-wordmark.png'
                alt='meeples wordmark'
                width={200}
                height={115}
              />
            </Link>
            <button
              type='button'
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black'
              aria-controls='mobile-menu'
              aria-expanded={isMenuOpen ? 'true' : 'false'}
              onClick={handleToggleMenu}
            >
              <span className='sr-only'>Open main menu</span>
              {/* Icon when menu is closed. */}
              <svg
                className={
                  isMenuOpen
                    ? 'hidden h-6 w-6 cursor-none'
                    : 'block h-6 w-6 cursor-none'
                }
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='black'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16m-7 6h7'
                />
              </svg>
              {/* Icon when menu is open. */}
              <svg
                className={
                  isMenuOpen
                    ? 'block h-6 w-6 cursor-none'
                    : 'hidden h-6 w-6 cursor-none'
                }
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='black'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div
            className={
              isMenuOpen
                ? 'max-sm:bg-white  w-full lg:flex justify-between py-5 max-lg:mt-1 max-lg:px-4 max-lg:shadow-lg max-lg:shadow-gray-200 max-lg:h-auto max-lg:overflow-auto transition-all duration-500 delay-200'
                : ' max-sm:bg-white hidden w-full lg:flex justify-between py-5 max-lg:mt-1 max-lg:px-4 max-lg:shadow-lg max-lg:shadow-gray-200 max-lg:h-auto max-lg:overflow-auto transition-all duration-500 delay-200'
            }
            id='navbar'
          >
            <ul className='flex lg:items-center max-lg:gap-4 max-lg:mb-4 flex-col mt-4 lg:flex-1 md:mt-0 lg:flex-row '>
              <li>
              <a
                    href='https://forms.gle/hCtVuNhBpyzZkZCv5'
                    className='cursor-none text-sm font-semibold leading-6 text-gray-900'
                  >
                    <button
                      className='cursor-none inline-block px-6 py-2.5 text-md font-bold text-center text-black bg-white border-2 border-black rounded-md shadow-[5px_5px_0px_#000] transition-all ease-linear hover:bg-yellow-400 hover:-translate-y-1 active:shadow-none active:translate-y-1 mr-4 btn-tooltip tooltip'
                      data-tooltip='can I join? 🥺'
                    >
                      Rent
                    </button>
                  </a>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection(gamesRef)}
                  className='cursor-none  text-sm font-semibold leading-6 text-gray-900'
                >
                  <button
                    className='cursor-none inline-block px-5 py-2.5 text-md font-bold text-center text-black bg-white border-2 border-black rounded-md shadow-[5px_5px_0px_#000] transition-all ease-linear hover:bg-yellow-400 hover:-translate-y-1 active:shadow-none active:translate-y-1 mr-4 btn-tooltip tooltip'
                    data-tooltip="let's play? 😍"
                  >
                    Games
                  </button>
                </button>
              </li>
            </ul>
            {/* Logo */}
            <div className='hidden lg:flex items-center cursor-none'>
              <Logo />
            </div>
            {/* Action Buttons */}
            <div className='flex lg:items-center justify-start flex-col lg:flex-row max-lg:gap-4 lg:flex-1 lg:justify-end'>
              <button
                onClick={() => scrollToSection(aboutRef)}
                className='cursor-none  text-sm font-semibold leading-6 text-gray-900 tooltip-container'
              >
                <button
                  className='cursor-none inline-block px-5 py-2.5 text-md font-bold text-center text-black bg-white border-2 border-black rounded-md shadow-[5px_5px_0px_#000] transition-all ease-linear hover:bg-yellow-400 hover:-translate-y-1 active:shadow-none active:translate-y-1 mr-4 btn-tooltip tooltip'
                  data-tooltip='games! 🎲💛'
                >
                  About
                </button>
              </button>
              <a
                href='https://discord.gg/vxDY3U8Bwn'
                className='text-sm font-semibold leading-6 text-gray-900 cursor-none tooltip-container '
              >
                <button
                  className='btn-tooltip tooltip cursor-none inline-block px-5 py-2.5 text-xl font-bold text-center text-white bg-indigo-500 border-2 border-black rounded-md shadow-[5px_5px_0px_#000] transition-all ease-linear transform scale-90 hover:bg-white hover:text-indigo-500 hover:border-indigo-500 hover:shadow-[5px_5px_0px_#6366F1] hover:-translate-y-1 active:bg-indigo-500 active:border-gray-800 active:text-white active:shadow-none active:translate-y-1 '
                  data-tooltip='please join 🥺'
                >
                  Join Discord
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
      {/* HeroSection     */}
      <div className='pt-52 lg:pt-80 h-full flex flex-col items-center justify-center  text-gray-800'>
        <div className='h-screen flex flex-col items-center justify-center flex-1'>
          <div className='h-1/2 flex flex-col items-center justify-center'>
            <h1 className='motto shadow-[5px_5px_0px_#2b2a28] md:text-4xl lg:text-7xl sm:text-xl uppercase relative z-20 font-poppins font-black text-center'>
              <FlipWords words={words} /> <br />
            </h1>
            <p className='text-center mt-20 font-semibold text-lg relative z-20 max-w-3xl'>
              LSU Meeples - An Interest-Based Organization at La Salle
              University Ozamiz City Promoting Tabletop Games
            </p>
          </div>
>>>>>>> parent of 8505517 (fix: about button small screen location)

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

<<<<<<< HEAD
          <div className='space-y-4 sm:flex sm:space-y-0 sm:space-x-4'>
            <a
              href=''
              target='_blank'
              className='inline-flex items-center justify-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-white bg-[#0535a1] border border-gray-200 rounded-sm sm:w-auto focus:outline-none hover:border-[#0535a1] hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200'
            >
              Connect Now
            </a>
=======
          {/* Games Inventory */}
          <div ref={gamesRef} id="games"  className='mt-28 z-20 relative'>
            <div className='absolute inset-x-0 top-5 max-w-md mx-auto border-4 bg-[#f5bf22] border-gray-800 shadow-[3px_3px_0px_#2b2a28] rounded-lg sm:px-0 md:px-2 lg:px-4 py-2 flex justify-center items-center transform -rotate-3'>
              <h4 className='md:text-xl lg:text-2xl sm:text-sm uppercase z-20 font-poppins font-black text-center'>
                Games Inventory
              </h4>
            </div>
            <div className=' border-4 bg-[#e2e2e2] border-gray-800 shadow-[5px_5px_0px_#2b2a28] rounded-lg px-4 py-2 mt-12'>
              <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 pb-10 pt-5 sm:pr-0 md:pr-0 lg:pr-10 align-middle justify-center items-center'>
                {gameInventory.map((inventory, index) => (
                  <Cards
                    key={index}
                    src={inventory.src}
                    alt={inventory.alt}
                    title={inventory.title}
                    description={inventory.description}
                    link={inventory.link}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* AboutSection     */}

          <div ref={aboutRef} id="games"className='h-screen flex flex-col items-center justify-center flex-1'>
            <div className='mt-20 z-20 relative'>
              <div className='absolute inset-x-0 top-5 max-w-md mx-auto border-4 bg-[#f5bf22] border-gray-800 shadow-[3px_3px_0px_#2b2a28] rounded-lg sm:px-0 md:px-2 lg:px-4 py-2 flex justify-center items-center transform -rotate-3'>
                <h4 className='md:text-xl lg:text-2xl sm:text-sm uppercase z-20 font-poppins font-black text-center'>
                  About Us
                </h4>
              </div>
              <div className='max-w-6xl px-4 py-2 mt-40'>
                <div className='w-full'>
                  <div className='flex flex-col w-full mb-10 sm:flex-row'>
                    <div className='w-full mb-10 sm:mb-0 sm:w-1/2'>
                      <div className='relative h-full ml-0 mr-0 sm:mr-10'>
                        <span className='absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#2b2a28] rounded-lg'></span>
                        <div className='relative h-full p-5 bg-white border-2 border-[#2b2a28] rounded-lg'>
                          <div className='flex items-center -mt-1'>
                            <h3 className='my-2 ml-3 text-lg font-bold text-gray-800'>
                              LSU Meeples
                            </h3>
                          </div>
                          <p className='mt-3 mb-1 text-xs font-medium text-[#2b2a28] uppercase'>
                            ------------
                          </p>
                          <p className='mb-2 text-gray-600'>
                            a passionate and inclusive tabletop games
                            organization dedicated tofostering a vibrant and
                            welcoming community for tabletop gaming enthusiasts
                            of all ages and backgrounds.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='w-full sm:w-1/2'>
                      <div className='relative h-full ml-0 md:mr-10'>
                        <span className='absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#2b2a28] rounded-lg'></span>
                        <div className='relative h-full p-5 bg-white border-2 border-[#2b2a28] rounded-lg'>
                          <div className='flex items-center -mt-1'>
                            <h3 className='my-2 ml-3 text-lg font-bold text-gray-800'>
                              Necessity
                            </h3>
                          </div>
                          <p className='mt-3 mb-1 text-xs font-medium text-[#2b2a28] uppercase'>
                            ------------
                          </p>
                          <p className='mb-2 text-gray-600'>
                            upholds the value of tabletop gaming, emphasizing
                            the social, intellectual, and emotional benefits of
                            face-to-face play. We believe in the power of shared
                            experiences and strategic interactions to enrich
                            lives and strengthen connections.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col w-full mb-5 sm:flex-row'>
                    <div className='w-full mb-10 sm:mb-0 sm:w-1/2'>
                      <div className='relative h-full ml-0 mr-0 sm:mr-10'>
                        <span className='absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#f5bf22] rounded-lg'></span>
                        <div className='relative h-full p-5 bg-white border-2 border-[#f5bf22] rounded-lg'>
                          <div className='flex items-center -mt-1'>
                            <h3 className='my-2 ml-3 text-lg font-bold text-gray-800'>
                              Vision
                            </h3>
                          </div>
                          <p className='mt-3 mb-1 text-xs font-medium text-[#f5bf22] uppercase'>
                            ------------
                          </p>
                          <p className='mb-2 text-gray-600'>
                            to create an inclusive and vibrant community that
                            celebrates the joy of tabletop gaming, encourages
                            learning and personal growth, and inspires lifelong
                            friendships.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='w-full mb-10 sm:mb-0 sm:w-1/2'>
                      <div className='relative h-full ml-0 mr-0 sm:mr-10'>
                        <span className='absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#f5bf22] rounded-lg'></span>
                        <div className='relative h-full p-5 bg-white border-2 border-[#f5bf22] rounded-lg'>
                          <div className='flex items-center -mt-1'>
                            <h3 className='my-2 ml-3 text-lg font-bold text-gray-800'>
                              Mission
                            </h3>
                          </div>
                          <p className='mt-3 mb-1 text-xs font-medium text-[#f5bf22] uppercase'>
                            ------------
                          </p>
                          <p className='mb-2 text-gray-600'>
                            to promote creativity, critical thinking, social
                            interaction, and teamwork through the joy of playing
                            tabletop games. We aim to provide a safe and
                            enjoyable space where individuals can explore
                            various tabletop games, learn new skills, and forge
                            lasting friendships.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='w-full sm:w-1/2'>
                      <div className='relative h-full ml-0 md:mr-10'>
                        <span className='absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#f5bf22] rounded-lg'></span>
                        <div className='relative h-full p-5 bg-white border-2 border-[#f5bf22] rounded-lg'>
                          <div className='flex items-center -mt-1'>
                            <h3 className='my-2 ml-3 text-lg font-bold text-gray-800'>
                              Values
                            </h3>
                          </div>
                          <p className='mt-3 mb-1 text-xs font-medium text-[#f5bf22] uppercase'>
                            ------------
                          </p>
                          <p className='mb-2 text-gray-600'>
                            we value inclusivity by embracing diversity and
                            making everyone feel welcome. Our passion for
                            tabletop gaming drives us to share this enthusiasm
                            with others. We focus on education by promoting
                            learning through play, and we're dedicated to
                            building a supportive community that fosters
                            meaningful connections.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
>>>>>>> parent of 8505517 (fix: about button small screen location)
          </div>

          


        </div>
<<<<<<< HEAD
        <div className='flex flex-col justify-center lg:col-span-6 lg:mt-0  '>
          <NextImage
            src='/images/hero-image.jpg'
            alt='hero image'
            width={640}
            height={426}
          />
        </div>
=======
        <footer className="mt-20 footer footer-center z-30 w-full p-4 bg-[#2b2a28] text-gray-200">
      <div className="text-center">
        <h3 className='my-5'>Come, Join Us! </h3>
        <p>
        © {new Date().getFullYear()} LSU Meeples
        </p>
      </div>
    </footer>
>>>>>>> parent of 8505517 (fix: about button small screen location)
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