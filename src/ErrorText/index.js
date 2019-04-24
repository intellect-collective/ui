import React from 'react';
import Field from '../Field';

export default ({ name, ...props }) => (
	<Field name={ name }>
		{ ({ getError }) => {
			if (!getError() || getError() === true) {
				return null;
			}
			return (
				<div className="invalid-feedback" { ...props }>{ getError() }</div>
			);
		} }
	</Field>
);
