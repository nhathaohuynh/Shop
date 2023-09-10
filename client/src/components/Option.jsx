import React from 'react';

const Option = ({ icon }) => {
	return (
		<div className='w-10 h-10 transition-all text-gray-600 border cursor-pointer rounded-full hover:border-gray-800 bg-white shadow-lg flex justify-center items-center hover:bg-gray-800 hover:text-white'>
			{icon}
		</div>
	);
};

export default Option;
