import React, { useState, useEffect } from 'react';
import moment from 'moment';

export default function CountdownTimer({ nextMatch }) {
  const initialTime = calculateTimeRemaining(nextMatch);
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, []); // The empty dependency array ensures the effect runs only once on mount

  // Convert seconds to hours, minutes, and seconds
  const days = Math.floor(timeRemaining / 86400);
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = Math.floor(timeRemaining % 60);

  return <p className='text-lg'>{`${days}d ${hours}h ${minutes}m ${seconds}s`}</p>;
}

function calculateTimeRemaining(timestamp) {
  const nowTime = moment();
  const nextMatchTime = moment(timestamp);
  const differenceTime = nextMatchTime.diff(nowTime, 'seconds', true);
  return differenceTime;
}
