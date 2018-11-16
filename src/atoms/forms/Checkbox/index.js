import React from 'react';
import { asCheckable, asField, compose } from '../utils';

const Checkbox = (props) => (
    <input { ...props } type="checkbox" />
);

export { Checkbox as BasicCheckbox };

export default compose(
    asField(),
    asCheckable()
)(Checkbox);
