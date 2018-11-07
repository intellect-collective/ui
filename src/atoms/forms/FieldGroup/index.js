import React from 'react';
import PropTypes from 'prop-types';

export const FieldGroupContext = React.createContext(null);

const FieldGroup = ({
    name,
    onChange,
    component: Component,
    children,
    ...rest
}) => (
    <FieldGroupContext.Provider value={ name }>
        <Component role="group" { ...rest }>
            { children }
        </Component>
    </FieldGroupContext.Provider>
);
FieldGroup.propTypes = {
    name: PropTypes.string,
    multiple: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.node.isRequired,
    component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object
    ])
};
FieldGroup.defaultProps = {
    component: 'div'
};
export default FieldGroup;
