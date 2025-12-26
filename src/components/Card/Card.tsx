import React from 'react';
import './Card.css';

export interface CardProps {
  /**
   * Card title
   */
  title?: string;
  /**
   * Card content
   */
  children: React.ReactNode;
  /**
   * Footer content
   */
  footer?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Card elevation/shadow level
   */
  elevation?: 'none' | 'low' | 'medium' | 'high';
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  footer,
  className = '',
  elevation = 'medium',
}) => {
  const baseClass = 'card';
  const classes = `${baseClass} ${baseClass}--${elevation} ${className}`.trim();

  return (
    <div className={classes}>
      {title && (
        <div className="card__header">
          <h3 className="card__title">{title}</h3>
        </div>
      )}
      <div className="card__body">{children}</div>
      {footer && <div className="card__footer">{footer}</div>}
    </div>
  );
};
