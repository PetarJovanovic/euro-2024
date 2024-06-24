'use client';

import moment from 'moment';
import MatchItem from '@/app/components/match-item';
import CountdownTimer from './countdown-timer';

export default function DateGroup({ matches, status }) {
  // Checks if there are live matches and if there are any upcoming matches
  // Than if there are any upcoming matches, show counter until it starts
  if (matches.length === 0 && status[0] === 'Live' && status[1].length > 0) {
    return (
      <div
        className={`grid grid-cols-1 w-full shadow-lg rounded-md relative bg-gray-100 
        ${status[0] === 'Live' && 'shadow-green-400/50'}`}>
        <div className='flex flex-col gap-2 justify-center items-center p-10'>
          <p className='font-semibold text-xl'>Next match in</p>
          <CountdownTimer nextMatch={status[1][0].timestamp} />
        </div>
      </div>
    );
  }

  // Checks if there are any upcoming, live or finished matches
  if (matches.length === 0) {
    return (
      <div className='grid grid-cols-1 w-full shadow-md rounded-md relative bg-gray-100'>
        <p className='flex justify-center items-center p-10'>No matches available</p>
      </div>
    );
  }

  // Renders live, upcoming and finished matches
  return (
    <div className='grid grid-cols-1 gap-16 max-w-[1024px] mx-auto w-full lg:gap-20'>
      {matches.map(date => {
        return (
          <div
            key={date[0].timestamp}
            className={`grid grid-cols-1 w-full shadow-lg rounded-md relative bg-gray-100 
            ${status[0] === 'Live' && 'bg-green-200/50'}
            ${status[0] === 'Finished' && 'bg-red-200/50'}`}>
            <p className='absolute top-0 left-0 translate-y-[-100%] pb-2'>{moment(date[0].timestamp).format('LL')}</p>
            <MatchItem date={date} />
          </div>
        );
      })}
    </div>
  );
}
