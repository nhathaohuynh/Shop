import React, { useState } from 'react'
import { formatMoney, generateStar } from '../utils/helper'

import newLabel from '../assets/new.png'
import tredingLabel from '../assets/trending.png'
import icons from '../utils/icon'
import Option from './Option'
import { Link } from 'react-router-dom'

const Product = ({ productData, isNew, isTrending, isDescription }) => {
	const [isHoverImage, setIsHoverImage] = useState(false)
	return (
		<div className='w-full px-[10px] mb-4'>
			<Link
				to={`/${productData?.category?.toLowerCase()}/${productData?._id}/${
					productData?.title
				}`}
				className={`w-full border block ${
					isDescription ? 'h-[485px]' : 'h-[385px]'
				}flex flex-col items-center justify-between gap-4 hover:shadow-md transition-all`}
				onMouseEnter={(e) => {
					e.stopPropagation()
					setIsHoverImage(true)
				}}
				onMouseLeave={(e) => {
					e.stopPropagation()
					setIsHoverImage(false)
				}}
			>
				<div className='w-full p-3 relative'>
					{isHoverImage && (
						<div className='absolute bottom-[-5px] left-0 right-0 justify-center gap-3 flex animate-slide-top z-20'>
							<Option icon={<icons.AiFillHeart size={16} />}></Option>
							<Option icon={<icons.FiMenu size={16} />}></Option>
							<Option icon={<icons.AiFillEye size={16} />}></Option>
						</div>
					)}
					{isHoverImage && isDescription && (
						<ul className='absolute bottom-[-20px] font-normal left-0 text-white right-0 top-0 px-[50px] pt-[50px] animate-slide-top z-10 bg-[rgba(0,0,0,0.3)] flex flex-col gap-1 justify-start '>
							{productData?.description.map((el) => (
								<li key={crypto.randomUUID()}>{el}</li>
							))}
						</ul>
					)}
					<img
						src={
							productData?.thumb ||
							'https://wgmimedia.com/wp-content/uploads/2023/04/digital_products.jpg'
						}
						alt='thumnb'
						className={`w-full ${
							isDescription ? 'h-[345px]' : 'h-[243px]'
						}object-contain`}
					/>
					{isNew ? (
						<img
							src={newLabel}
							alt='new label'
							className='absolute top-0 right-[0px] w-[70px]'
						/>
					) : null}
					{isTrending ? (
						<img
							src={tredingLabel}
							alt='trending label'
							className='absolute top-0 right-[0px] w-[70px]'
						/>
					) : null}
				</div>
				<div
					className={`flex flex-col gap-1 w-full items-start p-3 ${
						isDescription ? 'text-[16px] mt-[5px]' : 'text-sm mt-[15px]'
					}`}
				>
					<span className='flex h-4'>
						{generateStar(productData?.totalRatings)?.map((el) => {
							if (el)
								return (
									<icons.AiFillStar color='orange' key={crypto.randomUUID()} />
								)
							return (
								<icons.AiOutlineStar color='orange' key={crypto.randomUUID()} />
							)
						})}
					</span>
					<span className='capitalize line-clamp-1'>
						{productData?.title?.toLowerCase()}
					</span>
					<span>{formatMoney(productData?.price)}</span>
				</div>
			</Link>
		</div>
	)
}

export default Product
