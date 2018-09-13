import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import changeable from '../_decorators/changeable';
import formContext from '../_decorators/formContext';
import groupContext from '../_decorators/groupContext';
import {
    checkedGroupTransformer,
    checkedFormTransformer
} from '../_decorators/_utils';
import { onKeyDown } from '../../../common';

class FancyCheckbox extends React.Component {
    static propTypes = {
        style: PropTypes.object
    };

    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.checkbox.click();
    }

    render() {
        const {
            className,
            inputClassName,
            innerClassName,
            style,
            ...props
        } = this.props;
        return (
            <div className={ classnames('fancycheck', className) }>
                <input { ...props }
                        className={ classnames(inputClassName) }
                        type="checkbox"
                        onChange={ this.onChange }
                        ref={ (ref) => { this.checkbox = ref; } } />
                <ins role="checkbox"
                        className={ classnames(innerClassName) }
                        tabIndex={ -1 }
                        aria-checked={ props.checked }
                        onClick={ this.onClick }
                        onKeyDown={ onKeyDown(this.onClick) }
                        style={ style } />
            </div>
        );
    }
}
export default groupContext(
    formContext(changeable(FancyCheckbox), checkedFormTransformer),
    checkedGroupTransformer
);
