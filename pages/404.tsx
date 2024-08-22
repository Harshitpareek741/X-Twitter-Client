// pages/404.js
import Link from 'next/link';
import React from 'react';

const Custom404 = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 className='text-3xl font-semibold'>Sorry</h1>
      <p className='text-2xl'>This Page is Still in Progres or Not available</p>
      <Link href="/" className='underline'>Click Here</Link>
      <h2></h2>
    </div>
  );
};

export default Custom404;
