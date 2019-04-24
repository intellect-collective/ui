import React from 'react';
import { asCheckable, asField, compose } from '../utils';

export const Radio = (props) => {
    return (<input { ...props } type="radio" />);
};
Radio.displayName = 'Radio';

export { Radio as BasicRadio };

export default compose(
    asField(),
    asCheckable({ multiple: false })
)(Radio);
