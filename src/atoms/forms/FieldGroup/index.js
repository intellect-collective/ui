import React from 'react';
import PropTypes from 'prop-types';
import { groupContext, groupValue } from '../prop-types';

const getValue = (value) => {
    if (value === null || value === undefined) {
        return [];
    }
    if (Array.isArray(value)) {
        return [...value];
    }
    return [value];
};

export default class FieldGroup extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        multiple: PropTypes.bool,
        value: groupValue,
        onChange: PropTypes.func,
        children: PropTypes.node.isRequired,
        component: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
            PropTypes.object
        ])
    };

    static defaultProps = {
        component: 'div'
    };

    static childContextTypes = {
        group: groupContext
    };

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
    }

    getChildContext() {
        const { name, value } = this.props;
        return {
            group: {
                name,
                value,
                onChange: this.onChange
            }
        };
    }

    onChange(name, value, ev) {
        const { checked } = ev.target;

        // If singular
        if (!this.props.multiple) {
            this.props.onChange(ev);
            return;
        }

        // Otherwise multiple values allowed
        const val = getValue(this.props.value);
        if (checked) {
            val.push(value);
        } else {
            let index = val.indexOf(value);
            while (index !== -1) {
                val.splice(index, 1);
                index = val.indexOf(value);
            }
        }
        this.props.onChange(ev);
    }

    render() {
        const {
            name, value, onChange, component: Component, children, ...rest
        } = this.props;
        return (
            <Component role="group" { ...rest }>
                { children }
            </Component>
        );
    }
}
