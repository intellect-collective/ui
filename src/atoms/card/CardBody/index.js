import React from 'react';
import PropTypes from 'prop-types';

const CardBody = ({ className = 'card-body', children }) => (
    <div className={ className }>
        { children }
    </div>
);
CardBody.displayName = 'CardBody';
CardBody.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};
export default CardBody;
