import React from 'react';
import PropTypes from 'prop-types';

export const FormContext = React.createContext(null);

export default class Form extends React.Component {
    static propTypes = {
        /**
         * The `action` prop is equivalent to the HTML form action attribute.
         */
        action: PropTypes.string.isRequired,
        /**
         * The `method` prop is equivalent to the HTML form method attribute,
         * but accepts values other than `GET` and `POST`. In the event that a
         * value other than `GET` or `POST` is supplied, the `method` attribute
         * of the form will be set to `POST` and the method override field will
         * be set to the supplied value.
         */
        method: PropTypes.oneOf(['get', 'post', 'put']),
        /**
         * The `overrideProperty` prop provides the developer with the ability
         * to customize the method override field which will be used to pass the
         * non-standard HTTP method being used to submit the form. Values other
         * than `GET` and `POST` are not supported as method types in HTML forms
         * and the override field allows us to pass that information along
         * anyway.
         */
        overrideProperty: PropTypes.string,
        /**
         * The `encType` prop is equivalent ot the HTML form encType attribute.
         */
        encType: PropTypes.oneOf(['text', 'multipart']),
        /**
         * A component to render, passing the form context as props.
         */
        component: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
            PropTypes.object
        ]),
        /**
         * The contents of the form.
         */
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node,
            PropTypes.func
        ]),
        /**
         * The handler is responsible for tracking form state, reconciling
         * external modifications, form submission, etc.
         */
        handler: PropTypes.shape({
            /**
             * Retrieve the original value of the field.
             */
            getOriginal: PropTypes.func,
            /**
             * Retrieve the last value given to the field through props.
             */
            getLastValue: PropTypes.func,
            /**
             * Retrieve the value for a field.
             */
            getValue: PropTypes.func,
            /**
             * Set the value for a field.
             */
            setValue: PropTypes.func,
            /**
             * Retrieve the error message for a field.
             */
            getError: PropTypes.func,
            /**
             * Set the error message for a field.
             */
            setError: PropTypes.func,
            /**
             * Retrieve a list of names of touched fields.
             */
            isTouched: PropTypes.func,
            /**
             * Set the touched state of a field to true.
             */
            setTouched: PropTypes.func,
            /**
             * Retrieve a list names of dirty fields.
             */
            isDirty: PropTypes.func,
            /**
             * Retrieve a conflicting value that was set externally for the
             * field given.
             */
            getConflict: PropTypes.func
        })
    };

    static defaultProps = {
        method: 'post',
        overrideProperty: '_method',
        handler: {}
    };

    get ctx() {
        return {
            getOriginal: this.props.handler.getOriginal,
            getLastValue: this.props.handler.getLastValue,
            getValue: this.props.handler.getValue,
            setValue: this.props.handler.setValue,
            getError: this.props.handler.getError,
            setError: this.props.handler.setError,
            isTouched: this.props.handler.isTouched,
            setTouched: this.props.handler.setTouched,
            isDirty: this.props.handler.isDirty,
            getConflict: this.props.handler.getConflict
        };
    }

    get content() {
        const { children, component: Component } = this.props;

        if (Component) {
            return (<Component { ...this.ctx }>{ children }</Component>);
        }
        if (typeof children === 'function') {
            return children(this.ctx);
        }
        return children;
    }

    get encType() {
        const { encType } = this.props;
        if (encType === 'text') {
            return 'text/plain';
        }
        if (encType === 'multipart') {
            return 'multipart/form-data';
        }
        return encType;
    }

    get method() {
        const { method } = this.props;
        if (['get', 'post'].indexOf(method) !== -1) {
            return method;
        }
        return 'post';
    }

    get methodOverrideElement() {
        const { method, overrideProperty } = this.props;
        if (['get', 'post'].indexOf(method) !== -1) {
            return null;
        }
        return (
            <input type="hidden"
                    name={ overrideProperty }
                    value={ method } />
        );
    }

    render() {
        const {
            component,
            handler,
            overrideProperty,
            ...props
        } = this.props;
        return (
            <FormContext.Provider value={ this.ctx }>
                <form { ...props }
                        encType={ this.encType }
                        method={ this.method }>
                    { this.methodOverrideElement }
                    { this.content }
                </form>
            </FormContext.Provider>
        );
    }
}
