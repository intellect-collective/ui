import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ModalFooter = ({ children, className, ...props }) => (
    <div className={ classnames('modal-footer', className) } { ...props }>
        { children }
    </div>
);
ModalFooter.displayName = 'ModalFooter';
ModalFooter.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};
export default ModalFooter;
