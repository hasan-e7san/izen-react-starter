import React from 'react';
import './Card.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
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
  ...props
}) => {
  const baseClass = 'card';
  const classes = `${baseClass} ${baseClass}--${elevation} ${className}`.trim();

  return (
    <div className={classes} {...props}>
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
