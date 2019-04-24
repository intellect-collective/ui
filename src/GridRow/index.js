import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ children, className = 'row' }) => (
    <div className={ className }>
        { children }
    </div>
);
Row.displayName = 'Row';
Row.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};
export default Row;
