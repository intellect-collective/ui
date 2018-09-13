import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ className = 'card', children }) => (
    <div className={ className }>
        { children }
    </div>
);
Card.displayName = 'Card';
Card.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};
export default Card;
