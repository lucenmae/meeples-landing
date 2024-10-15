import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import MeepleButton from '@/components/ui/meeple-button';

import Logo from '../Logo';
import NextImage from '../NextImage';

interface NavbarProps {
  scrollToSection?: (section: React.RefObject<HTMLDivElement>) => void;
  gamesRef?: React.RefObject<HTMLDivElement>;
  aboutRef?: React.RefObject<HTMLDivElement>;
}

const Navbar: React.FC<NavbarProps> = ({ scrollToSection, gamesRef, aboutRef }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScrollToSection = (ref: React.RefObject<HTMLDivElement> | undefined) => {
    if (scrollToSection && ref) {
      scrollToSection(ref);
    } else {
      // If we're not on the home page, navigate to it and then scroll
      if (ref === gamesRef) {
        router.push('/?section=games');
      } else if (ref === aboutRef) {
        router.push('/?section=about');
      }
    }
  };

  return (
    <nav className='absolute w-full top-5 py-5 z-30'>
      <div className='mx-auto max-w-7xl lg:px-8'>
        <div className='w-full flex flex-col lg:flex-row'>
          {/* Logo and Menu Button */}
          <div className='flex justify-between lg:hidden px-4'>
            <Link href='/' aria-label='Meeples' className='flex items-center'>
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
                className={isMenuOpen ? 'hidden h-6 w-6 cursor-none' : 'block h-6 w-6 cursor-none'}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='black'
                aria-hidden='true'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7' />
              </svg>
              {/* Icon when menu is open. */}
              <svg
                className={isMenuOpen ? 'block h-6 w-6 cursor-none' : 'hidden h-6 w-6 cursor-none'}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='black'
                aria-hidden='true'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div
            className={
              isMenuOpen
                ? 'max-sm:bg-white w-full lg:flex justify-between py-5 max-lg:mt-1 max-lg:px-4 max-lg:shadow-lg max-lg:shadow-gray-200 max-lg:h-auto max-lg:overflow-auto transition-all duration-500 delay-200'
                : 'max-sm:bg-white hidden w-full lg:flex justify-between py-5 max-lg:mt-1 max-lg:px-4 max-lg:shadow-lg max-lg:shadow-gray-200 max-lg:h-auto max-lg:overflow-auto transition-all duration-500 delay-200'
            }
            id='navbar'
          >
            <ul className='flex lg:items-center max-lg:gap-4 max-lg:mb-4 flex-col mt-4 lg:flex-1 md:mt-0 lg:flex-row'>
              <li>
                <a href='https://forms.gle/hCtVuNhBpyzZkZCv5'>
                  <MeepleButton variant='primary' tooltip='can I join? 🥺'>
                    Rent
                  </MeepleButton>
                </a>
              </li>
              <li className='lg:pl-3 sm:pl-0 md:pl-2'>
                <MeepleButton 
                  variant='primary' 
                  onClick={() => handleScrollToSection(gamesRef)}
                  tooltip="let's play? 😍"
                >
                  Games
                </MeepleButton>
              </li>
              <li className='lg:pl-3 sm:pl-0 md:pl-2'>
                <MeepleButton 
                  variant='primary' 
                  onClick={() => handleScrollToSection(aboutRef)}
                  tooltip='games! 🎲💛'
                >
                  About
                </MeepleButton>
              </li>
            </ul>

            {/* Logo */}
            <div className='hidden lg:flex items-center '>
              <Logo className='cursor-none' size={200} />
            </div>

            {/* Action Buttons */}
            <ul className='flex lg:justify-end lg:items-center max-lg:gap-4 max-lg:mb-4 flex-col mt-4 lg:flex-1 md:mt-0 lg:flex-row'>
              <li>
                <a href='https://discord.gg/vxDY3U8Bwn'>
                  <MeepleButton variant='secondary' tooltip='please join 🥺'>
                    Discord
                  </MeepleButton>
                </a>
              </li>              
              <li className='lg:pl-3 sm:pl-0 md:pl-2'>
                <Link href="/login">
                  <MeepleButton variant='outline' tooltip='meeple admin for now 🥺'>
                    Login
                  </MeepleButton>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
