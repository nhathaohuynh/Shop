import React from 'react';
import { navigation } from '../utils/contants';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
	return (
		<nav className='w-main min-h-[48px] py-2 flex items-center border-t border-b font-semibold'>
			{navigation.map((nav) => (
				<NavLink
					to={nav.path}
					key={nav.id}
					className={({ isActive }) =>
						`${
							isActive ? 'text-main' : ''
						} pr-12 uppercase text-sm font-normal hover:text-main transition-all`
					}
				>
					{nav.name}
				</NavLink>
			))}
		</nav>
	);
};

export default Navigation;
