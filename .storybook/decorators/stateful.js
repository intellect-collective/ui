import React from 'react';

class Stateful extends React.Component {
	constructor(props) {
		super(props);
		this.state = props.initialState || {};
		this.onChange = this.onChange.bind(this);
		this.childSetState = this.childSetState.bind(this);
	}
	onChange(name, value) {
		this.setState({ [name]: value });
	}
	childSetState(o) {
		this.setState(o);
	}
	render() {
		return (
	    	<table>
	    		<tbody>
		    		<tr>
		    			<td style={{ width: '50%' }}>
		    				{ typeof this.props.children === 'function' ? this.props.children(this.onChange, this.state, this) : this.props.children }
	    				</td>
    					<td style={{ maxWidth: '50vh', width: '50%' }}>
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
