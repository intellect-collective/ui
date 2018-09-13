import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ children, className = 'container' }) => (
    <div className={ className }>
        { children }
    </div>
);
Container.displayName = 'Container';
Container.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};
export default Container;
