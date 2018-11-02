import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import changeable from '../_decorators/changeable';
import formContext from '../_decorators/formContext';
import groupContext from '../_decorators/groupContext';
import checkable from '../_decorators/checkable';
import { compose } from '../_decorators/_utils';

const classes = (className, oval, worded) => (
    classnames(
        className || 'toggle',
        {
            'toggle-oval': oval,
            'toggle-worded': worded
        }
    )
);

const Toggle = ({
    name,
    id,
    className,
    oval,
    worded,
    ...rest
}) => (
    <div className={ classes(className, oval, worded) }>
        <input type="checkbox" id={ id || name } name={ name } { ...rest } />
        <label htmlFor={ id || name }>
            <span className="switch"><span className="switch-inner" /></span>
        </label>
    </div>
);
Toggle.displayName = 'Toggle';
Toggle.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    className: PropTypes.string,
    oval: PropTypes.bool,
    worded: PropTypes.bool
};

export default compose(
    groupContext(),
    formContext('_value'),
    checkable(),
    changeable()
)(Toggle);
