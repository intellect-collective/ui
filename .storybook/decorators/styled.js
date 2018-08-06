import React from 'react';

const selectStyle = {
    'textAlign': 'center'
};

class Container extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      'sheet': 'default.css'
    };
    this.onChange = this.onChange.bind(this);


    const hotClient = require('webpack-hot-middleware/client?reload=true')
    hotClient.subscribeAll((event) => {
      if (event.action === 'built') {
        console.log('[HMR] Reload');
        this.setState({ time: new Date().getTime() });
      }
    });
  }

  onChange (ev) {
    this.setState({
      sheet: ev.target.value,
      time: new Date().getTime()
    });
  }

  render () {
    return (
      <div>
        <div style={ selectStyle }>
            <link rel="stylesheet" href={ '/static/' + this.state.sheet + '?' + this.state.time } />
            <select style={ selectStyle } onChange={ this.onChange } className="browser-default">
                <option>default.css</option>
                <option>secondary.css</option>
            </select>
        </div>
        <div>
          { this.props.children }
        </div>
      </div>
    )
  }
}


export default (story) => (
    <Container>{ story() }</Container>
);