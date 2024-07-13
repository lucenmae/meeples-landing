import NextImage from '@/components/NextImage';

export default function TrustedImages() {
  const images = [
    '/images/trusted-section/alfarpharmacy.jpg',
    '/images/trusted-section/nanaybelen.jpg',
    '/images/trusted-section/contact-point.jpg',
    '/images/trusted-section/royalenergy.png',
    '/images/trusted-section/rxcentrico.jpg',
    '/images/trusted-section/agumil.png',
    '/images/trusted-section/agusan.png',
    '/images/trusted-section/cebuquincentennial.png',
    '/images/trusted-section/greenearth.png',
    '/images/trusted-section/j-mavecards.png',
    // '/images/trusted-section/JNB.png',
    // '/images/trusted-section/domestika.jpg',
    // '/images/trusted-section/kodea.png',
    // '/images/trusted-section/mnclending.png',
    // '/images/trusted-section/palawanpalm.png',
    // '/images/trusted-section/phagricultureland.png',
  ];

  return (
    <div className=''>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center'>
        <div className='mb-14 text-center'>
          <span className=' text-md font-medium text-black text-center'>
            {' '}
            Trusted by Companies from Different Industries
          </span>
        </div>
        <div className='mx-auto mt-10 grid max-w-lg grid-cols-2 gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 lg:max-w-none lg:grid-cols-5 my-5'>
          {images.map((src, index) => (
            <div
              key={index}
              className='flex justify-center items-center max-h-32'
            >
              <NextImage
                useSkeleton
                className='h-auto max-h-24 w-auto max-w-full object-contain'
                src={src}
                alt={`Image ${index + 1}`}
                width={158}
                height={48}
              />
            </div>
          ))}
        </div>
        <div className='text-center text-gray-900'>
          <p className='text-md font-medium text-black text-center'>
            and more!
          </p>
        </div>
      </div>
    </div>
  );
}
