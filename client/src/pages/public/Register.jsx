import React, { useState } from 'react';
import bg_register from '../../assets/bg-login.png';
import { InputField } from '../../components';
import { apiRegister } from '../../apis/user';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';
import path from '../../utils/path';
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const initInputs = {
		email: '',
		password: '',
		username: '',
		comfirmPassword: '',
	};
	const [inputs, setInputs] = useState(initInputs);

	const onChangeInput = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		//validate
		if (
			!inputs.email ||
			!inputs.password ||
			!inputs.comfirmPassword ||
			!inputs.username
		) {
			toast.error('All of fields can not be empty');
			return;
		}

		const RegexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

		if (!RegexEmail.test(inputs.email)) {
			return toast.error('Invalid email');
		}

		if (inputs.password.length < 6 || inputs.password.length >= 20) {
			return toast.error(
				'Password must be at least 6 and maximun 20 character',
			);
		}

		if (inputs.password !== inputs.comfirmPassword) {
			return toast.error(`Comfirm password isn't correct`);
		}
		const data = {
			email: inputs.email,
			password: inputs.password,
			username: inputs.username,
		};

		setIsLoading(true);

		const response = await apiRegister(data);

		if (response?.code === 1) {
			setIsLoading(false);
			setInputs(initInputs);
			navigate(`/${path.LOGIN}`);
		} else {
			setIsLoading(false);
			setInputs(initInputs);
			toast.error(response?.message);
		}

		// const data = {
		// 	email: inputs.email,
		// 	password: inputs.password,
		// 	username: inputs.username,
		// };
		// const response = await apiRegister(data);

		// if (response.code === 1) {
		// 	setIsLoading(false);
		// 	toast.success('Register successfully! Please check email');
		// } else {
		// 	console.log(response);
		// 	toast.error(response?.response?.data?.message);
		// 	setIsLoading(false);
		// }
	};

	return (
		<div className='h-screen w-full px-20 py-10 flex justify-center items-center bg-gray-800 text-white'>
			{isLoading ? (
				<Loading />
			) : (
				<div className='flex justify-center relative items-center h-max-[600px] w-max[600px] gap-10 p-5 '>
					{/* Left column container with background*/}
					<div className='flex-3 flex items-end justify-center order-2'>
						<img
							src={bg_register}
							className='w-[90%] h-[90%] object-contain'
							alt='Phone image'
						/>
					</div>
					{/* Right column container with form */}
					<div className='flex-2 order-1 text-[14px] mt-5 '>
						<form>
							{/* Email input */}
							<InputField
								label={'Email address'}
								name={'email'}
								type={'email'}
								onChangeInput={onChangeInput}
								value={inputs.email}
							/>
							{/* username input */}
							<InputField
								label={'Username'}
								name={'username'}
								type={'text'}
								onChangeInput={onChangeInput}
								value={inputs.username}
							/>
							<InputField
								label={'Password'}
								type={'password'}
								name={'password'}
								onChangeInput={onChangeInput}
								value={inputs.password}
							/>

							<InputField
								label={'Comfirm Password'}
								name={'comfirmPassword'}
								type='password'
								onChangeInput={onChangeInput}
								value={inputs.comfirmPassword}
							/>
							{/* Remember me checkbox */}
							<div className='mb-6 flex items-center justify-between'>
								<div className='block text-center'>
									<span>
										<span>Do you have any account? </span>
										<Link
											to={`/${path.LOGIN}`}
											className='underline text-blue-500 hover:text-blue-700'
										>
											Sign in
										</Link>
									</span>
								</div>
							</div>
							{/* Submit button */}
							<button
								className='bg-blue-500 hover:bg-blue-600 inline-block w-full rounded px-7 pb-2.5 pt-2.5 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out'
								onClick={(e) => handleSubmit(e)}
							>
								Register
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default Register;
