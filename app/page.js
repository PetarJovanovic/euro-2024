'use client';

import useSWR from 'swr';
import fetcher from '@/app/components/fetcher';
import formatData from '@/app/components/format-data';
import DateGroup from '@/app/components/date-group';

let allGroups = {};
const groups = [
  { name: 'Group A', id: 0 },
  { name: 'Group B', id: 1 },
  { name: 'Group C', id: 2 },
  { name: 'Group D', id: 3 },
  { name: 'Group E', id: 4 },
  { name: 'Group F', id: 5 },
];

export default function Home() {
  for (const group of groups) {
    const groupNameFormated = group.name.replace(' ', '_').toUpperCase();

    const { data, error, isLoading } = useSWR(`/api/groups?group=${groupNameFormated}`, fetcher);

    if (error) {
      console.log(error);
    }

    if (data) {
      allGroups = { ...allGroups, [group.name]: data };
    }
  }

  const { allMatches, liveMatches, upcomingMatches, finisehdMatches } = formatData(allGroups);

  return (
    <main className='grid grid-cols-1 gap-10 px-4 my-10 lg:max-w-[1024px] lg:mx-auto'>
      <div className='flex flex-col'>
        <p className='flex justify-center items-center pb-6 mb-6 text-xl border-b-2'>Live matches</p>
        <DateGroup matches={liveMatches} />
      </div>

      <div className='flex flex-col'>
        <p className='flex justify-center items-center pb-6 mb-14 text-xl border-b-2'>Upcoming matches</p>
        <DateGroup matches={upcomingMatches} />
      </div>

      <div className='flex flex-col'>
        <p className='flex justify-center items-center pb-6 mb-14 text-xl border-b-2'>Finished matches</p>
        <DateGroup matches={finisehdMatches} />
      </div>
    </main>
  );
}
