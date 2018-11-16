import React from 'react';
import PropTypes from 'prop-types';

export const FieldGroupContext = React.createContext(null);

const renderInner = ({ children, wrapper: Wrapper, ...props }) => {
    if (Wrapper) {
        return (
            <Wrapper role="group" { ...props }>
                { children }
            </Wrapper>
        );
    }

    return children;
};

const FieldGroup = ({
    name,
    ...rest
}) => (
    <FieldGroupContext.Provider value={ name }>
        { renderInner(rest) }
    </FieldGroupContext.Provider>
);
FieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.func
    ]).isRequired,
    wrapper: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object
    ])
};
export default FieldGroup;
