import React from 'react';
import changeable from '../_decorators/changeable';
import formContext from '../_decorators/formContext';
import { compose } from '../_decorators/_utils';

const Password = (props) => (
    <input { ...props } type="password" />
);
Password.displayName = 'Password';

export default compose(
    formContext(),
    changeable()
)(Password);
