import React from 'react';
import { useTimer } from 'react-timer-hook';

interface OfferTimerProps {
  expiryTimestamp: Date;
  darkGreen?: boolean;
}



                   
const CouponTimer: React.FC<OfferTimerProps> = ({ expiryTimestamp }) => {
  const { seconds, minutes, hours, days } = useTimer({ expiryTimestamp });

  return (
    <>
      <span className="d-flex align-items-center justify-content-center bg-brand text-light bg-opacity-10 fs-6 font-serif fw-semibold px-2 py-1 rounded mx-1">
        {days}
      </span>
      :
      <span className="d-flex align-items-center justify-content-center bg-brand text-light bg-opacity-10 fs-6 font-serif fw-semibold px-2 py-1 rounded mx-1">
        {hours}
      </span>
      :
      <span className="d-flex align-items-center justify-content-center bg-brand text-light bg-opacity-10 fs-6 font-serif fw-semibold px-2 py-1 rounded mx-1">
        {minutes}
      </span>
      :
      <span className="d-flex align-items-center justify-content-center bg-brand text-light bg-opacity-10 fs-6 font-serif fw-semibold px-2 py-1 rounded mx-1">
        {seconds}
      </span>
    </>
  );
};

export default React.memo(CouponTimer);
