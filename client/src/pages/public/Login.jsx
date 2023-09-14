import React, { useState } from 'react';
import bg_login from '../../assets/bg-login.png';
import icons from '../../utils/icon';
import { Link, useNavigate } from 'react-router-dom';
import { InputField } from '../../components';
import path from '../../utils/path';
import { apiForgotPassword, apiLogin } from '../../apis/user';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/userSlice';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const initInputs = {
		email: '',
		password: '',
	};
	const initFInputs = {
		femail: '',
		newPassword: '',
		comfirmPassword: '',
	};
	const [inputs, setInputs] = useState(initInputs);
	const [fInputs, setFInputs] = useState(initFInputs);
	const [isForgotPassword, setIsForgotPassword] = useState(false);

	const onChangeInput = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const onchnageFInput = (e) => {
		setFInputs({ ...fInputs, [e.target.name]: e.target.value });
	};
	const [isLoading, setIsLoading] = useState(false);

	const handleForgotPassword = async (e) => {
		e.preventDefault();
		const RegexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		// validate
		if (!fInputs.femail || !fInputs.newPassword || !fInputs.comfirmPassword) {
			return toast.error('Email or password can not be empty');
		}

		if (!RegexEmail.test(fInputs.femail)) {
			return toast.error('Invalid email');
		}

		if (fInputs.newPassword.length < 6 || fInputs.newPassword.length >= 20) {
			return toast.error(
				'Password must be at least 6 and maximun 20 character',
			);
		}

		if (fInputs.newPassword !== fInputs.comfirmPassword) {
			return toast.error(`Comfirm password isn't correct`);
		}

		const data = {
			email: fInputs.femail,
			password: fInputs.newPassword,
		};
		setIsLoading(true);
		const response = await apiForgotPassword(data);
		console.log(response)
		if (response?.code === 1) {
			setIsLoading(false);
			setFInputs(initFInputs);
			setIsForgotPassword(false);
			toast.success('Please! check your email ');
		} else {
			setIsLoading(false);
			setFInputs(initFInputs);
			setIsForgotPassword(false);
			toast.error(response?.message);
		}
	};

	const handleSubmit = async (e) => {
		const RegexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		e.preventDefault();

		// validate
		if (!inputs.email || !inputs.password) {
			return toast.error('Email or password can not be empty');
		}

		if (!RegexEmail.test(inputs.email)) {
			return toast.error('Invalid email');
		}

		if (inputs.password.length < 6 || inputs.password.length >= 20) {
			return toast.error(
				'Password must be at least 6 and maximun 20 character',
			);
		}

		setIsLoading(true);

		const response = await apiLogin(inputs);
		console.log(response);
		if (response.code === 1) {
			dispatch(
				login({
					currentUser: response.metaData?.user,
					token: response.metaData?.accessToken,
					isLogin: true,
				}),
			);
			setInputs(initInputs);
			setIsLoading(false);
			navigate(`/${path.HOME}`);
		} else {
			toast.error(response?.response?.data?.message);
			setInputs(initInputs);
			setIsLoading(false);
		}
	};
	return (
		<div className='h-screen w-full px-20 py-10 flex justify-center items-center bg-gray-800 text-white relative'>
			{isLoading ? (
				<Loading text />
			) : (
				<>
					{isForgotPassword ? (
						<div
							className='absolute top-0 left-0 right-0 bottom-0 bg-[rgba(255,255,255,0.3)] z-10 flex justify-center items-center'
							onClick={(e) => {
								setIsForgotPassword(false);
							}}
						>
							<div
								className='w-[600px] h-[500px] bg-white p-5 text-gray-900 animate-form'
								onClick={(e) => e.stopPropagation()}
							>
								<h3 className='font-semibold text-[20px] mt-5 '>
									Forgot Password
								</h3>
								<form className='mt-5 text-[14px]'>
									<InputField
										label={'Email'}
										name={'femail'}
										onChangeInput={onchnageFInput}
										value={fInputs.femail}
									/>
									<InputField
										label={'New password'}
										type={'password'}
										name={'newPassword'}
										onChangeInput={onchnageFInput}
										value={fInputs.newPassword}
									/>
									<InputField
										label={'Comfirm password'}
										type={'password'}
										name={'comfirmPassword'}
										onChangeInput={onchnageFInput}
										value={fInputs.comfirmPassword}
									/>
									<button
										className='bg-blue-500 hover:bg-blue-600 inline-block w-full mt-5 rounded bg-primary px-7 pb-2.5 pt-2.5 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out'
										onClick={(e) => handleForgotPassword(e)}
									>
										Submit
									</button>
								</form>
							</div>
						</div>
					) : null}

					<div className='flex justify-center relative items-end h-max-[600px] w-max-[600px] gap-10 p-5 '>
						{/* Left column container with background*/}
						<div className='flex-3 flex items-center justify-center'>
							<img
								src={bg_login}
								className='w-[90%] h-[90%] object-contain'
								alt='login image'
							/>
						</div>
						{/* Right column container with form */}
						<div className='flex-2 text-[14px] mt-10'>
							<form>
								{/* Email input */}
								<InputField
									label={'Email address'}
									name={'email'}
									type={'email'}
									onChangeInput={onChangeInput}
									value={inputs.email}
								/>
								{/* Password input */}
								<InputField
									label={'Password'}
									type={'password'}
									name={'password'}
									onChangeInput={onChangeInput}
									value={inputs.password}
								/>
								{/* Remember me checkbox */}
								<div className='mb-6 flex items-center justify-between'>
									<div className='block text-center'>
										<span>
											<span>Do you have any account? </span>
											<Link
												to={`/${path.REGISTER}`}
												className='underline text-blue-500 hover:text-blue-700'
											>
												Sign up
											</Link>
										</span>
									</div>

									{/* Forgot password link */}
									<div
										onClick={() => setIsForgotPassword(true)}
										className='underline hover:text-blue-700 cursor-pointer text-blue-500 text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600'
									>
										Forgot password?
									</div>
								</div>
								{/* Submit button */}
								<button
									className='bg-blue-500 hover:bg-blue-600 inline-block w-full rounded bg-primary px-7 pb-2.5 pt-2.5 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out'
									onClick={(e) => handleSubmit(e)}
								>
									Log in
								</button>
								{/* Divider */}
								<div className='my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300'>
									<p className='mx-4 mb-0 text-center text-gray-700 font-semibold'>
										OR
									</p>
								</div>
								{/* Social login buttons */}
								<button className='mb-3 flex gap-2 w-full items-center justify-center rounded bg-red-600 px-7 pb-2.5 pt-2.5 text-center text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-red-700 hover'>
									{/* Google */}
									<icons.FcGoogle size={20} />
									Continue with Google
								</button>
							</form>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Login;
