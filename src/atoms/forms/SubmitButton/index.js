import React from 'react';
import Button from '../Button';

const SubmitButton = (props) => (
    <Button { ...props } type="submit" />
);
SubmitButton.displayName = 'SubmitButton';
SubmitButton.Wrapped = Button.Wrapped;

export default SubmitButton;
