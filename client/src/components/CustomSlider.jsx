import React from 'react';
import Product from './Product';
import Slider from 'react-slick';
import icons from '../utils/icon';
function CustomSlider({ products, isNew, isTrending, isDescription }) {
	var settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
	};
	return (
		<Slider {...settings}>
			{products?.map((el) => (
				<Product
					key={crypto.randomUUID()}
					productData={el}
					isNew={isNew}
					isTrending={isTrending}
					isDescription={isDescription}
				/>
			))}
		</Slider>
	);
}

const PrevArrow = (props) => {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{
				...style,
				backgroundColor: 'rgba(255,255,255,0.5)',
				width: '40px',
				height: '40px',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: '9999px',
				left: '20px',
				top: '100px',
				zIndex: '10',
			}}
			onClick={onClick}
		>
			<icons.MdOutlineNavigateBefore size={60} color='#333' className='arrow' />
		</div>
	);
};
const NextArrow = (props) => {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{
				...style,
				backgroundColor: 'rgba(255,255,255,0.5)',
				width: '40px',
				height: '40px',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: '9999px',
				right: '20px',
				top: '100px',
				zIndex: '10',
			}}
			onClick={onClick}
		>
			<icons.MdOutlineNavigateNext size={60} color='#333' className='arrow' />
		</div>
	);
};

export default CustomSlider;
