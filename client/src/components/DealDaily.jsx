import React, { useEffect, useState } from 'react';
import icons from '../utils/icon';
import { getProducts } from '../apis/product';
import { countdown, formatMoney, generateStar } from '../utils/helper';
import Countdown from './Countdown';
import moment from 'moment';

function DealDaily() {
	const [dailyProduct, setDailyProduct] = useState(null);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	const fetchDailyProduct = async () => {
		const response = await getProducts({ limit: 2, totalRatings: 5 });
		if (response.code === 1)
			setDailyProduct(response.metaData?.data?.products[1]);
	};

	useEffect(() => {
		fetchDailyProduct();
	}, []);

	useEffect(() => {
		const today = `${moment().format('MM/DD/YYYY')} 5:00:00`;
		let idInterval = setInterval(() => {
			const { hours: h, minutes: m, seconds: s } = countdown(today);

			setHours(h > 0 ? h : 0);
			setMinutes(m > 0 ? m : 0);
			setSeconds(s > 0 ? s : 0);
		}, 1000);
		return () => clearInterval(idInterval);
	}, []);
	return (
		<div className='border w-full flex-auto p-5 flex flex-col justify-between'>
			<div className='flex justify-between items-center w-full'>
				<span className='flex justify-center flex-1'>
					<icons.AiFillStar size={20} color='#dd1111' />
				</span>
				<span className='uppercase text-lg font-semibold text-center flex-8 text-gray-700'>
					Deal Daily
				</span>
				<span className='flex-1'></span>
			</div>
			<div className='w-full flex flex-col justify-center items-center pt-10 gap-2'>
				<img
					src={
						dailyProduct?.thumb ||
						'https://wgmimedia.com/wp-content/uploads/2023/04/digital_products.jpg'
					}
					alt='thumnb'
					className='w-full object-contain mb-[15px]'
				/>
				<span className='flex h-4'>
					{generateStar(dailyProduct?.totalRatings)?.map((el) => {
						if (el)
							return (
								<icons.AiFillStar
									color='orange'
									size={24}
									key={crypto.randomUUID()}
								/>
							);
						return (
							<icons.AiOutlineStar
								color='orange'
								size={24}
								key={crypto.randomUUID()}
							/>
						);
					})}
				</span>
				<span className='capitalize line-clamp-1 text-center'>
					{dailyProduct?.title}
				</span>
				<span>{formatMoney(dailyProduct?.price)}</span>
			</div>
			<div className='flex justify-center gap-2 my-[15px]'>
				<Countdown text={'Hours'} time={hours}></Countdown>
				<Countdown text={'Minutes'} time={minutes}></Countdown>
				<Countdown text={'seconds'} time={seconds}></Countdown>
			</div>
			<div>
				<button
					type='button'
					className='flex  gap-2 items-center justify-center w-full bg-main hover:bg-gray-700 text-white transition-all
					h-[40px]'
				>
					<icons.FiMenu></icons.FiMenu>
					<span className='text-sm'>Options</span>
				</button>
			</div>
		</div>
	);
}

export default DealDaily;
