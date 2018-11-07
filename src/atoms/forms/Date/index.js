import React from 'react';
import PropTypes from 'prop-types';
import { format, toDate } from 'date-fns';
import changeable from '../_decorators/changeable';
import formContext from '../_decorators/formContext';
import { compose } from '../_decorators/_utils';

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

export default compose(
    formContext(),
    changeable()
)(DateField);
