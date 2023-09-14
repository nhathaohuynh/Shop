import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import path from '../../utils/path';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
	const { status } = useParams();
	const navigate = useNavigate();

	if (status === 'failed') { 
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong!! Please try again',
		}).then((result) => {
			if (result.isConfirmed) navigate(`/${path.LOGIN}`);
		});
	} else {
		Swal.fire({
			icon: 'success',
			title: 'congratulations',
			text: 'Password already reseted successfull! Please login',
		}).then((result) => {
			if (result.isConfirmed) navigate(`/${path.LOGIN}`);
		});
	}
	return <div className='bg-black w-full h-full'></div>;
};

export default ForgotPassword;
