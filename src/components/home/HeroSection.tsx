import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import Navbar from '@/components/layout/Navbar';
import Cards from '@/components/ui/cards';

import { FlipWords } from '../ui/flip-words';

interface Game {
  _id: string;
  name: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  imageUrl: string;
  bggLink: string;
}

export function HeroSection() {
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

  const [gameInventory, setGameInventory] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get<Game[]>('/api/games');
        setGameInventory(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  //smooth scroll
  const gamesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: React.RefObject<HTMLDivElement>) => {
    if (section.current) {
      section.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      const section = searchParams.get('section');
      if (section === 'games' && gamesRef.current) {
        gamesRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (section === 'about' && aboutRef.current) {
        aboutRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [searchParams]);

  return (
    <section className='bg-[#F3F3F3]'>
      <div className='absolute inset-0 w-full bg-[#F3F3F3] z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none' />
      <Navbar
        scrollToSection={scrollToSection}
        gamesRef={gamesRef}
        aboutRef={aboutRef}
        buttonClassName='cursor-none'
        logoClassName='cursor-none'
      />

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

          <div className='mt-28 z-20'>
            <div className='max-w-md mx-auto border-4 bg-[#f5bf22] border-gray-800   shadow-[3px_3px_0px_#2b2a28] rounded-lg px-4 py-2 flex justify-center items-center transform -rotate-3'>
              <h4 className='md:text-xl lg:text-2xl sm:text-sm uppercase z-20 font-poppins font-black text-center'>
                Most Played Games
              </h4>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 sm:pr-0 md:pr-0 lg:pr-24 align-middle justify-center items-center'>
              {cardDataArray.map((card, index) => (
                <Cards
                  key={index}
                  src={card.src}
                  alt={card.alt}
                  title={card.title}
                  description={card.description.length > 102 
                    ? card.description.substring(0, 102) + '...' 
                    : card.description}
                  link={card.link}
                />
              ))}
            </div>
          </div>

          {/* Games Inventory */}
          <div ref={gamesRef} id='games' className='mt-28 z-20 relative'>
            <div className='absolute inset-x-0 top-5 max-w-md mx-auto border-4 bg-[#f5bf22] border-gray-800 shadow-[3px_3px_0px_#2b2a28] rounded-lg sm:px-0 md:px-2 lg:px-4 py-2 flex justify-center items-center transform -rotate-3'>
              <h4 className='md:text-xl lg:text-2xl sm:text-sm uppercase z-20 font-poppins font-black text-center'>
                Games Inventory
              </h4>
            </div>
            <div className=' border-4 bg-[#e2e2e2] border-gray-800 shadow-[5px_5px_0px_#2b2a28] rounded-lg px-4 py-2 mt-12'>
              <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 pb-10 pt-5 sm:pr-0 md:pr-0 lg:pr-10 align-middle justify-center items-center'>
                {gameInventory.map((game) => (
                  <Cards
                    key={game._id}
                    src={game.imageUrl}
                    alt={game.name}
                    title={game.name}
                    description={game.description.length > 102 
                      ? game.description.substring(0, 102) + '...' 
                      : game.description}
                    link={game.bggLink}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* AboutSection     */}

          <div
            ref={aboutRef}
            id='about'
            className='h-screen flex flex-col items-center justify-center flex-1'
          >
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
                              Meeples
                            </h3>
                          </div>
                          <p className='mt-3 mb-1 text-xs font-medium text-[#2b2a28] uppercase'>
                            ------------
                          </p>
                          <p className='mb-2 text-gray-600'>
                            a passionate and inclusive tabletop games
                            organization dedicated to fostering a vibrant and
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
          </div>
        </div>
        <footer className='mt-20 footer footer-center z-30 w-full p-4 bg-[#2b2a28] text-gray-200'>
          <div className='text-center'>
            <h3 className='my-5'>Come, Join Us! </h3>
            <p>© {new Date().getFullYear()} LSU Meeples</p>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default HeroSection;
