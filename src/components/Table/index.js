import React from 'react';
import './table.scss';

// export default class Table extends React.Component {
// 	render() {
// 		return (
// 		);
// 	}
// }
export default (props) => (
	<table className="table" { ...props } />
);
