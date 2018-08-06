import React from 'react';
import changeable from '../_decorators/changeable';
import formContext from '../_decorators/formContext';
import groupContext from '../_decorators/groupContext';
import {
    checkedGroupTransformer,
    checkedFormTransformer
} from '../_decorators/_utils';

const Checkbox = (props) => (
    <input { ...props } type="checkbox" />
);
Checkbox.displayName = 'Checkbox';

export default groupContext(
    formContext(changeable(Checkbox), checkedFormTransformer),
    checkedGroupTransformer
);
