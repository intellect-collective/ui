import React from 'react';
import formContext from '../_decorators/formContext';

const Hidden = (props) => (
    <input { ...props } type="hidden" />
);
Hidden.displayName = 'Hidden';

export default formContext()(Hidden);
