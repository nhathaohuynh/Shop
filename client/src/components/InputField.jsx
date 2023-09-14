import React from 'react';

const InputField = ({ label, type = 'text', name, onChangeInput, value }) => {
	return (
		<div className='mb-6 text-[14px]'>
			<label htmlFor={label} className="font-normal">{label}</label>
			<input
				type={type}
				className='focus:border-blue-500 mt-1 text-[12px] block min-h-[auto] w-full rounded border placeholder-[rgba(255,255,255,0.6)] border-gray-400 bg-transparent px-3 py-1 leading-[2.15] outline-none transition-all'
				id={label}
				placeholder={label}
				name={name}
				value={value}
				onChange={(e) => onChangeInput(e)}
				autoComplete="true"
			/>
		</div>
	);
};

export default InputField;
