import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 *
 */
const Panel = ({ classes, className, component: Component, ...rest }) => {
    const cls = classnames(
        className,
        classes
    );

    return <Component className={ cls } { ...rest } />;
}

Panel.propTypes = {
    /**
     * The content of the component.
     */
    children: PropTypes.node,
    /**
     * Override or extend the styles applied to the component.
     * See [CSS API](#css) below for more details.
     */
    classes: PropTypes.object,
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * The component used for the root node.
     * Either a string to use a DOM element or a component.
     */
    component: PropTypes.element
};

Panel.defaultProps = {
    className: 'panel',
    component: 'div'
};

export default Panel;
