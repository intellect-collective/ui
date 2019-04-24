import React from 'react';
import PropTypes from 'prop-types';
import { asField } from '../utils';

class Select extends React.Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]),
        multiple: PropTypes.bool,
        onChange: PropTypes.func,
        value: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.string),
            PropTypes.string
        ])
    };

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(ev) {
        const {
            multiple
        } = this.props;

        let result;
        if (ev.target.selectedOptions && multiple) {
            result = Array.prototype.slice.call(ev.target.selectedOptions)
                .map((o) => (o.value));
        } else {
            result = ev.target.value;
        }

        this.props.onChange(ev, result);
    }

    render() {
        const {
            multiple,
            onChange,
            value,
            ...rest
        } = this.props;
        return (
            <select { ...rest }
                    value={ value }
                    multiple={ multiple }
                    onChange={ this.onChange } />
        );
    }
}

export { Select as BasicSelect };

export default asField('value')(Select);
