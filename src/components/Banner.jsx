import React from 'react';

export default function Banner() {
  return (
    <section className='h-96 bg-gray-900 relative'>
      <div className='w-full h-full bg-cover bg-banner opacity-80'/>
      <div className='absolute w-full top-32 text-center text-gray-200 drop-shadow-2xl'>
        <h2 className='text-6xl'>Best BASSES</h2>
        <p className='text-2xl'></p>
      </div>
    </section>
  );
}

