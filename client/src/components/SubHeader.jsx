import React from 'react';
import { Link } from 'react-router-dom';
import path from '../utils/path';

function SubHeader() {
	return (
		<div className='h-[50px] w-full bg-main flex justify-center items-center'>
			<div className='w-main flex justify-between items-center text-white text-sm gap-20'>
				<div className='flex items-center'>
					<span>ORDER ONLINE OR CALL US (+8400) 300 8808</span>
					<span className='bg-[rgba(255,255,255,0.3)] w-[1px] h-[16px] inline-block mx-2'></span>
					<span>VND</span>
				</div>

				<div className='flex-1'>
					<label
						htmlFor='default-search'
						className='mb-2 text-sm font-medium  sr-only bg-white text-white'
					>
						Search
					</label>
					<div className='relative'>
						<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
							<svg
								className='w-4 h-4 text-gray-700'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 20 20'
							>
								<path
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
								/>
							</svg>
						</div>
						<input
							type='search'
							id='default-search'
							className='block w-full p-3 pl-10 text-xs outline-none bg-white placeholder-gray-700 text-gray-700'
							placeholder='Search products ...'
							required
							spellCheck='false'
						/>
						<button
							type='submit'
							className='text-white text-[12px] absolute right-0 bottom-0 top-0 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-300 font-medium px-4 py-2 '
						>
							Search
						</button>
					</div>
				</div>

				<div className=''>
					<Link to={path.LOGIN}>Sign In or Create Account</Link>
				</div>
			</div>
		</div>
	);
}

export default SubHeader;
