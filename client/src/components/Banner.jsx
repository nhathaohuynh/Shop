import React from 'react';
import banner1 from '../assets/slideshow1.webp'
const Banner = () => {
	return <div className='w-full'>
		<img src={banner1} alt="banner" className='w-full object-cover h-[484px] aspect-video ' />
	</div>;
};

export default Banner;
