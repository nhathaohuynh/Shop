import React, { useEffect, useState } from 'react';
import { getProducts } from '../apis/product';
import ProductCard from './ProductCard';
import featured1 from '../assets/product1.webp';
import featured2 from '../assets/product2.webp';
import featured3 from '../assets/product3.webp';
import featured4 from '../assets/product4.webp';

function FeatureProduct() {
	const [products, setProducts] = useState([]);

	const fetchProducts = async () => {
		const response = await getProducts({
			limit: 9,
			sort: '-price',
			totalRatings: 5,
		});
		if (response.code === 1) setProducts(response.metaData?.data?.products);
	};

	useEffect(() => {
		fetchProducts();
	}, []);
	return (
		<div className='w-full'>
			<h2 className='text-[20px] w-full font-semibold py-[15px] border-main border-b-2'>
				FEATURED PRODUCTS
			</h2>
			<div className='grid grid-rows-3 grid-cols-3 gap-[20px] mt-5'>
				{products?.map((el) => (
					<ProductCard product={el} key={crypto.randomUUID()} />
				))}
			</div>
			<div className='grid grid-cols-4 grid-rows-1-1 gap-5 mt-5'>
				<div className='col-span-1-3 row-span-1-2'>
					<img src={featured1} alt='' className='w-full object-cover' />
				</div>
				<div className='col-span-3-4 '>
					<img src={featured2} alt='' className='w-full object-cover' />
				</div>
				<div className='col-span-3-4 row-span-2-2 mt-[20px]'>
					<img src={featured3} alt='' className='w-full object-cover' />
				</div>
				<div className='col-span-4-5 row-span-1-2'>
					<img src={featured4} alt='' className='w-full object-cover' />
				</div>
			</div>
		</div>
	);
}

export default FeatureProduct;
