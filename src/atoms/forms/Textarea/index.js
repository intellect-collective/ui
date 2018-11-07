import React from 'react';
import changeable from '../_decorators/changeable';
import formContext from '../_decorators/formContext';
import { compose } from '../_decorators/_utils';

const Textarea = (props) => (
    <textarea { ...props } />
);
Textarea.displayName = 'Textarea';

export default compose(
    formContext(),
    changeable()
)(Textarea);
