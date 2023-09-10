import React from 'react';
import { formatMoney, generateStar } from '../utils/helper';
import icons from '../utils/icon';

function ProductCard({ product }) {
	return (
		<div className='flex border w-full p-4 gap-3 cursor-pointer hover:shadow-md transition-all'>
			<img
				src={product?.thumb}
				alt=''
				className='w-[90px] h-[90px] object-cover'
			/>
			<div className='flex flex-col gap-1'>
				<span className='capitalize line-clamp-1 text-[#2b3743]'>
					{product?.title.toLowerCase()}
				</span>
				<span className='flex h-4'>
					{generateStar(product?.totalRatings)?.map((el) => {
						if (el)
							return (
								<icons.AiFillStar color='orange' key={crypto.randomUUID()} />
							);
						return (
							<icons.AiOutlineStar color='orange' key={crypto.randomUUID()} />
						);
					})}
				</span>
				<span className='text-[#2b3743]'>{formatMoney(product?.price)}</span>
			</div>
		</div>
	);
}

export default ProductCard;
