import React from 'react';
import changeable from '../_decorators/changeable';
import formContext from '../_decorators/formContext';
import { compose } from '../_decorators/_utils';

const File = (props) => (
    <input { ...props } type="file" />
);
File.displayName = 'File';

export default compose(
    formContext(),
    changeable()
)(File);
