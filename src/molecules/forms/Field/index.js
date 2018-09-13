import React from 'react';
import PropTypes from 'prop-types';
import classable from '../../../atoms/forms/_decorators/classable';

const renderLabel = (id, name, classNames, content) => {
    if (!content) {
        return undefined;
    }
    return (
        <label className={ classNames.label }
                htmlFor={ id || name }>
            { content }
        </label>
    );
};
const renderWrapper = (field, { wrapper, classNames }, defaultWrapper) => {
    if (wrapper || defaultWrapper) {
        return React.createElement(
            wrapper || defaultWrapper,
            { className: classNames.wrapper },
            field
        );
    }
    return field;
};
const renderField = (id, name, classNames, { component, children, ...props }) => {
    if (component) {
        return React.createElement(component, {
            ...props,
            name,
            id: id || name,
            className: classNames.field
        });
    }
    return children;
};

const Field = ({
    id, name, className, classNames, label, inverse, ...props
}) => (
    <div className={ className }>
        { inverse ? null : renderLabel(id, name, classNames, label) }
        { renderWrapper(
            renderField(id, name, classNames, props),
            { classNames, ...props },
            Field.wrapper
        ) }
        { inverse ? renderLabel(id, name, classNames, label) : null }
    </div>
);
Field.displayName = 'Field';
Field.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    classNames: PropTypes.shape({
        label: PropTypes.string,
        wrapper: PropTypes.string,
        field: PropTypes.string
    }),
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    inverse: PropTypes.bool,
    wrapper: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
        PropTypes.node
    ]),
    component: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
        PropTypes.node
    ]),
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
        PropTypes.node
    ])
};
Field.className = null;
Field.classNames = {};
Field.wrapper = null;

export default classable(Field);
