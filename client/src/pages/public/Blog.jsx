import React from 'react'

function Blog() {
	return (
		<section className='flex items-center bg-gray-100 lg:h-screen dark:bg-gray-800'>
			<div className='p-4 mx-auto max-w-7xl'>
				<div className='grid grid-cols-1 gap-4 lg:gap-8 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3'>
					<div className='mb-0 overflow-hidden bg-white rounded shadow dark:bg-gray-700'>
						<div className='relative overflow-hidden h-72'>
							<span className='absolute px-3 py-1 text-xs text-white bg-blue-500 rounded bottom-3 right-3'>
								Gadgets
							</span>
							<img
								className='object-cover w-full h-full transition-all hover:scale-110'
								src='https://i.postimg.cc/25h4dvrd/pexels-karol-d-325153.jpg'
							/>
						</div>
						<div className='relative z-20 p-8 -mt-16 '>
							<div className='flex items-center'>
								<img
									className='object-cover w-20 h-20 mb-4 border-4 border-white rounded-full dark:border-gray-700'
									src='https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg?cs=srgb&dl=pexels-thorn-yang-139829.jpg&fm=jpg'
								/>
								<div className='flex flex-col items-center ml-2'>
									<span className='block mt-3 mb-2 text-xs font-semibold text-blue-700 uppercase dark:text-blue-300'>
										John Doe • 6th Jun, 2022
									</span>
								</div>
							</div>
							<h2 className='mb-3 text-2xl font-bold leading-9 text-blue-800 dark:text-white'>
								Lorem ipsum dolor sit amet, consectetur
							</h2>
							<p className='mb-4 text-base leading-7 text-gray-400'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam
							</p>
							<a className='flex items-center text-sm font-semibold' href='#'>
								<div className='flex items-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'>
									More Details
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width={12}
										height={12}
										fill='currentColor'
										className='ml-1'
										viewBox='0 0 16 16'
									>
										<path
											fillRule='evenodd'
											d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'
										></path>
									</svg>
								</div>
							</a>
						</div>
					</div>
					<div className='mb-0 overflow-hidden bg-white rounded shadow dark:bg-gray-700'>
						<div className='relative overflow-hidden h-72'>
							<span className='absolute px-3 py-1 text-xs text-white bg-blue-500 rounded bottom-3 right-3'>
								Architect
							</span>
							<img
								className='object-cover w-full h-full transition-all hover:scale-110'
								src='https://i.postimg.cc/GmM9VxxJ/pexels-pavel-danilyuk-8381916.jpg'
							/>
						</div>
						<div className='relative z-20 p-8 -mt-16 '>
							<div className='flex items-center'>
								<img
									className='object-cover w-20 h-20 mb-4 border-4 border-white rounded-full dark:border-gray-700'
									src='https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg?cs=srgb&dl=pexels-thorn-yang-139829.jpg&fm=jpg'
								/>
								<div className='flex flex-col items-center ml-2'>
									<span className='block mt-3 mb-2 text-xs font-semibold text-blue-700 uppercase dark:text-blue-300'>
										John Doe • 6th Jun, 2022
									</span>
								</div>
							</div>
							<h2 className='mb-3 text-2xl font-bold leading-9 text-blue-800 dark:text-white'>
								Lorem ipsum dolor sit amet, consectetur
							</h2>
							<p className='mb-4 text-base leading-7 text-gray-400'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam
							</p>
							<a className='flex items-center text-sm font-semibold' href='#'>
								<div className='flex items-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'>
									More Details
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width={12}
										height={12}
										fill='currentColor'
										className='ml-1'
										viewBox='0 0 16 16'
									>
										<path
											fillRule='evenodd'
											d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'
										></path>
									</svg>
								</div>
							</a>
						</div>
					</div>
					<div className='mb-0 overflow-hidden bg-white rounded shadow dark:bg-gray-700'>
						<div className='relative overflow-hidden h-72'>
							<span className='absolute px-3 py-1 text-xs text-white bg-blue-500 rounded bottom-3 right-3'>
								Business
							</span>
							<img
								className='object-cover w-full h-full transition-all hover:scale-110'
								src='https://i.postimg.cc/rpbTSLyM/pexels-andrea-piacquadio-3760263.jpg'
							/>
						</div>
						<div className='relative z-20 p-8 -mt-16 '>
							<div className='flex items-center'>
								<img
									className='object-cover w-20 h-20 mb-4 border-4 border-white rounded-full dark:border-gray-700'
									src='https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg?cs=srgb&dl=pexels-thorn-yang-139829.jpg&fm=jpg'
								/>
								<div className='flex flex-col items-center ml-2'>
									<span className='block mt-3 mb-2 text-xs font-semibold text-blue-700 uppercase dark:text-blue-300'>
										John Doe • 6th Jun, 2022
									</span>
								</div>
							</div>
							<h2 className='mb-3 text-2xl font-bold leading-9 text-blue-800 dark:text-white'>
								Lorem ipsum dolor sit amet, consectetur
							</h2>
							<p className='mb-4 text-base leading-7 text-gray-400'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam
							</p>
							<a className='flex items-center text-sm font-semibold' href='#'>
								<div className='flex items-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'>
									More Details
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width={12}
										height={12}
										fill='currentColor'
										className='ml-1'
										viewBox='0 0 16 16'
									>
										<path
											fillRule='evenodd'
											d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'
										></path>
									</svg>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Blog
