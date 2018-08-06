import React from 'react';
import PropTypes from 'prop-types';
import { formContext, groupContext } from '../prop-types';
import { getHandlerName, getWrapped } from './_utils';

const prePropsTransformer = ({ name }, { form }, wrapped) => {
    const result = {};

    if (form && typeof form.getValue(name) !== 'undefined') {
        result.value = form.getValue(name) || '';
    }

    const handlerName = getHandlerName(wrapped);
    if (form && handlerName) {
        result[handlerName] = (ev) => {
            if (typeof name === 'string') {
                form.setValue(ev);
            }
        };
    }

    return result;
};

export default (wrapped, transformer = () => {}) => {
    const factory = React.createFactory(wrapped);
    const FormContext = (props, context) => (
        factory({
            ...prePropsTransformer(props, context, wrapped),
            ...props,
            ...transformer(props, context, wrapped)
        })
    );
    FormContext.displayName = 'FormContext';
    FormContext.propTypes = {
        name: PropTypes.string.isRequired
    };
    FormContext.contextTypes = {
        form: formContext,
        group: groupContext
    };
    FormContext.wrapped = wrapped;
    FormContext.root = getWrapped(wrapped);
    return FormContext;
};
