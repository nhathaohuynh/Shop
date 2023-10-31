import React from 'react'
import {
	Banner,
	BestSell,
	FeatureProduct,
	DealDaily,
	Sidebar,
	ArrivalProduct,
	HotCollection,
	BlogPost,
	ScrollToTop,
} from '../../components'

const Home = () => {
	return (
		<div className='w-main m-auto'>
			<ScrollToTop></ScrollToTop>
			<section className='flex mt-6'>
				<div className='flex flex-col gap-5 w-[25%] flex-auto'>
					<Sidebar />
					<DealDaily />
				</div>
				<div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto '>
					<Banner />
					<BestSell></BestSell>
				</div>
			</section>
			<section className='my-8'>
				<FeatureProduct />
			</section>
			<section className='my-8'>
				<ArrivalProduct />
			</section>
			<section className='my-8'>
				<HotCollection />
			</section>
			<section className='my-8'>
				<BlogPost />
			</section>
		</div>
	)
}

export default Home
