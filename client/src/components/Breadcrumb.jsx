import React from 'react';
import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import icons from '../utils/icon';

// map & render your breadcrumb components however you want.
const Breadcrumb = ({ category, title }) => {
	const routes = [
		{ path: '/', breadcrumb: 'Home' },
		{ path: '/:category', breadcrumb: category },
		{ path: '/:category/:id/:title', breadcrumb: title },
	];

	const breadcrumbs = useBreadcrumbs(routes);

	return (
		<div className='flex text-[14px] item-center gap-1'>
			{breadcrumbs
				.filter((el) => !el.match.route === false)
				.map(({ match, breadcrumb }, index, self) => (
					<Link
						key={match.pathname}
						to={match.pathname}
						className='font-normal'
					>
						{index !== self.length - 1 ? (
							<span className=' flex items-center'>
								<span className='hover:text-main capitalize font-medium'>{breadcrumb}</span>
								<icons.MdOutlineNavigateNext size={12} />
							</span>
						) : (
							<span className='select-none capitalize text-main'>
								<span>{breadcrumb}</span>
							</span>
						)}
					</Link>
				))}
		</div>
	);
};
export default Breadcrumb;
