import React from 'react';
import { format, isValid, toDate, parseISO } from 'date-fns';
import { asField } from '../utils';

const getValue = (raw) => {
	if (!raw) {
		return;
	}
	const iso = parseISO(raw);
	if (isValid(iso)) {
		return format(iso, 'yyyy-MM-dd');
	}
	return;
}

export const DateField = (props) => {
    return (<input { ...props } value={ getValue(props.value) } type="date" />);
};
DateField.displayName = 'DateField';

export { DateField as BasicDateField };

export default asField('value')(DateField);
