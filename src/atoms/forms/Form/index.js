import React from 'react';
import PropTypes from 'prop-types';

export const FormContext = React.createContext(null);

export default class Form extends React.Component {
    static propTypes = {
        action: PropTypes.string.isRequired,
        method: PropTypes.oneOf(['get', 'post', 'put']),
        overrideProperty: PropTypes.string,
        encType: PropTypes.oneOf(['text', 'multipart']),
        onChange: PropTypes.func,
        onSubmit: PropTypes.func,
        children: PropTypes.any,
        data: PropTypes.object
    };

    static defaultProps = {
        method: 'post',
        overrideProperty: '_method',
        data: {},
        onChange: () => {},
        onSubmit: () => {}
    };

    constructor(props) {
        super(props);
        this.getValue = this.getValue.bind(this);
        this.setValue = this.setValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getEncType = this.getEncType.bind(this);
        this.getFormMethod = this.getFormMethod.bind(this);
        this.getMethodOverrideElement = this.getMethodOverrideElement.bind(this);
    }


    getValue(name) {
        if (this.props.data) {
            return this.props.data[name];
        }
        return undefined;
    }

    setValue(ev) {
        this.props.onChange(ev);
    }

    /**
     * Calls the onSubmit prop function, if provided, when the form is
     * submitted.
     * @param {Object} e - The React event
     */
    onSubmit(e) {
        if (this.props.onSubmit) {
            this.props.onSubmit(this.props.data, e);
        }
    }

    /**
     * Determines the encoding type of the form.
     * See https://www.ietf.org/rfc/rfc1867.txt
     * @returns {String} - The mime type to specify in th enctype attribute
     */
    getEncType() {
        if (this.props.encType === 'text') {
            return 'text/plain';
        }
        if (this.props.encType === 'multipart') {
            return 'multipart/form-data';
        }
        return this.props.encType;
    }

    /**
     * Determines the HTTP method to use when submitting the form.
     * See https://www.ietf.org/rfc/rfc1867.txt
     * @returns {String} - The http method to use
     */
    getFormMethod() {
        if (['get', 'post'].indexOf(this.props.method) !== -1) {
            return this.props.method;
        }
        return 'post';
    }

    /**
     * Produces a hidden element which provides the opportunity to emulate
     * http methods other than GET and POST. Requires that the server receiving
     * the request support method overriding.
     * @returns {Object} - A React element
     */
    getMethodOverrideElement() {
        if (['get', 'post'].indexOf(this.props.method) !== -1) {
            return null;
        }
        return (
            <input type="hidden"
                    name={ this.props.overrideProperty || '_method' }
                    value={ this.props.method } />
        );
    }

    /**
     * Builds the props that are to be passed through to the form element. We
     * need to get rid of some props that aren't supported by the form element,
     * so we take that opportunity here.
     * @returns {Object} - The final props object
     */
    getProps() {
        const props = {
            ...this.props,
            encType: this.getEncType(),
            method: this.getFormMethod(),
            onSubmit: this.onSubmit
        };
        delete props.overrideProperty;
        return props;
    }

    /**
     * Perform render
     * @returns {Object} - A React element
     */
    render() {
        const {
            children,
            onChange,
            onSubmit,
            ...props
        } = this.getProps();
        const ctx = {
            getValue: this.getValue,
            setValue: this.setValue
        };
        return (
            <form { ...props }>
                <FormContext.Provider value={ ctx }>
                    { this.getMethodOverrideElement() }
                    { this.props.children }
                </FormContext.Provider>
            </form>
        );
    }
}
