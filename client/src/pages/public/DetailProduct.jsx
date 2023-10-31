import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct, getProducts } from '../../apis'
import { Breadcrumb, ScrollToTop } from '../../components'
import CustomSlider from '../../components/CustomSlider'
import Loading from '../../components/Loading'
import { formatMoney, generateStar } from '../../utils/helper'
import icons from '../../utils/icon'

function DetailProduct() {
	const { title, id: idProduct, category } = useParams()

	const [loading, setLoading] = useState(false)
	const [product, setProduct] = useState('')
	const [otherProduct, setOtherProduct] = useState([])
	const [productThumb, setProductThumb] = useState('')
	const [quantity, setQuantity] = useState(1)

	const fetchData = async () => {
		setLoading(true)
		const response = await Promise.all([
			getProduct(idProduct),
			getProducts({ category }),
		])

		if (response.length > 0) {
			setLoading(false)
			setProduct(response[0]?.metaData?.product)
			console.log(response)
			setOtherProduct(response[1]?.metaData?.data?.products)
		} else {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (idProduct) {
			fetchData()
		}
	}, [idProduct])

	const handleClickProductImg = (image) => {
		console.log(image)
		setProductThumb(image)
	}

	const handleClickIncreaseQuantity = (wareHouse) => {
		if (quantity === wareHouse) setQuantity(wareHouse)
		else setQuantity((pre) => pre + 1)
	}

	const handleDescreaseQuantity = () => {
		if (quantity === 1) setQuantity(1)
		else setQuantity((pre) => pre - 1)
	}

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<section>
					<ScrollToTop></ScrollToTop>
					<div className='h-[80px] flex justify-center items-center bg-gray-100'>
						<div className='w-main'>
							<div className='py-2'>
								<h3 className='mb-1 font-semibold'>{title}</h3>
								<Breadcrumb
									title={product?.title?.toLowerCase()}
									category={product?.category?.toLowerCase()}
								/>
							</div>
						</div>
					</div>
					<div className='w-main mx-auto mt-4'>
						<div className='overflow-hidden bg-white py-11 font-poppin shadow'>
							<div className='max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6'>
								<div className='flex flex-wrap -mx-4'>
									<div className='w-full mb-8 md:w-1/2 md:mb-0'>
										<div className='sticky top-0 z-50 overflow-hidden '>
											<div className='relative mb-6 lg:mb-10 flex justify-center items-center'>
												<img
													src={productThumb || product?.thumb}
													alt=''
													className='object-contain w-[300px] h-[350px] '
												/>
											</div>
											<div className='flex-wrap flex'>
												{product?.images
													?.filter((_, index) => index < 3)
													?.map((image) => (
														<div
															className='p-2 w-1/3'
															key={crypto.randomUUID()}
														>
															<div
																className='block border  hover:border-blue-300'
																onClick={() => handleClickProductImg(image)}
															>
																<img
																	src={image}
																	alt=''
																	className='object-contain w-full h-[160px] p-2'
																/>
															</div>
														</div>
													))}
											</div>
											<div className='px-6 pb-6 mt-6 border-t border-gray-300 dark:border-gray-400 '>
												<div className='flex flex-wrap items-center mt-6'>
													<span className='mr-2'>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															width={16}
															height={16}
															fill='currentColor'
															className='w-4 h-4 text-gray-700 bi bi-truck'
															viewBox='0 0 16 16'
														>
															<path d='M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z'></path>
														</svg>
													</span>
													<h2 className='text-[16px] font-semibold text-gray-700'>
														Free Shipping
													</h2>
												</div>
											</div>
										</div>
									</div>
									<div className='w-full px-4 md:w-1/2 '>
										<div className='lg:pl-20'>
											<div className='mb-4'>
												<div className='flex items-center justify-between'>
													<h2 className='max-w-xl mb-2 text-2xl font-bold capitalize'>
														{product?.title?.toLowerCase()}
													</h2>
													<span className='text-[14px] italic text-main'>{`Warehouse: ${product?.quantity}`}</span>
												</div>
												<span className='flex h-4 mb-4 gap-1'>
													{generateStar(product?.totalRatings)?.map((el) => {
														if (el)
															return (
																<icons.AiFillStar
																	color='orange'
																	size={24}
																	key={crypto.randomUUID()}
																/>
															)
														return (
															<icons.AiOutlineStar
																color='orange'
																size={24}
																key={crypto.randomUUID()}
															/>
														)
													})}
													<span className='text-main italic font-[14px]'>
														{`(Sold ${product?.sold})`}
													</span>{' '}
												</span>
												<p className='inline-block mb-3 text-xl font-semiobold text-gray-700  '>
													<span>{formatMoney(product?.price) || 0}</span>
												</p>
												<ul>
													{product?.description?.map((el) => (
														<li
															className='max-w-md text-[16px] text-gray-700 flex items-center'
															key={crypto.randomUUID()}
														>
															<div className='w-[8px] bg-red-400 h-[8px] rounded-full mr-2'></div>
															{el}
														</li>
													))}
												</ul>
											</div>
											<div className='w-32 mb-8 '>
												<label className='w-full pb-1 text-lg font-semibold border-b border-blue-500 '>
													Quantity
												</label>
												<div className='relative flex flex-row w-full h-10 mt-6 bg-transparent rounded-lg'>
													<button
														onClick={() => handleDescreaseQuantity()}
														className='w-20 h-full text-black bg-gray-100 rounded-l outline-none cursor-pointer  hover:text-gray-700  hover:bg-gray-200'
													>
														<span className='m-auto text-2xl font-thin'>-</span>
													</button>
													<span className='flex justify-center mx-auto items-center w-full font-semibold text-center text-gray-900 bg-gray-100 text-md hover:text-black'>
														{quantity}
													</span>
													<button
														onClick={() =>
															handleClickIncreaseQuantity(product?.quantity)
														}
														className='w-20 h-full text-black bg-gray-100 rounded-r outline-none cursor-pointer  hover:text-gray-700 hover:bg-gray-200'
													>
														<span className='m-auto text-2xl font-thin'>+</span>
													</button>
												</div>
											</div>
											<div className='flex flex-wrap items-center gap-4'>
												<button className='w-full p-4 bg-blue-500 rounded-md lg:w-2/5 text-white hover:bg-blue-600'>
													Add to cart
												</button>
												<button className='flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md lg:w-2/5  hover:bg-blue-600 hover:border-blue-600 hover:text-white '>
													Buy Now
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='w-main mx-auto'>
						<div className='flex justify-between items-center border-main border-b-2'>
							<h2 className='text-[20px] w-full font-semibold py-[15px] uppercase'>
								Other Product
							</h2>
						</div>
						<div className='mt-5 mx-[-10px]'>
							<CustomSlider products={otherProduct} />
						</div>
					</div>
				</section>
			)}
		</>
	)
}

export default DetailProduct
