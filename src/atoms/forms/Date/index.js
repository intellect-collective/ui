import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import changeable from '../_decorators/changeable';
import formContext from '../_decorators/formContext';

const browserFormat = 'YYYY-MM-DD';

const DateField = (props) => {
    let value;
    if (props.value) {
        value = moment(props.value).format(browserFormat);
    }
    return (<input { ...props } type="date" value={ value } />);
};
DateField.displayName = 'DateField';
DateField.propTypes = {
    value: PropTypes.string
};

export default formContext(changeable(DateField));
