import React from 'react';
import PropTypes from 'prop-types';
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
            style,
            ...props
        } = this.props;
        return (
            <div className="fancycheck">
                <input { ...props }
                        type="checkbox"
                        ref={ (ref) => { this.checkbox = ref; } } />
                <ins role="checkbox"
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
