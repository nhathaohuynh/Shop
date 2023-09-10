import React from 'react';
import { memo } from 'react';

function Countdown({ text, time }) {
	return (
		<div className='w-[85px] h-[65px] bg-[rgba(0,0,0,0.1)] flex gap-1 justify-center items-center flex-col'>
			<span>{time}</span>
			<span className='text-xs text-gray-500'>{text}</span>
		</div>
	);
}

export default memo(Countdown);
