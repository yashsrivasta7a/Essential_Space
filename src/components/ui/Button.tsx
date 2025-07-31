import type { ReactElement } from "react";

type variants = "primary" | "secondary";

export interface ButtonProps {
  variant: variants;
  size: "sm" | "md" | "lg";
  text: string;
  endIcon?: any;
  onClick?: () => void;
  startIcon?: ReactElement;
  disabled?: boolean;
}

const defaultStyles = "rounded-xl border transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]";

const sizeStyles = {
  lg: "px-8 py-4 text-lg rounded-2xl",
  md: "px-6 py-3 text-sm rounded-xl",
  sm: "px-4 py-2 text-xs rounded-lg",
};

const variantStyles = {
  primary: {
    backgroundColor: '#ffffff',
    color: '#000000',
    borderColor: '#ffffff',
    fontFamily: 'monospace',
    letterSpacing: '0.05em'
  },
  secondary: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    fontFamily: 'monospace',
    letterSpacing: '0.05em'
  }
};

export const Button = ({ variant, size, text, endIcon, onClick, startIcon, disabled = false }: ButtonProps) => {
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === 'primary') {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.color = '#ffffff';
      e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 255, 255, 0.1)';
    } else {
      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === 'primary') {
      e.currentTarget.style.backgroundColor = '#ffffff';
      e.currentTarget.style.color = '#000000';
      e.currentTarget.style.boxShadow = 'none';
    } else {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    }
  };

  return (
    <button
      className={`${defaultStyles} ${sizeStyles[size]}`}
      style={variantStyles[variant]}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      <span>{text}</span>
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};