import React from 'react';
import icons from '../utils/icon';

function DynamicIcon({ name, size }) {
	const Icon = icons[name];
	return <Icon size={size} />;
}

export default DynamicIcon;
