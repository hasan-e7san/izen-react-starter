import React from 'react';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant style
   */
  variant?: 'primary' | 'secondary' | 'outline';
  /**
   * Button size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Is button in loading state
   */
  loading?: boolean;
}

export const Button2: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled,
  className = '',
  ...props
}) => {
  const baseClass = 'btn px-4 py-2 rounded-md';
  const classes = `${baseClass} ${baseClass}--${variant} ${baseClass}--${size}  ${className} `.trim();

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <span className="btn__spinner">⏳</span> : children}
    </button>
  );
};
