'use client';

import useSWR from 'swr';
import fetcher from '@/app/lib/fetcher';
import DateGroup from '@/app/components/date-group';
import { IoIosArrowUp } from 'react-icons/io';
import Link from 'next/link';
import moment from 'moment';

export default function Home() {
  // Fetches data and reevalidates every 10 minutes.
  // If there is new data, rerenders the page.
  const { data, error, isLoading } = useSWR(`/api/groups?groups`, fetcher, { refreshInterval: 1000 * 60 * 10 });

  // Shows loading spinner while data is being fetched.
  if (isLoading) {
    return (
      <div className='w-full h-[100dvh] flex justify-center items-center'>
        <div className='border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600' />
      </div>
    );
  }

  // Shows error message if there is an error.
  if (error) {
    return (
      <div className='w-full h-[100dvh] flex justify-center items-center'>
        <p className='text-red-500'>Something went wrong</p>
      </div>
    );
  }

  // Renders the page if there is no error and data is available.
  if (data) {
    console.log('Data fetched at', moment().format('DD-MM-YY, HH:mm:ss'));
    const { liveMatches, upcomingMatches, finisehdMatches } = data;

    return (
      <main className='grid grid-cols-1 gap-10 px-4 my-10 lg:max-w-[1024px] lg:mx-auto relative'>
        <div className='flex flex-col'>
          <p className='flex justify-center items-center pb-6 mb-14 text-xl border-b-2'>Live matches</p>
          <DateGroup matches={liveMatches} status={['Live', upcomingMatches.length > 0 ? upcomingMatches[0] : []]} />
        </div>

        <div className='flex flex-col'>
          <p id='upcoming' className='flex justify-center items-center pb-6 mb-14 text-xl border-b-2'>
            Upcoming matches
          </p>
          <DateGroup matches={upcomingMatches} status={['Upcoming']} />
        </div>

        <div className='flex flex-col'>
          <p id='finished' className='flex justify-center items-center pb-6 mb-14 text-xl border-b-2'>
            Finished matches
          </p>
          <DateGroup matches={finisehdMatches} status={['Finished']} />
        </div>

        <div className='fixed bottom-0 right-0 p-4'>
          <Link href='/'>
            <div className='rounded-full shadow-lg shadow-gray-400 p-2 cursor-pointer hover:scale-110 ease-in duration-300 bg-[#0d5aa4] opacity-75'>
              <IoIosArrowUp className='text-white' size={20} />
            </div>
          </Link>
        </div>
      </main>
    );
  }
}
