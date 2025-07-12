import React from 'react';

interface CardProps {
  title: string;
  Icon?: React.ComponentType;
  quantity: number | string;
  className?: string;
}

const OrderCard: React.FC<CardProps> = ({ title, Icon, quantity, className }) => {
  return (
    <div className="d-flex align-items-center border rounded-3 p-4 w-100">
        <div className={`d-flex align-items-center justify-content-center rounded-circle   p-3 me-4  ${className}` } 
            style={{ width: "48px", height: "48px" }}>

            {Icon && (
                <Icon  />
            )}  
        </div>
        <div>
            <h5 className="mb-2 text-base fw-medium font-monospace text-body-secondary">{title}</h5>
            <p className="mb-0 fs-4 fw-bold font-monospace text-body">{quantity}</p>
        </div>
    </div>
  );
};

export default OrderCard;