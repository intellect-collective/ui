import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const PageOverlay = ({ visible, children, onClose }) => (
    <div className={ classnames('page-overlay', { visible }) }>
        <div className="page-overlay-content">
            { children }
            <div className="page-overlay-close" onClick={ onClose } role="presentation">×</div>
        </div>
    </div>
);
PageOverlay.displayName = 'PageOverlay';
PageOverlay.propTypes = {
    visible: PropTypes.bool,
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func
};
PageOverlay.defaultProps = {
    onClose: () => {}
};

export default PageOverlay;
