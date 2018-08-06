import React from 'react';
import changeable from '../_decorators/changeable';
import formContext from '../_decorators/formContext';

const Text = (props) => (
    <input { ...props } type="text" />
);
Text.displayName = 'Text';

export default formContext(changeable(Text));
