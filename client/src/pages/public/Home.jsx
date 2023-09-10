import React from 'react';
import {
	Banner,
	BestSell,
	FeatureProduct,
	DealDaily,
	Sidebar,
	ArrivalProduct,
	HotCollection,
	BlogPost,
} from '../../components';

const Home = () => {
	return (
		<>
			<div className='flex'>
				<div className='flex flex-col gap-5 w-[25%] flex-auto'>
					<Sidebar />
					<DealDaily />
				</div>
				<div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto '>
					<Banner />
					<BestSell></BestSell>
				</div>
			</div>
			<div className='my-8'>
				<FeatureProduct />
			</div>
			<div className='my-8'>
				<ArrivalProduct />
			</div>
			<div className='my-8'>
				<HotCollection />
			</div>
			<div className='my-8'>
				<BlogPost />
			</div>
		</>
	);
};

export default Home;
