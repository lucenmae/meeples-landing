import React from 'react';
import { cn } from "@/lib/utils";

interface MeepleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  tooltip?: string;
  icon?: React.ReactNode;
}

const MeepleButton: React.FC<MeepleButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  tooltip,
  icon,
  ...props
}) => {
  const baseStyles = "inline-block font-bold text-center rounded-md shadow-[5px_5px_0px_#000] transition-all ease-linear hover:-translate-y-1 active:shadow-none active:translate-y-1 lg:pl-3 sm:pl-0 md:pl-2";
  
  const variantStyles = {
    primary: "text-black bg-white border-2 border-black hover:bg-yellow-400",
    secondary: "text-white bg-indigo-500 border-2 border-black hover:bg-white hover:text-indigo-500 hover:border-indigo-500 hover:shadow-[5px_5px_0px_#6366F1] active:bg-indigo-500 active:border-gray-800 active:text-white",
    outline: "text-black bg-meeple-primary border-2 border-black hover:bg-meeple-tertiary hover:text-black hover:border-black hover:shadow-[5px_5px_0px_#000000]"
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-md",
    lg: "px-6 py-3 text-lg"
  };

  const buttonStyles = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  return (
    <button 
      className={cn("btn-tooltip tooltip", buttonStyles)} 
      data-tooltip={tooltip}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default MeepleButton;
