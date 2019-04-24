import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Panel from '../Panel';

const Drawer = React.forwardRef(({ children, className, classes, ...rest }, ref) => (
    <div className={ classnames(className, classes) } { ...rest } ref={ ref }>
        <Panel classes="square">
            { children }
        </Panel>
    </div>
))

Drawer.propTypes = {
    /**
     * The contents of the drawer.
     */
    children: PropTypes.node,
    /**
     * Override or extend the styles applied to the component.
     * See [CSS API](#css) below for more details.
     */
    classes: PropTypes.object.isRequired,
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * Callback fired when the component requests to be closed.
     *
     * @param {object} event The event source of the callback
     */
    onClose: PropTypes.func,
    /**
     * If `true`, the drawer is open.
     */
    open: PropTypes.bool
}

Drawer.defaultProps = {
    className: 'drawer'
}

export default Drawer;
