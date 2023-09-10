import React, { useEffect, useState } from 'react';
import { getProducts } from '../apis/product';

import CustomSlider from './CustomSlider';
const tabs = [
	{
		id: 1,
		name: 'Best seller',
	},
	{
		id: 2,
		name: 'News Arrivals',
	},
];
const BestSell = () => {
	const [tab, setTab] = useState(1);
	const [bestSeller, setBestSeller] = useState([]);
	const [newProducts, setNewProducts] = useState([]);
	const [products, setProducts] = useState([]);

	const fetchData = async () => {
		const response = await Promise.all([
			getProducts({ sort: '-sold' }),
			getProducts({ sort: '-createAt' }),
		]);

		if (response[0]?.code) {
			setBestSeller(response[0].metaData.data.products);
			setProducts(response[0].metaData.data.products);
		}

		if (response[1]?.code) setNewProducts(response[1].metaData.data.products);
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (tab === 1) setProducts(bestSeller);
		if (tab === 2) setProducts(newProducts);
	}, [tab]);
	return (
		<div>
			<div className='flex text-[20px] gap-8 pb-4 border-b-2 border-main'>
				{tabs.map((el) => (
					<span
						className={`${
							el.id === tab ? 'text-main' : ''
						} cursor-pointer uppercase`}
						key={el.id}
						onClick={() => setTab(el.id)}
					>
						{el.name}
					</span>
				))}
			</div>
			<div className='mt-4 mx-[-10px]'>
				<CustomSlider
					products={products}
					isTrending={tab === 1 ? true : false}
					isNew={tab === 2 ? true : false}
				/>
			</div>
			<div className='w-full flex gap-4 mt-8'>
				<img
					src='https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657'
					alt='banner'
					className='cursor-pointer flex-auto'
				/>
				<img
					src='https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657'
					alt='banner'
					className='cursor-pointer flex-auto'
				/>
			</div>
		</div>
	);
};

export default BestSell;
