import React from 'react';
import PropTypes from 'prop-types';
import { format, toDate } from 'date-fns'
import changeable from '../_decorators/changeable';
import formContext from '../_decorators/formContext';

const browserFormat = 'YYYY-MM-dd';

const DateField = (props) => {
    let value;
    if (props.value) {
    	value = format(toDate(props.value), browserFormat);
    }
    return (<input { ...props } type="date" value={ value } />);
};
DateField.displayName = 'DateField';
DateField.propTypes = {
    value: PropTypes.string
};

export default formContext(changeable(DateField));
