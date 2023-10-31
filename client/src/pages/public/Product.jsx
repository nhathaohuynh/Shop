import React from 'react'
import { useParams } from 'react-router-dom'
import { Breadcrumb } from '../../components'

function Product() {
	const { category } = useParams()
	console.log(category)
	return (
		<section>
			<div className='h-[80px] flex justify-center items-center bg-gray-100'>
				<div className='w-main'>
					<div className='py-2'>
						<h3 className='mb-1 font-semibold'>{category?.toUpperCase()}</h3>
						<Breadcrumb category={category?.toLowerCase()} />
					</div>
				</div>
			</div>
		</section>
	)
}

export default Product
