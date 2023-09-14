import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import path from '../utils/path';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../redux/actions/userAction';
import icons from '../utils/icon';

function SubHeader() {
	const dispatch = useDispatch();
	const { isLogin, currentUser } = useSelector((state) => state.user);
	useEffect(() => {
		if (isLogin) dispatch(getCurrentUser());
	}, [dispatch]);

	console.log(currentUser);
	return (
		<div className='h-[50px] w-full bg-main flex justify-center items-center'>
			<div className='w-main flex justify-between items-center text-white text-sm gap-20'>
				<div className='flex items-center text-[12px]'>
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
						<input
							type='search'
							id='search-input'
							className='block w-full p-2.5 pl-3 text-xs outline-none bg-white placeholder-gray-700 text-gray-700'
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
				{currentUser ? (
					<div className='flex items-center gap-2'>
						<span className='text-[12px]'>
							Welcome! {currentUser?.username}
						</span>
						<icons.AiOutlineLogout size={16} className='hover:cursor-pointer' />
					</div>
				) : (
					<div>
						<Link
							className='hover:underline hover:text-gray-100'
							to={path.LOGIN}
						>
							Sign In
						</Link>
						<span className='bg-[rgba(255,255,255,0.3)] w-[1px] h-[16px] inline-block mx-2'></span>
						<Link
							className='hover:underline hover:text-gray-100'
							to={path.REGISTER}
						>
							Create Account
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}

export default SubHeader;
