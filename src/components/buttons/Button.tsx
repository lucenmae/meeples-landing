import { LucideIcon } from 'lucide-react';
import * as React from 'react';
import { IconType } from 'react-icons';
import { ImSpinner2 } from 'react-icons/im';

import { cn } from '@/lib/utils';

const ButtonVariant = ['primary', 'header', 'ghost', 'light', 'dark'] as const;
const ButtonSize = ['sm', 'base'] as const;

type ButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  variant?: (typeof ButtonVariant)[number];
  size?: (typeof ButtonSize)[number];
  leftIcon?: IconType | LucideIcon;
  rightIcon?: IconType | LucideIcon;
  classNames?: {
    leftIcon?: string;
    rightIcon?: string;
  };
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = 'primary',
      size = 'base',
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      classNames,
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={cn(
          'group relative overflow-hidden inline-flex items-center rounded font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 shadow-sm transition-all duration-75',
          {
            'focus-visible:ring-primary-500': variant === 'primary',
            'px-3 py-1.5 text-sm md:text-base': size === 'base',
            'px-2 py-1 text-xs md:text-sm': size === 'sm',
            'bg-orange-600 text-white border-orange-700 border rounded-full':
              variant === 'primary',
            'inline-block px-5 py-2.5 text-2xl font-bold text-center text-black bg-indigo-500 border-2 border-black rounded-md shadow-[5px_5px_0px_#000] transition-all ease-linear transform scale-90 hover:bg-white hover:text-yellow-500 hover:border-yellow-500 hover:shadow-[5px_5px_0px_#EAB39D] hover:scale-100 active:bg-yellow-400 active:shadow-none active:translate-y-1':
              variant === 'header',
            'text-primary-500 shadow-none hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100':
              variant === 'ghost',
            'bg-white text-gray-700 border border-gray-300 hover:text-dark hover:bg-gray-100 active:bg-white/80 disabled:bg-gray-200':
              variant === 'light',
            'bg-gray-900 text-white border border-gray-600 hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-700':
              variant === 'dark',
          },
          'disabled:cursor-not-allowed',
          isLoading &&
            'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
          className
        )}
        {...rest}
        style={{
          zIndex: 1,
          position: 'relative',
        }}
      >
        {isLoading && (
          <div
            className={cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              {
                'text-white': ['primary', 'dark'].includes(variant),
                'text-black': ['light'].includes(variant),
                'text-primary-500': ['outline', 'ghost'].includes(variant),
              }
            )}
          >
            <ImSpinner2 className='animate-spin' />
          </div>
        )}
        {LeftIcon && (
          <div
            className={cn([
              size === 'base' && 'mr-1',
              size === 'sm' && 'mr-1.5',
            ])}
          >
            <LeftIcon
              size='1em'
              className={cn(
                [
                  size === 'base' && 'md:text-md text-md',
                  size === 'sm' && 'md:text-md text-sm',
                ],
                classNames?.leftIcon
              )}
            />
          </div>
        )}
        {variant === 'primary' && (
          <span
            className={cn(
              'absolute inset-0 bg-orange-700 transform -translate-x-full transition-transform duration-[600ms] ease-[cubic-bezier(0,0.70,0.60,1)] group-hover:translate-x-0'
            )}
            style={{
              zIndex: -1,
            }}
          ></span>
        )}
        <p className='relative transition-all group-active:scale-90'>
          {children}
        </p>
        {RightIcon && (
          <div
            className={cn([
              size === 'base' && 'ml-1',
              size === 'sm' && 'ml-1.5',
            ])}
          >
            <RightIcon
              size='1em'
              className={cn(
                [
                  size === 'base' && 'text-md md:text-md',
                  size === 'sm' && 'md:text-md text-sm',
                ],
                classNames?.rightIcon
              )}
            />
          </div>
        )}
      </button>
    );
  }
);

export default Button;
