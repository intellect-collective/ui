import React from 'react';
import { groupContext } from '../prop-types';
import { getHandlerName, getWrapped } from './_utils';

const prePropsTransformer = (props, { group }, wrapped) => {
    const result = {};

    const handlerName = getHandlerName(wrapped);
    if (group && group.onChange) {
        result[handlerName] = group.onChange;
    }

    if (group && group.name) {
        result.name = group.name;
    }

    if (group && typeof group.value !== 'undefined') {
        result.value = group.value || '';
    }
    return result;
};

export default (wrapped, transformer = () => ({})) => {
    const factory = React.createFactory(wrapped);
    const GroupContext = (props, context) => (
        factory({
            ...prePropsTransformer(props, context, wrapped),
            ...props,
            ...transformer(props, context)
        })
    );
    GroupContext.displayName = 'GroupContext';
    GroupContext.contextTypes = {
        group: groupContext
    };
    GroupContext.wrapped = wrapped;
    GroupContext.root = getWrapped(wrapped);
    return GroupContext;
};
