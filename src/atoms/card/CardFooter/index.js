import React from 'react';
import PropTypes from 'prop-types';

const CardFooter = ({ className = 'card-footer', children }) => (
    <div className={ className }>
        { children }
    </div>
);
CardFooter.displayName = 'CardFooter';
CardFooter.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};
export default CardFooter;
