import React from 'react';

interface PromotionCardProps {
  title: string;
  description: string;
  buttonText: string;
  variant: 'primary' | 'secondary';
}

const PromotionCard: React.FC<PromotionCardProps> = ({
  title,
  description,
  buttonText,
  variant
}) => {
  const bgColor = variant === 'primary' 
    ? 'bg-gradient-to-r from-green-900 to-green-800 border border-green-700' 
    : 'bg-gradient-to-r from-yellow-900 to-yellow-800 border border-yellow-700';
  
  const btnClass = variant === 'primary' ? 'btn-secondary' : 'btn-primary';
  
  return (
    <div className={`card ${bgColor}`}>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-lg mb-4">{description}</p>
        <button className={btnClass}>{buttonText}</button>
      </div>
    </div>
  );
};

export default PromotionCard;
