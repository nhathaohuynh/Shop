import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import path from '../../utils/path';

const Authentication = () => {
	const { status } = useParams();
	const navigate = useNavigate();

	if (status === 'failed') {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong!! Please register again',
		}).then((result) => {
			if (result.isConfirmed) navigate(`/${path.REGISTER}`);
		});
	} else {
		Swal.fire({
			icon: 'success',
			title: 'congratulations',
			text: 'Account have been active successfull! Please login',
		}).then((result) => {
			if (result.isConfirmed) navigate(`/${path.LOGIN}`);
		});
	}
	return <div className='bg-gray-900 w-full h-full'></div>;
};

export default Authentication;
