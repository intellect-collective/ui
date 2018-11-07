import React from 'react';
import PropTypes from 'prop-types';

const noop = () => {};

export default () => (Wrapped) => {
    const Changeable = ({ onChange = noop, ...props }) => (
        <Changeable.Wrapped { ...props } onChange={ onChange } />
    );
    Changeable.Wrapped = Wrapped;
    Changeable.displayName = 'Changeable';
    Changeable.propTypes = {
        onChange: PropTypes.func
    };
    return Changeable;
};
