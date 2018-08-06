import React from 'react';
import changeable from '../_decorators/changeable';
import formContext from '../_decorators/formContext';
import groupContext from '../_decorators/groupContext';
import {
    checkedGroupTransformer,
    checkedFormTransformer
} from '../_decorators/_utils';

const Radio = (props) => (
    <input { ...props } type="radio" />
);
Radio.displayName = 'Radio';

export default groupContext(
    formContext(changeable(Radio), checkedFormTransformer),
    checkedGroupTransformer
);
