'use client';

import useSWR from 'swr';
import fetcher from '@/app/lib/fetcher';
import DateGroup from '@/app/components/date-group';
import Loading from '@/app/components/loading';
import Error from '@/app/components/error';
import filterMatches from '@/app/lib/filter-matches';
import { IoIosArrowUp } from 'react-icons/io';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();

  // Fetches data and reevalidates every 10 minutes.
  // If there is new data, rerenders the page.
  const { data, error, isLoading } = useSWR(`/api/groups?groups`, fetcher, { refreshInterval: 1000 * 60 * 10 });

  // Shows loading spinner while data is being fetched.
  if (isLoading) {
    return <Loading />;
  }

  // Shows error message if there is an error.
  if (error) {
    return <Error />;
  }

  // Renders the page if there is no error and data is available.
  if (data) {
    const { filteredLiveMatches, filteredUpcomingMatches, filteredFinisehdMatches } = filterMatches(data, searchParams.get('search'));

    return (
      <main className='grid grid-cols-1 gap-10 px-4 my-10 lg:max-w-[1024px] lg:mx-auto relative'>
        <div className='flex flex-col'>
          <p className='flex justify-center items-center pb-6 mb-14 text-xl border-b-2'>Live matches</p>
          <DateGroup matches={filteredLiveMatches} status={['Live', filteredUpcomingMatches.length > 0 ? filteredUpcomingMatches[0] : []]} />
        </div>

        <div className='flex flex-col'>
          <p id='upcoming' className='flex justify-center items-center pb-6 mb-14 text-xl border-b-2'>
            Upcoming matches
          </p>
          <DateGroup matches={filteredUpcomingMatches} status={['Upcoming']} />
        </div>

        <div className='flex flex-col'>
          <p id='finished' className='flex justify-center items-center pb-6 mb-14 text-xl border-b-2'>
            Finished matches
          </p>
          <DateGroup matches={filteredFinisehdMatches} status={['Finished']} />
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
