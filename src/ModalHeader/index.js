import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ModalHeader = ({ children, className, ...props }) => (
    <div className={ classnames('modal-header', className) } { ...props }>
        { children }
    </div>
);
ModalHeader.displayName = 'ModalHeader';
ModalHeader.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};
export default ModalHeader;
