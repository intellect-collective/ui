import React from 'react';

const style = {
    'position': 'absolute',
    'top': 40,
    'bottom': 0,
    'left': 0,
    'right': 0,
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center'
};

export default (story) => (
    <div style={ style }>{ story() }</div>
);