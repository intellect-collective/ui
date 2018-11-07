import React from 'react';
import changeable from '../_decorators/changeable';
import formContext from '../_decorators/formContext';
import groupContext from '../_decorators/groupContext';
import checkable from '../_decorators/checkable';
import { compose } from '../_decorators/_utils';

export const Radio = (props) => {
    return (<input { ...props } type="radio" />);
};
Radio.displayName = 'Radio';

export default compose(
    groupContext(),
    formContext('_value'),
    checkable(),
    changeable()
)(Radio);
