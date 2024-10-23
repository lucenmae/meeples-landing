'use client';

const Loading = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-white'>
      <div className='z-30 absolute top-44 left-0 w-full text-center'>
        <h1 className='uppercase font-poppins block font-black text-gray-800 text-4xl md:text-5xl lg:text-6xl'>
          Meeples
        </h1>
      </div>
      <div className='absolute inset-0 w-full h-full bg-[#F3F3F3] z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none' />
      <div className='loader'></div>
    </div>
  );
};

export default Loading;
