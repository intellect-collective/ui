import React from 'react';
import PropTypes from 'prop-types';
import { getWrapped } from './_utils';

const noop = () => {};

export default (wrapped) => {
    const Changeable = ({ onChange = noop, value, ...props }) => (
        React.createElement(wrapped, {
            ...props,
            onChange,
            value: typeof value !== 'undefined' ? value : ''
        })
    );
    Changeable.displayName = 'Changeable';
    Changeable.propTypes = {
        value: PropTypes.any,
        onChange: PropTypes.func
    };
    Changeable.wrapped = wrapped;
    Changeable.root = getWrapped(wrapped);
    return Changeable;
};
