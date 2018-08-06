import React from 'react';
import changeable from '../_decorators/changeable';
import formContext from '../_decorators/formContext';

const Textarea = (props) => (
    <textarea { ...props } />
);
Textarea.displayName = 'Textarea';

export default formContext(changeable(Textarea));
