import React from 'react';
import changeable from '../_decorators/changeable';
import formContext from '../_decorators/formContext';
import { compose } from '../_decorators/_utils';

const Text = (props) => (
    <input { ...props } type="text" />
);
Text.displayName = 'Text';

export default compose(
    formContext(),
    changeable()
)(Text);
