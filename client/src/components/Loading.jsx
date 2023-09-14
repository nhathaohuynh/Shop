import React from 'react';

const Loading = ({ text }) => {
	return (
		<div className='flex items-center justify-center w-full h-screen'>
			<div>
				<span
					className={`text-4xl ${
						text ? 'text-white' : 'text-gray-800'
					} mr-1 animate-pulse`}
				>
					Loading
				</span>
				<span className='text-[100px] font-medium leading-none text-center text-blue-800 animate-pulse'>
					...
				</span>
			</div>
		</div>
	);
};

export default Loading;
