import React from 'react';
import changeable from '../_decorators/changeable';
import formContext from '../_decorators/formContext';

const Password = (props) => (
    <input { ...props } type="password" />
);
Password.displayName = 'Password';

export default formContext(changeable(Password));
