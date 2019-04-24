import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const WIDTH_PROP = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
]);

const getColumnClass = ({
    width, 'sm-width': smWidth, 'md-width': mdWidth, 'lg-width': lgWidth
}) => {
    if (width) {
        return `col-md-${ width }`;
    }
    const result = [];
    if (smWidth) {
        result.push(`col-sm-${ smWidth }`);
    }
    if (mdWidth) {
        result.push(`col-md-${ mdWidth }`);
    }
    if (lgWidth) {
        result.push(`col-lg-${ lgWidth }`);
    }
    return result.join(' ');
};

const Column = ({ className, children, ...props }) => (
    <div className={ classnames(getColumnClass(props), className) }>
        { children }
    </div>
);
Column.displayName = 'Column';
Column.propTypes = {
    'children': PropTypes.node,
    'className': PropTypes.string,
    'width': WIDTH_PROP,
    'sm-width': WIDTH_PROP,
    'md-width': WIDTH_PROP,
    'lg-width': WIDTH_PROP
};
export default Column;
