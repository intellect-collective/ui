import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ListItem = ({ children, className, classes, component: Component }) => (
    <Component className={ classnames(className, classes) }>{ children }</Component>
)

ListItem.propTypes = {
    /**
     * The content of the component. If a `ListItemSecondaryAction` is used it must
     * be the last child.
     */
    children: PropTypes.node,
    /**
     * Override or extend the styles applied to the component.
     * See [CSS API](#css-api) below for more details.
     */
    classes: PropTypes.object,
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * The component used for the root node.
     * Either a string to use a DOM element or a component.
     * By default, it's a `li` when `button` is `false` and a `div` when `button` is `true`.
     */
    component: PropTypes.elementType
};

ListItem.defaultProps = {
    component: 'li',
    className: 'list-item'
};

export default ListItem;