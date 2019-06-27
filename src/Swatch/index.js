import React from 'react';

const Swatch = ({ color, children }) => (
	<figure className="swatch">
		<div className="chip" style={{ backgroundColor: color, height: '2.5em', width: '8em' }} />
		<figcaption>{ children }</figcaption>
	</figure>
);

export default Swatch;