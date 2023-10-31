import logo from '../assets/logo.png';
import icons from '../utils/icon';
import { Link } from 'react-router-dom';
import path from '../utils/path';
import React from 'react';
const Header = () => {
	return (
		<header className='w-main min-h-[110px] py-9 flex justify-between'>
			<Link to={`/${path.HOME}`}>
				<img src={logo} alt='Logo' className='object-contain' />
			</Link>
			<div className='flex text-[13px]'>
				<div className='flex flex-col items-center px-6 border-r border-main'>
					<span className='flex gap-4 items-center'>
						<icons.RiPhoneFill color='red' />
						<span className='font-semibold'>(+8400) 300 8808</span>
					</span>
					<span>Mon-Sat 9:00AM - 8:00PM</span>
				</div>
				<div className='flex flex-col items-center px-6 border-r border-main'>
					<span className='flex gap-4 items-center'>
						<icons.MdEmail color='red' />
						<span className='font-semibold'> SUPPORT@HUYNHNHATHAO.COM</span>
					</span>
					<span>Online Support 24/7</span>
				</div>
				<div className='flex items-center justify-center px-6 border-r hover:cursor-pointer border-main gap-2'>
					<icons.BsHandbagFill color='red' />
					<span>0 Item</span>
				</div>
				<div className='flex items-center justify-center pl-6 gap-2 hover:cursor-pointer'>
					<icons.FaUserCircle color='red' size={16} />
					<span>Profile</span>
				</div>
			</div>
		</header>
	);
};

export default Header;
