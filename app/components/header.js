'use client';

import Image from 'next/image';
import Logo from '@/public/static/HeaderEuro2024.webp';

import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = searchItem => {
    const params = new URLSearchParams();

    if (searchItem) {
      params.set('search', searchItem);
    } else {
      params.delete('search');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <header className='flex justify-center items-center shadow-lg bg-[#0d5aa4]'>
      <div className='flex flex-col justify-center items-center pb-3'>
        <Image src={Logo} width={175} alt='Euro 2024 Germany' priority />
        <div className='relative flex flex-1 flex-shrink-0'>
          <label htmlFor='search' className='sr-only'>
            Search
          </label>
          <input
            className='rounded-md block py-1 pl-7 text-sm outline-none text-[#0d5aa4]'
            defaultValue={searchParams.get('search')?.toString()}
            onChange={e => handleSearch(e.target.value)}
          />
          <HiMagnifyingGlass className='absolute left-1 top-[50%] translate-y-[-50%] text-[#0d5aa4]' />
        </div>
      </div>
    </header>
  );
}
