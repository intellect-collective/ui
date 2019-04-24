import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const List = ({ className, classes, children, component: Component, header }) => (
    <Component className={ classNames(className, classes) }>
        { header }
        { children }
    </Component>
);

List.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    component: PropTypes.elementType,
    header: PropTypes.node,
};

List.defaultProps = {
    component: 'ul',
    className: 'list'
};

export default List;
