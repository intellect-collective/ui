import React from 'react';
import PropTypes from 'prop-types';
import { FormContext } from '../Form';
import { FieldGroupContext } from '../FieldGroup';
import withContext from '../../../utils/withContext';

const noop = () => {};

class Field extends React.Component {
    static contextType = FormContext;

    static propTypes = {
        /**
         * The name of the field, used both as the HTML `name` attribute, as
         * well as the key for form context data pertaining to the field. This
         * value may be acquired from an ancestral `FieldGroup`
         */
        name: PropTypes.string,
        /**
         * The contents of the form.
         */
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node,
            PropTypes.func
        ]),
        /**
         * The component to render as a field.
         */
        component: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.func,
            PropTypes.string,
            PropTypes.object
        ]),
        /**
         * The prop that the field should use to pass the form value to the
         * component. Components like checkboxes, radios, etc require that the
         * formValueProp specify something other than `value`.
         */
        formValueProp: PropTypes.string,
        /**
         * An optional function to transform the field value.
         */
        transformValue: PropTypes.func,
        /**
         * The name given by the nearest ancestral FieldGroup, if available.
         */
        context: PropTypes.string,
        /**
         * The handler called when the field value changes.
         */
        onChange: PropTypes.func,
        /**
         * The handler called when the field is focused.
         */
        onFocus: PropTypes.func,
        /**
         * A React ref to pass down to the underlying component.
         */
        forwardedRef: PropTypes.any
    };

    static defaultProps = {
        formValueProp: 'value',
        transformValue: (v) => (v),
        onChange: noop
    };

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    get name() {
        const {
            context,
            name
        } = this.props;
        return name || context;
    }

    get value() {
        const {
            formValueProp,
            transformValue
        } = this.props;
        if (typeof this.props[formValueProp] !== 'undefined') {
            return transformValue(this.props[formValueProp]);
        }
        if (this.context && this.context.getValue) {
            return transformValue(this.context.getValue(this.name));
        }
        return undefined;
    }

    get fieldCtx() {
        return {
            name: this.name,
            getOriginal: () => (this.context.getOriginal(this.name)),
            getLastValue: () => (this.context.getLastValue(this.name)),
            getValue: () => (this.context.getValue(this.name)),
            setValue: (value) => (this.context.setValue(this.name, value)),
            getError: () => (this.context.getError(this.name)),
            setError: (error) => (this.context.setError(this.name, error)),
            isTouched: () => (this.context.isTouched(this.name)),
            setTouched: () => (this.context.setTouched(this.name)),
            isDirty: () => (this.context.isDirty(this.name)),
            getConflict: () => (this.context.getConflict(this.name))
        };
    }

    onChange(ev, value) {
        this.props.onChange(ev, value);
        if ((ev.isPropagationStopped && ev.isPropagationStopped())
                || !this.context || !this.context.setValue) {
            return;
        }

        if (typeof value !== 'undefined') {
            this.context.setValue(ev.target.name, value);
        } else {
            this.context.setValue(ev.target.name, ev.target.value);
        }
    }

    onFocus(ev) {
        if (this.props.onFocus) {
            this.props.onFocus(ev);
        }

        this.context.setTouched(this.name);
    }

    render() {
        const {
            children,
            component: Component,
            formValueProp,
            forwardedRef,
            transformValue,
            ...rest
        } = this.props;

        if (Component) {
            const props = {
                children,
                ...rest,
                name: this.name,
                onChange: this.onChange,
                onFocus: this.onFocus,
                [formValueProp]: this.value
            };
            return (<Component { ...props } ref={ forwardedRef } />);
        }

        if (typeof children === 'function') {
            return children(this.fieldCtx);
        }

        return children;
    }
}

export default withContext(FieldGroupContext)(React.forwardRef((props, ref) => (
    <Field { ...props } forwardedRef={ ref } />
)));
