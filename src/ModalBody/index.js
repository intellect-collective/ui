import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ModalBody = ({ children, className, ...props }) => (
    <div className={ classnames('modal-body', className) } { ...props }>
        { children }
    </div>
);
ModalBody.displayName = 'ModalBody';
ModalBody.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};
export default ModalBody;
