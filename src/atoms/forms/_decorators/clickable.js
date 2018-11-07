import React from 'react';
import PropTypes from 'prop-types';

const noop = () => {};

export default () => (Wrapped) => {
    const Clickable = ({ onClick = noop, ...props }) => (
        <Clickable.Wrapped { ...props } onClick={ onClick } />
    );
    Clickable.displayName = 'Clickable';
    Clickable.Wrapped = Wrapped;
    Clickable.propTypes = {
        onClick: PropTypes.func
    };
    return Clickable;
};
