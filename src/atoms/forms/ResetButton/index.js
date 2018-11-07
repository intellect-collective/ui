import React from 'react';
import Button from '../Button';

const ResetButton = (props) => (
    <Button { ...props } type="reset" />
);
ResetButton.displayName = 'ResetButton';
ResetButton.Wrapped = Button.Wrapped;

export default ResetButton;
