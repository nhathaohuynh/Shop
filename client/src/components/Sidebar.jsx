import React from 'react';

import { NavLink } from 'react-router-dom';
import { slug } from '../utils/helper';
import { useSelector } from 'react-redux';
import icons from '../utils/icon';
import DynamicIcon from './DynamicIcon';


const Sidebar = () => {
	const { categories: cateProduct } = useSelector((state) => state?.app);

	return (
		<div className='flex flex-col border h-[484px] justify-between'>
			<div className='pt-[15px] pb-[14px] px-5 text-[16px] text-white font-bold bg-main flex gap-3 items-center'>
				<icons.FiMenu size={24} />
				<span>All Collections</span>
			</div>
			{cateProduct?.map((el) => {
				return (
					<NavLink
						key={slug(el.title)}
						to={slug(el.title)}
						className={({ isActive }) =>
							`${
								isActive ? 'text-main' : ''
							} hover:text-main font-normal text-black pt-[15px] pb-[14px] px-5 transition-all text-[16px] flex items-center gap-3`
						}
					>
						<DynamicIcon name={el.icon} size={20} />
						<span>{el?.title}</span>
					</NavLink>
				);
			})}
		</div>
	);
};

export default Sidebar;
