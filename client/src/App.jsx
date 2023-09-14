import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
	Login,
	User,
	Home,
	DetailProduct,
	Blog,
	Product,
	Service,
	Contact,
	FAQ,
	Register,
	Authentication,
	ForgotPassword,
} from './pages/public';
import path from './utils/path';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';
function App() {
	return (
		<div className='font-main'>
			<Routes>
				<Route element={<User />} path={path.PUBLIC}>
					<Route element={<Home />} path={path.HOME} />
					<Route element={<Product />} path={path.PRODUCTS} />
					<Route
						element={<DetailProduct />}
						path={path.DETAIL_PRODUCTS_ID_NAME}
					/>
					<Route element={<Blog />} path={path.BLOGS} />
					<Route element={<Service />} path={path.OUR_SERVICES} />
					<Route element={<Contact />} path={path.CONTACTS} />
					<Route element={<FAQ />} path={path.FAQS} />
				</Route>
				<Route element={<Login />} path={path.LOGIN} />
				<Route element={<Register />} path={path.REGISTER} />
				<Route element={<Authentication />} path={path.AUTHENTICATION} />
				<Route element={<ForgotPassword />} path={path.FORGOT_PASSWORD} />
			</Routes>
		</div>
	);
}

export default App;
