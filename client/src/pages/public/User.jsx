import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header, Navigation, SubHeader } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCategories } from '../../redux/actions/appAction';
import Loading from '../../components/Loading';
const User = () => {
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state?.user);
	useEffect(() => {
		dispatch(getCategories());
	}, []);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<main className='w-full flex items-center flex-col'>
					<SubHeader />
					<Header />
					<Navigation />
					<div className='w-full font-medium'>
						<Outlet />
					</div>
					<Footer />
				</main>
			)}
		</>
	);
};

export default User;
