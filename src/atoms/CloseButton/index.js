import React from 'react';

const CloseButton = (props) => (
    <button className="close" { ...props }><span aria-hidden="true">&times;</span></button>
)

export default CloseButton;
