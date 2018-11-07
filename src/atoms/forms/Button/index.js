import React from 'react';
import PropTypes from 'prop-types';
import clickable from '../_decorators/clickable';
import formContext from '../_decorators/formContext';
import { compose } from '../_decorators/_utils';

const Button = (props) => (
    <button { ...props } />
);
Button.displayName = 'Button';
Button.propTypes = {
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
    value: PropTypes.string
};
Button.defaultProps = {
    type: 'button',
    value: ''
};

export default compose(
    formContext(),
    clickable()
)(Button);
