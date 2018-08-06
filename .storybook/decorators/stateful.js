import React from 'react';

class Stateful extends React.Component {
	constructor(props) {
		super(props);
		this.state = props.initialState || {};
		this.onChange = this.onChange.bind(this);
	}
	onChange(name, value) {
		this.setState({ [name]: value });
	}
	render() {
		return (
	    	<table>
	    		<tbody>
		    		<tr>
		    			<td style={{ width: '50%' }}>
		    				{ this.props.children(this.onChange, this.state, this) }
	    				</td>
    					<td style={{ width: '50%' }}>
    						<pre>
    						{ JSON.stringify(this.state, null, 4) }
    						</pre>
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
}

export default function (initialState) {
  return function (story) {
    return (
    	<Stateful initialState={ initialState }>
    		{ story() }
		</Stateful>
	);
  }
}
