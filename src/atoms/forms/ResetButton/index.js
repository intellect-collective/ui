import React from 'react';
import Button from '../Button';
import { getWrapped } from '../_decorators/_utils';

const ResetButton = (props) => (
    <Button { ...props } type="reset" />
);
ResetButton.displayName = 'ResetButton';
ResetButton.wrapped = Button;
ResetButton.root = getWrapped(Button);

export default ResetButton;
