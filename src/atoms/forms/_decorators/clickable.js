import React from 'react';
import PropTypes from 'prop-types';
import { getWrapped } from './_utils';

export default (wrapped) => {
    const factory = React.createFactory(wrapped);
    const Clickable = ({ onClick, value, ...props }) => (
        factory({
            onClick: (ev) => {
                if (onClick) {
                    onClick(ev);
                }
            },
            ...props,
            value: typeof value !== 'undefined' ? value : ''
        })
    );
    Clickable.displayName = 'Clickable';
    Clickable.propTypes = {
        value: PropTypes.any,
        onClick: PropTypes.func
    };
    Clickable.wrapped = wrapped;
    Clickable.root = getWrapped(wrapped);
    return Clickable;
};
