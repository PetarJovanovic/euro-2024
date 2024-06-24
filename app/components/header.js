'use client';

import Image from 'next/image';
import Logo from '@/public/static/HeaderEuro2024.webp';

export default function Header() {
  return (
    <header className='flex justify-center items-center shadow-lg bg-[#0d5aa4]'>
      <div className='flex justify-start items-center'>
        <Image src={Logo} width={175} alt='Euro 2024 Germany' priority />
      </div>
    </header>
  );
}
