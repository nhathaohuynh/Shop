import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header, Navigation, SubHeader } from '../../components';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCategories } from '../../redux/actions/appAction';
const User = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCategories());
	}, []);

	return (
		<div className='w-full flex items-center flex-col'>
			<SubHeader />
			<Header />
			<Navigation />
			<div className='w-main font-medium'>
				<Outlet />
			</div>
			<Footer/>
		</div>
	);
};

export default User;
