import React from 'react';

export default function (width) {
  return function (story) {
    return (<div style={{ 'width': width }}>{ story() }</div>);
  }
}