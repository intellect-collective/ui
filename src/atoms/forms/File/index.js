import React from 'react';
import changeable from '../_decorators/changeable';
import formContext from '../_decorators/formContext';

const File = (props) => (
    <input { ...props } type="file" />
);
File.displayName = 'File';

export default formContext(changeable(File));
