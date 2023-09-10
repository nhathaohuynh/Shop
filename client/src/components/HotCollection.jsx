import React from 'react';
import { useSelector } from 'react-redux';
import icons from '../utils/icon';

function HotCollection() {
	const { categories: cateProduct } = useSelector((state) => state?.app);
	const cateProductBrand = cateProduct?.filter((el) => el.brand.length !== 0);
	return (
		<div className='w-full'>
			<div className='flex justify-between items-center border-main border-b-2'>
				<h2 className='text-[20px] w-full font-semibold py-[15px] uppercase '>
					HOT COLLECTION
				</h2>
			</div>
			<div className='grid grid-cols-3 grid-rows-2 text-gray-400 font-normal gap-5 mt-5'>
				{cateProductBrand?.map((el) => {
					return (
						<div className='flex border p-3' key={crypto.randomUUID()}>
							<img
								src={el?.image}
								alt=''
								className='flex-1 w-[144px] h-[129px] object-contain'
							/>
							<div className='flex-1 flex flex-col justify-start'>
								<h5 className='text-[16px] text-[#333] mb-1 uppercase'>{el.title}</h5>
								<ul className='flex flex-col gap-1 justify-start '>
									{el?.brand?.map((brand) => (
										<li
											key={crypto.randomUUID()}
											className='text-[14px] flex items-center hover:text-main cursor-pointer'
										>
											<icons.MdOutlineNavigateNext size={20} />
											<span>{brand}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default HotCollection;
