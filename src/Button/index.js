import React from 'react';
import clsx from 'clsx';

const Button = ({ color, size, shape, className, classes, ...rest }) => (
	<button { ...rest }
			className={ clsx(className, classes, 'btn', color, size, shape )} />
);
export default Button;
