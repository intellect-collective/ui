import React from 'react';
import PropTypes from 'prop-types';
import { getWrapped } from './_utils';

export default (wrapped) => {
    const Changeable = ({ onChange, value, ...props }) => (
        React.createElement(wrapped, {
            onChange: (ev) => {
                if (onChange) {
                    onChange(ev);
                }
            },
            ...props,
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
