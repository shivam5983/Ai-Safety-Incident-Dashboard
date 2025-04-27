import React from 'react';

interface BadgeProps {
  label: string;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ label, className }) => {
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  );
};

export default Badge;