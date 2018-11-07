import React from 'react';
import PropTypes from 'prop-types';
import { FormContext as Context } from '../Form';
import { getHandlerName } from './_utils';
import shallowEqual from '../../../utils/shallowEqual';

const wrap = (Wrapped) => {
    const FormContext = (props) => (
        <Context.Consumer>
            { (ctx) => (<Wrapped { ...props } ctx={ ctx } />) }
        </Context.Consumer>
    );
    FormContext.displayName = 'FormContext';
    FormContext.Wrapped = Wrapped;
    return FormContext;
};

/**
 * The `formContext` decorator allows the developer to wrap form controls in
 * order to provide them with the proper value/checked states without having to
 * manually wire each element, so long as a `Form` element with data exists in
 * the ancestry chain.
 *
 * @param {String} valueProperty - The name of the prop to put the form value in
 *         when passing it to the wrapped component
 * @returns {Function} - A new React Element wrapping the given component
 */
export default (valueProperty = 'value') => (Wrapped) => {
    const handlerName = getHandlerName(Wrapped);

    class FormContextInner extends React.Component {
        static Wrapped = Wrapped;

        static propTypes = {
            name: PropTypes.string.isRequired,
            ctx: PropTypes.shape({
                getValue: PropTypes.func
            })
        };

        constructor(props) {
            super(props);
            this.componentDidUpdate();
        }

        shouldComponentUpdate(nextProps) {
            const {
                ctx: oldCtx,
                ...oldRest
            } = this.props;
            const {
                ctx: newCtx,
                ...newRest
            } = nextProps;
            return !shallowEqual(oldRest, newRest)
                    || !oldCtx !== !newCtx
                    || (newCtx && this.ctxValue !== newCtx.getValue(this.props.name));
        }

        componentDidUpdate() {
            this.ctxValue = undefined;
            if (this.props.ctx) {
                this.ctxValue = this.props.ctx.getValue(this.props.name);
            }
        }

        getProps() {
            const {
                ctx,
                ...rest
            } = this.props;
            const props = { ...rest };
            if (this.props.ctx) {
                props[valueProperty] = typeof rest[valueProperty] === 'undefined' ? this.ctxValue : rest[valueProperty];
                if (handlerName) {
                    props[handlerName] = ctx.setValue;
                }
            }
            return props;
        }

        render() {
            return (<FormContextInner.Wrapped { ...this.getProps() } />);
        }
    }
    return wrap(FormContextInner);
};
