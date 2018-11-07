import React from 'react';
import PropTypes from 'prop-types';
import { getWrapped } from './_utils';

const noop = () => {};

export default (wrapped) => {
    const factory = React.createFactory(wrapped);
    const Clickable = ({ onClick = noop, value, ...props }) => (
        factory({
            ...props,
            onClick,
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
