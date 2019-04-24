import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import Form from '../Form';
import deriveFormState from './deriveFormState';
import pushUnique from '../utils/pushUnique';
import get from '../utils/get';

const noop = () => {};

class StateControlledForm extends React.Component {
    static getDerivedStateFromProps(props, state) {
        return deriveFormState(props, state);
    }

    static propTypes = {
        /**
         * The contents of the form.
         */
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node,
            PropTypes.func
        ]),
        /**
         * A map of field names and their values
         */
        values: PropTypes.object,
        /**
         * A map of field names and their error messages
         */
        errors: PropTypes.object,
        /**
         * Called when a reset button is clicked within the form
         */
        onReset: PropTypes.func,
        /**
         * Called when the form is submitted
         */
        onSubmit: PropTypes.func
    };

    static defaultProps = {
        onReset: noop,
        onSubmit: noop
    };

    constructor(props) {
        super(props);

        this.state = {
            original: props.values,
            values: props.values,
            lastValues: props.values
        };

        this.getOriginal = this.getOriginal.bind(this);
        this.getLastValue = this.getLastValue.bind(this);
        this.getValue = this.getValue.bind(this);
        this.setValue = this.setValue.bind(this);
        this.getError = this.getError.bind(this);
        this.setError = this.setError.bind(this);
        this.isTouched = this.isTouched.bind(this);
        this.setTouched = this.setTouched.bind(this);
        this.isDirty = this.isDirty.bind(this);
        this.getConflict = this.getConflict.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    //
    // Handler methods
    //
    getOriginal(field) {
        return (this.state.original || {})[field];
    }

    getLastValue(field) {
        return (this.state.lastValues || {})[field];
    }

    getValue(field) {
        return get(this.state.values || {}, field);
    }

    setValue(field, value) {
        this.setState((state) => ({
            values: update(state.values || {}, { [field]: { $set: value } }),
            dirty: pushUnique(state.dirty, field)
        }));
    }

    getError(field) {
        return (this.state.errors || {})[field];
    }

    getErrors() {
        return this.state.errors || {};
    }

    setError(field, error) {
        this.setState((state) => ({
            errors: update(state.errors || {}, { [field]: { $set: error } })
        }));
    }

    isTouched(field) {
        return !!(this.state.touched || {})[field];
    }

    setTouched(field) {
        this.setState((state) => ({
            touched: pushUnique(state.touched, field)
        }));
    }

    isDirty(field) {
        return !!(this.state.dirty || {})[field];
    }

    getConflict(field) {
        return (this.state.conflicts || {})[field];
    }

    onReset(ev) {
        this.setState((state) => ({
            values: { ...(state.lastValues || {}) },
            dirty: [],
            touched: [],
            conflicts: {},
            errors: {}
        }), () => {
            this.props.onReset(ev);
        });
    }

    onSubmit(ev) {
        if (this.props.onSubmit) {
            this.props.onSubmit(ev, this.handler, this.state.values);
        }
    }

    //
    // Helpers
    //
    get handler() {
        return {
            getOriginal: this.getOriginal,
            getLastValue: this.getLastValue,
            getValue: this.getValue,
            setValue: this.setValue,
            getError: this.getError,
            setError: this.setError,
            isTouched: this.isTouched,
            setTouched: this.setTouched,
            isDirty: this.isDirty,
            getConflict: this.getConflict,
            onReset: this.onReset,
            onSubmit: this.onSubmit
        };
    }

    render() {
        const {
            children,
            errors,
            values,
            ...rest
        } = this.props;
        return (
            <Form { ...rest }
                    onReset={ this.onReset }
                    handler={ this.handler }>
                { children }
            </Form>
        );
    }
}

export default StateControlledForm;
