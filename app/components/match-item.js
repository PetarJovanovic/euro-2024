'use client';

import Image from 'next/image';
import moment from 'moment';
import { MdOutlineStadium } from 'react-icons/md';
import { IconContext } from 'react-icons';

export default function MatchItem({ date }) {
  return (
    <div>
      {date.map(match => {
        return (
          <div key={match.name} className='grid grid-cols-1 p-2 border-b-2 border-white [&:last-child]:border-b-0 lg:p-6'>
            <div className='grid grid-cols-5 items-start'>
              <p className='flex justify-start text-sm md:text-base'>{match.group}</p>
              <div className='col-span-3 flex justify-center items-center gap-2'>
                <IconContext.Provider value={{ size: '1.25rem' }}>
                  <MdOutlineStadium />
                </IconContext.Provider>
                <p className='text-xs md:text-base'>{match.stadium}</p>
              </div>
              <p className='flex justify-end text-sm md:text-base'> {moment(match.timestamp).format('HH:ss')}h</p>
            </div>

            <div className='grid grid-cols-3 py-4'>
              <div className='flex justify-end'>
                <div className='flex gap-2 justify-start items-center w-[80%] md:w-[40%]'>
                  <Image src={match.homeTeam.logo.url} width={25} height={25} alt='logo' />
                  <p>{match.homeTeam.name}</p>
                </div>
              </div>

              <div className='flex justify-center items-center gap-2'>
                <p>{match.result.homeScore90}</p>
                <p>:</p>
                <p>{match.result.awayScore90}</p>
              </div>

              <div className='flex justify-start'>
                <div className='flex gap-2 justify-end items-center w-[80%] md:w-[40%]'>
                  <p>{match.awayTeam.name}</p>
                  <Image src={match.awayTeam.logo.url} width={25} height={25} alt='logo' />
                </div>
              </div>
            </div>

            <div
              className={`flex justify-center items-center text-sm md:text-base 
                    ${match.matchStatus === 'Ongoing' && 'text-green-500'} 
                    ${match.matchStatus === 'First half' && 'text-green-500'} 
                    ${match.matchStatus === 'Half time' && 'text-green-500'} 
                    ${match.matchStatus === 'Second half' && 'text-green-500'} 
                    ${match.matchStatus === 'Finished' && 'text-red-500'} 
                    ${match.matchStatus === 'Upcoming' && 'text-gray-500'}`}>
              {match.matchStatus}
            </div>

            {match.live && (
              <div className='flex justify-center items-center gap-2'>
                <span className='relative flex h-3 w-3'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75'></span>
                  <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
                </span>
                <p>Live</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
