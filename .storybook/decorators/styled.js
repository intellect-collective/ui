import React from 'react';
import primary from '../../themes/default.scss';
import secondary from '../../themes/secondary.scss';

const styles = {
  primary,
  secondary
};

const selectStyle = {
    'textAlign': 'center'
};

class Container extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      'sheet': 'primary'
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

  componentDidMount() {
    styles[this.state.sheet].use();
  }

  onChange (ev) {
    const sheet = ev.target.value;
    Object.keys(styles)
      .forEach((style) => (styles[style].unuse()));
    this.setState({ sheet });
    console.log('Using stylesheet ' + sheet);
    styles[sheet].use();
  }

  render () {
    return (
      <div>
        <div style={ selectStyle }>
            <select style={ selectStyle } onChange={ this.onChange } className="browser-default">
                <option>primary</option>
                <option>secondary</option>
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