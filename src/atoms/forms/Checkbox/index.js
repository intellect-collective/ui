import React from 'react';
import changeable from '../_decorators/changeable';
import formContext from '../_decorators/formContext';
import groupContext from '../_decorators/groupContext';
import checkable from '../_decorators/checkable';
import { compose } from '../_decorators/_utils';

const Checkbox = (props) => (
    <input { ...props } type="checkbox" />
);
Checkbox.displayName = 'Checkbox';

export default compose(
    groupContext(),
    formContext('_value'),
    checkable(),
    changeable()
)(Checkbox);
