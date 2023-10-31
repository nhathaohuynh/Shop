import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomSlider from './CustomSlider'
import { getArrivalProducts } from '../redux/actions/productAction'
import Loading from './Loading'

const tabs = [
	{
		id: 1,
		name: 'Smartphone',
	},
	{
		id: 2,
		name: 'Tablet',
	},
	{
		id: 3,
		name: 'Laptop',
	},
]

function ArrivalProduct() {
	const dispatch = useDispatch()
	const [arrivalProducts, setArrivalProducts] = useState([])
	const [tab, setTab] = useState(1)
	const { arrivalProduct: products } = useSelector((state) => state?.products)
	const optionApi = { sort: '-createdAt', limit: 9, category: 'Smartphone' }
	useEffect(() => {
		dispatch(getArrivalProducts(optionApi))
	}, [])

	useEffect(() => {
		setArrivalProducts(products)
	}, [products])

	return (
		<div className='w-full'>
			<div className='flex justify-between items-center border-main border-b-2'>
				<h2 className='text-[20px] w-full uppercase font-semibold py-[15px] '>
					Arrival Product
				</h2>
				<div className='flex gap-5 text-gray-400 font-normal'>
					{tabs.map((el) => (
						<span
							className={`${el.id === tab ? 'text-main' : ''} cursor-pointer`}
							key={el.id}
							onClick={() => {
								setTab(el.id)
								dispatch(
									getArrivalProducts({
										...optionApi,
										category: el.name,
									}),
								)
							}}
						>
							{el.name}
						</span>
					))}
				</div>
			</div>
			<div className='mt-5 mx-[-10px]'>
				<CustomSlider
					products={arrivalProducts}
					isNew={true}
					isDescription={true}
				/>
			</div>
		</div>
	)
}

export default ArrivalProduct
