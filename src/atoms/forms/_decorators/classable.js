import React from 'react';
import PropTypes from 'prop-types';
import { getWrapped } from './_utils';

/**
 * The classable wrapper takes any default class names that have been set on the
 * wrapped element and merges them into the manually-specified class names given
 * to the component. This allows the developer to change the default classes
 * on a component and any children on a global scale.
 * @param {ReactElement} wrapped - The element to wrap
 * @returns {ReactElement} - The wrapper element
 */
export default (wrapped) => {
    const Classable = ({ className, classNames, ...props }) => (
        React.createElement(wrapped, {
            ...props,
            className: typeof className !== 'undefined' ? className : getWrapped(wrapped).className,
            classNames: typeof classNames !== 'undefined' ? classNames : getWrapped(wrapped).classNames
        })
    );
    Classable.displayName = 'Classable';
    Classable.propTypes = {
        className: PropTypes.string,
        classNames: PropTypes.object
    };
    Classable.wrapped = wrapped;
    Classable.root = getWrapped(wrapped);
    return Classable;
};
