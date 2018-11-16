import React from 'react';
import PropTypes from 'prop-types';
import { asCheckable, asField, compose } from '../utils';

const FancyCheckbox = (props) => (
    <div className="fancycheck">
        <input { ...props }
                type="checkbox" />
        <label aria-checked={ props.checked } />
    </div>
);
FancyCheckbox.displayName = 'FancyCheckbox';
FancyCheckbox.propTypes = {
    checked: PropTypes.bool
};

export default compose(
    asField(),
    asCheckable()
)(FancyCheckbox);
