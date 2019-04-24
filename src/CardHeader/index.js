import React from 'react';
import PropTypes from 'prop-types';

const CardHeader = ({ title, className = 'card-header', children }) => (
    <div className={ className }>
        <h5>{ title }</h5>
        { children }
    </div>
);
CardHeader.displayName = 'CardHeader';
CardHeader.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    title: PropTypes.string.isRequired
};
export default CardHeader;
