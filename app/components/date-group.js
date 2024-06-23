'use client';

import Image from 'next/image';
import moment from 'moment';
import { MdOutlineStadium } from 'react-icons/md';
import { IconContext } from 'react-icons';
import MatchItem from '@/app/components/match-item';

export default function DateGroup({ matches }) {
  if (matches.length === 0) {
    return (
      <div className='grid grid-cols-1 w-full shadow-md rounded-md relative bg-gray-100'>
        <p className='flex justify-center items-center p-10'>No matches available</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-16 max-w-[1024px] mx-auto w-full lg:gap-20'>
      {matches.map(date => {
        return (
          <div key={date[0].timestamp} className='grid grid-cols-1 w-full shadow-md rounded-md relative bg-gray-100'>
            <p className='absolute top-0 left-0 translate-y-[-100%] pb-2'>{moment(date[0].timestamp).format('LL')}</p>
            <MatchItem date={date} />
          </div>
        );
      })}
    </div>
  );
}
