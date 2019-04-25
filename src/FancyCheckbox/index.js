import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { asCheckable, asField, compose } from '../utils';

const FancyCheckbox = ({ className, classes, name, id, ...props }) => (
    <div className={ classnames(className, classes) }>
        <input { ...props }
        		name={ name }
        		id={ id || name }
                type="checkbox" />
        <label aria-checked={ props.checked } htmlFor={ id || name } />
    </div>
);
FancyCheckbox.displayName = 'FancyCheckbox';
FancyCheckbox.propTypes = {
    checked: PropTypes.bool
};
FancyCheckbox.defaultProps = {
	className: 'fancycheck'
};

export default compose(
    asField(),
    asCheckable()
)(FancyCheckbox);
