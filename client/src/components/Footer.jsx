import React from 'react';
import icons from '../utils/icon';

const Footer = () => {
	return (
		<footer className='w-full'>
			<div className='w-full flex justify-center items-center bg-main py-10'>
				<div className='w-main flex justify-between items-center'>
					<div className='text-gray-100 flex-1'>
						<h5 className='text-[20px]'>SIGN UP TO NEWSLETTER</h5>
						<small>Subscribe now and receive weekly newsletter</small>
					</div>
					<div className='flex-1'>
						<div className='relative w-50%'>
							<input
								type='search'
								id='default-search'
								className='block w-full outline-none p-3 pl-5 text-sm text-gray-900 border  bg-gray-50 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500'
								placeholder='Email address'
								required
							/>
							<button
								type='submit'
								className='text-white absolute  w-[10%] flex justify-center items-center right-0 bottom-0 top-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
							>
								<icons.AiOutlineMail />
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full flex justify-center items-center bg-gray-700'>
				<div className='w-main flex gap-2 py-[50px] text-gray-100 text-sm'>
					<div className='flex-5'>
						<Title content={'About us'} />
						<div className='flex gap-4 flex-col justify-start mt-[20px]'>
							<span className='flex items-center gap-1'>
								<icons.CiLocationOn size={16} />
								<span>Address: 474 Ontario St Toronto, ON M4X 1M7 Canada</span>
							</span>
							<span className='flex items-center gap-1'>
								<icons.AiOutlinePhone size={16} />
								<span>Phone: (+1234)56789xxx</span>
							</span>
							<span className='flex items-center gap-1'>
								<icons.MdEmail></icons.MdEmail>
								<span>Mail: tadathemes@gmail.com</span>
							</span>
						</div>
					</div>
					<div className='flex-2'>
						<Title content={'Infomation'} />
						<div className='flex gap-4 flex-col justify-start mt-[20px]'>
							<span>Typography</span>
							<span>Gallery</span>
							<span>Store Location</span>
							<span>Today's Deals</span>
							<span>Contact</span>
						</div>
					</div>
					<div className='flex-2'>
						<Title content={'Who We Are'} />
						<div className='flex gap-4 flex-col justify-start mt-[20px]'>
							<span>Help</span>
							<span>Free Shipping</span>
							<span>FAQs</span>
							<span>Return & Exchange</span>
							<span>Testimonials</span>
						</div>
					</div>
					<div className='flex-1'>
						<Title content={'#DIGITALWORLDSTORE'} />
					</div>
				</div>
			</div>
		</footer>
	);
};

const Title = ({ content }) => {
	return (
		<div className='flex gap-2 items-center text-white text-[16px]'>
			<span className='w-[3px] h-[30px] bg-main'></span>
			<span className='uppercase'>{content}</span>
		</div>
	);
};

export default Footer;
